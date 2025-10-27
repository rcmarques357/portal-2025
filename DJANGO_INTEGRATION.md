# Django Backend Integration Guide

This guide explains how to integrate this React frontend with a Django REST API backend.

## Architecture Overview

```
React Frontend (Port 5173)  ←→  Django Backend (Port 8000)
     - UI Components              - REST API Endpoints
     - State Management           - Database (PostgreSQL/MySQL)
     - API Service Layer          - Authentication (JWT)
     - Mock Data Fallback         - Business Logic
```

## Setup Instructions

### 1. Configure Environment Variables

Create a `.env.local` file in the project root:

```bash
VITE_API_URL=http://localhost:8000/api
```

### 2. Django Backend Setup

#### Install Required Packages

```bash
pip install django djangorestframework djangorestframework-simplejwt django-cors-headers
```

#### Configure Django Settings (`settings.py`)

```python
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    
    # Third party apps
    'rest_framework',
    'corsheaders',
    
    # Your apps
    'assets',
    'work_orders',
    'stocks',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',  # Must be at the top
    'django.middleware.security.SecurityMiddleware',
    # ... other middleware
]

# CORS Configuration
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",  # React dev server
    "http://127.0.0.1:5173",
    # Add production URLs here
]

CORS_ALLOW_CREDENTIALS = True

# REST Framework Configuration
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticatedOrReadOnly',
    ],
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 50,
}

# JWT Settings
from datetime import timedelta

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(hours=1),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=7),
    'ROTATE_REFRESH_TOKENS': True,
}
```

#### Configure URLs (`urls.py`)

```python
from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('admin/', admin.site.urls),
    
    # Authentication endpoints
    path('api/auth/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
    # App endpoints
    path('api/assets/', include('assets.urls')),
    path('api/work-orders/', include('work_orders.urls')),
    path('api/stocks/', include('stocks.urls')),
]
```

### 3. Example Django Models

#### Assets App (`assets/models.py`)

```python
from django.db import models

class Asset(models.Model):
    STATUS_CHOICES = [
        ('operational', 'Operational'),
        ('maintenance', 'Maintenance'),
        ('offline', 'Offline'),
    ]
    
    name = models.CharField(max_length=255)
    type = models.CharField(max_length=100)
    status = models.CharField(max_length=50, choices=STATUS_CHOICES)
    location = models.CharField(max_length=255)
    install_date = models.DateField()
    last_maintenance = models.DateField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.name} ({self.type})"
```

#### Work Orders App (`work_orders/models.py`)

```python
from django.db import models
from django.contrib.auth.models import User

class WorkOrder(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('in_progress', 'In Progress'),
        ('on_hold', 'On Hold'),
        ('completed', 'Completed'),
    ]
    
    PRIORITY_CHOICES = [
        ('low', 'Low'),
        ('medium', 'Medium'),
        ('high', 'High'),
        ('urgent', 'Urgent'),
    ]
    
    title = models.CharField(max_length=255)
    description = models.TextField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    priority = models.CharField(max_length=20, choices=PRIORITY_CHOICES, default='medium')
    asset = models.ForeignKey('assets.Asset', on_delete=models.CASCADE, related_name='work_orders')
    assigned_to = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    due_date = models.DateField()
    completed_at = models.DateTimeField(null=True, blank=True)
    
    def __str__(self):
        return f"{self.title} - {self.status}"
```

### 4. Example Django Serializers

#### Assets Serializer (`assets/serializers.py`)

```python
from rest_framework import serializers
from .models import Asset

class AssetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Asset
        fields = '__all__'
        read_only_fields = ('created_at', 'updated_at')
```

#### Work Orders Serializer (`work_orders/serializers.py`)

```python
from rest_framework import serializers
from .models import WorkOrder

class WorkOrderSerializer(serializers.ModelSerializer):
    asset_name = serializers.CharField(source='asset.name', read_only=True)
    assigned_to_name = serializers.CharField(source='assigned_to.username', read_only=True)
    
    class Meta:
        model = WorkOrder
        fields = '__all__'
        read_only_fields = ('created_at', 'completed_at')
```

### 5. Example Django Views

#### Assets Views (`assets/views.py`)

```python
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Asset
from .serializers import AssetSerializer

class AssetViewSet(viewsets.ModelViewSet):
    queryset = Asset.objects.all()
    serializer_class = AssetSerializer
    
    @action(detail=False, methods=['get'])
    def stats(self, request):
        total = Asset.objects.count()
        operational = Asset.objects.filter(status='operational').count()
        maintenance = Asset.objects.filter(status='maintenance').count()
        offline = Asset.objects.filter(status='offline').count()
        
        return Response({
            'total': total,
            'operational': operational,
            'maintenance': maintenance,
            'offline': offline,
        })
```

#### Assets URLs (`assets/urls.py`)

```python
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AssetViewSet

router = DefaultRouter()
router.register(r'', AssetViewSet, basename='asset')

urlpatterns = [
    path('', include(router.urls)),
]
```

## Using the API Services in React

### Example: Fetching Assets with Fallback

```typescript
import { assetsService } from '@/services/assetsService';
import { mockAssets } from '@/utils/mockData'; // Your mock data

const AssetsPage = () => {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        // Try to fetch from Django API
        const data = await assetsService.getAssets();
        setAssets(data.length > 0 ? data : mockAssets); // Fallback to mock
      } catch (error) {
        console.log('Using mock data:', error.message);
        setAssets(mockAssets); // Fallback to mock
      } finally {
        setLoading(false);
      }
    };

    fetchAssets();
  }, []);

  // ... render component
};
```

### Example: Authentication Flow

```typescript
import { authService } from '@/services/authService';

const LoginPage = () => {
  const handleLogin = async (email: string, password: string) => {
    try {
      const response = await authService.login({ email, password });
      // Token is automatically stored
      console.log('Logged in:', response.user);
      // Redirect to dashboard
    } catch (error) {
      console.error('Login failed:', error.message);
    }
  };

  // ... render login form
};
```

## API Endpoints Reference

### Authentication
- `POST /api/auth/login/` - Login and get JWT tokens
- `POST /api/auth/refresh/` - Refresh access token
- `POST /api/auth/logout/` - Logout (optional)
- `GET /api/auth/user/` - Get current user

### Assets
- `GET /api/assets/` - List all assets
- `GET /api/assets/{id}/` - Get asset detail
- `POST /api/assets/` - Create new asset
- `PUT /api/assets/{id}/` - Update asset
- `DELETE /api/assets/{id}/` - Delete asset
- `GET /api/assets/stats/` - Get asset statistics

### Work Orders
- `GET /api/work-orders/` - List all work orders
- `GET /api/work-orders/{id}/` - Get work order detail
- `POST /api/work-orders/` - Create new work order
- `PATCH /api/work-orders/{id}/` - Update work order
- `DELETE /api/work-orders/{id}/` - Delete work order
- `GET /api/work-orders/stats/` - Get work order statistics

### Stocks (if implementing financial features)
- `GET /api/stocks/` - List stocks
- `GET /api/stocks/{symbol}/` - Get stock detail
- `GET /api/stocks/{symbol}/history/` - Get price history
- `GET /api/market-indices/` - List market indices
- `GET /api/currencies/` - List currency pairs
- `GET /api/cryptocurrencies/` - List cryptocurrencies

## Testing the Integration

### 1. Start Django Backend
```bash
python manage.py runserver
```

### 2. Start React Frontend
```bash
npm run dev
```

### 3. Test API Connection
Open browser console and check network tab for API calls to `http://localhost:8000/api`

## Deployment

### Django Backend
- Deploy to: Heroku, AWS, DigitalOcean, Railway, etc.
- Update `CORS_ALLOWED_ORIGINS` with production frontend URL
- Set `DEBUG = False` in production
- Configure proper database (PostgreSQL recommended)

### React Frontend
- Build: `npm run build`
- Deploy to: Vercel, Netlify, AWS S3, etc.
- Update `.env.production` with production API URL

## Security Checklist

- ✅ JWT tokens stored in localStorage
- ✅ Authorization header sent with API requests
- ✅ CORS configured properly
- ✅ HTTPS in production
- ✅ Rate limiting on Django API
- ✅ Input validation on both frontend and backend
- ✅ SQL injection protection (Django ORM handles this)
- ✅ XSS protection (React handles this by default)

## Next Steps

1. Set up Django project with required apps
2. Create database migrations: `python manage.py makemigrations`
3. Run migrations: `python manage.py migrate`
4. Create superuser: `python manage.py createsuperuser`
5. Update React components to use API services
6. Test authentication flow
7. Deploy to production

## Support

For questions about:
- Django REST Framework: https://www.django-rest-framework.org/
- JWT Authentication: https://django-rest-framework-simplejwt.readthedocs.io/
- CORS: https://github.com/adamchainz/django-cors-headers
