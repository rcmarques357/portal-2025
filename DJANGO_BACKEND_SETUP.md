# Django Backend Setup Guide for Asset Data Hub

## Overview
This guide explains how to connect your React frontend to a Django backend with JWT authentication and role-based access control.

## Frontend Configuration

### 1. Set Environment Variable
Create a `.env` file in your React project root:

```env
VITE_API_URL=http://localhost:8000/api
```

For production, update this to your deployed Django backend URL.

## Django Backend Setup

### 1. Install Required Packages

```bash
pip install django djangorestframework djangorestframework-simplejwt django-cors-headers
```

### 2. Django Settings (`settings.py`)

```python
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'rest_framework_simplejwt',
    'corsheaders',
    'your_app',  # Your app name
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'corsheaders.middleware.CorsMiddleware',  # Add before CommonMiddleware
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

# CORS Settings
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",  # Vite dev server
    "http://localhost:3000",  # Alternative dev port
    # Add your production frontend URL here
]

# REST Framework Settings
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated',
    ],
}

# JWT Settings
from datetime import timedelta

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(hours=1),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=7),
    'ROTATE_REFRESH_TOKENS': False,
    'BLACKLIST_AFTER_ROTATION': True,
    'AUTH_HEADER_TYPES': ('Bearer',),
}
```

### 3. Create User Model with Roles (`models.py`)

```python
from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    ROLE_CHOICES = [
        ('regular', 'Regular User'),
        ('editor', 'Editor'),
        ('admin', 'Administrator'),
    ]
    
    role = models.CharField(
        max_length=10,
        choices=ROLE_CHOICES,
        default='regular'
    )
    
    def __str__(self):
        return f"{self.email} ({self.get_role_display()})"
```

Update `settings.py`:
```python
AUTH_USER_MODEL = 'your_app.User'
```

### 4. Create Serializers (`serializers.py`)

```python
from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'username', 'name', 'role']
        read_only_fields = ['id']

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=6)
    
    class Meta:
        model = User
        fields = ['email', 'username', 'password', 'name']
    
    def create(self, validated_data):
        user = User.objects.create_user(
            email=validated_data['email'],
            username=validated_data.get('username', validated_data['email']),
            password=validated_data['password'],
            first_name=validated_data.get('name', ''),
            role='regular'  # Default role
        )
        return user
```

### 5. Create Custom JWT Views (`views.py`)

```python
from rest_framework import status, generics
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .serializers import UserSerializer, RegisterSerializer

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        
        # Add user data to response
        data['user'] = {
            'id': self.user.id,
            'email': self.user.email,
            'name': self.user.first_name,
            'role': self.user.role,
        }
        
        return data

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        return Response({
            'user': UserSerializer(user).data,
            'message': 'User created successfully'
        }, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_current_user(request):
    serializer = UserSerializer(request.user)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout_user(request):
    # You can implement token blacklisting here if needed
    return Response({'detail': 'Successfully logged out'}, status=status.HTTP_200_OK)
```

### 6. URL Configuration (`urls.py`)

```python
from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import (
    CustomTokenObtainPairView,
    register_user,
    get_current_user,
    logout_user
)

urlpatterns = [
    # Authentication endpoints
    path('auth/login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('auth/register/', register_user, name='register'),
    path('auth/user/', get_current_user, name='current_user'),
    path('auth/logout/', logout_user, name='logout'),
]
```

### 7. Create Permissions (`permissions.py`)

```python
from rest_framework import permissions

class IsEditorOrAdmin(permissions.BasePermission):
    """
    Custom permission to only allow editors and admins to edit.
    """
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user.role in ['editor', 'admin']

class IsAdmin(permissions.BasePermission):
    """
    Custom permission to only allow admins.
    """
    def has_permission(self, request, view):
        return request.user.role == 'admin'
```

### 8. Apply Permissions to Views

```python
from rest_framework import viewsets
from .permissions import IsEditorOrAdmin

class InitiativeViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated, IsEditorOrAdmin]
    # ... rest of your viewset
```

## Database Migration

```bash
python manage.py makemigrations
python manage.py migrate
```

## Create Admin User

```bash
python manage.py createsuperuser
```

Then in Django admin or shell, set the user's role to 'admin':

```python
from your_app.models import User
user = User.objects.get(email='admin@example.com')
user.role = 'admin'
user.save()
```

## Testing the API

### 1. Login
```bash
curl -X POST http://localhost:8000/api/auth/login/ \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "password123"}'
```

### 2. Get Current User
```bash
curl -X GET http://localhost:8000/api/auth/user/ \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

### 3. Refresh Token
```bash
curl -X POST http://localhost:8000/api/auth/refresh/ \
  -H "Content-Type: application/json" \
  -d '{"refresh": "YOUR_REFRESH_TOKEN"}'
```

## Role-Based Access Control

The frontend already implements role checking:

- **Regular users**: Can view and download files only
- **Editors**: Can create, edit, and delete items
- **Admins**: Full system access including user management

The `useAuth()` hook provides:
- `canEdit`: true for editors and admins
- `isAdmin`: true only for admins
- `userRole`: the user's current role

## Security Considerations

1. **HTTPS in Production**: Always use HTTPS for your API in production
2. **Secret Key**: Use a strong SECRET_KEY and keep it secure
3. **Token Security**: Store tokens securely in localStorage (already implemented)
4. **CORS**: Update CORS_ALLOWED_ORIGINS with your production domain
5. **Rate Limiting**: Consider adding rate limiting to prevent brute force attacks
6. **Password Validation**: Django's built-in password validators are recommended

## Troubleshooting

### CORS Errors
- Make sure django-cors-headers is installed and configured
- Check that your frontend URL is in CORS_ALLOWED_ORIGINS

### 401 Unauthorized
- Check that the token is being sent in the Authorization header
- Verify the token hasn't expired
- Use the refresh endpoint to get a new access token

### 403 Forbidden
- User doesn't have the required role for the action
- Check role assignments in Django admin

## Next Steps

1. Set up your `.env` file with VITE_API_URL
2. Run your Django backend: `python manage.py runserver`
3. Test the login at `/auth` in your React app
4. Create test users with different roles to verify permissions
