// Authentication Service for Django JWT Integration
// Handles login, logout, token refresh, and user session management

import { api } from '@/utils/api';

/**
 * Django Authentication Endpoints:
 * 
 * POST /api/auth/login/
 * Request: { "email": "user@example.com", "password": "password123" }
 * Response: { "access": "jwt_token", "refresh": "refresh_token", "user": {...} }
 * 
 * POST /api/auth/refresh/
 * Request: { "refresh": "refresh_token" }
 * Response: { "access": "new_jwt_token" }
 * 
 * POST /api/auth/logout/
 * Request: { "refresh": "refresh_token" }
 * Response: { "detail": "Successfully logged out" }
 * 
 * GET /api/auth/user/
 * Headers: Authorization: Bearer {jwt_token}
 * Response: { "id": 1, "email": "user@example.com", "name": "John Doe" }
 * 
 * Django Setup Required:
 * 1. Install: pip install djangorestframework djangorestframework-simplejwt
 * 2. settings.py:
 *    REST_FRAMEWORK = {
 *        'DEFAULT_AUTHENTICATION_CLASSES': [
 *            'rest_framework_simplejwt.authentication.JWTAuthentication',
 *        ],
 *    }
 * 3. urls.py:
 *    from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
 *    path('api/auth/login/', TokenObtainPairView.as_view()),
 *    path('api/auth/refresh/', TokenRefreshView.as_view()),
 */

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  access: string;
  refresh: string;
  user: {
    id: number;
    email: string;
    name?: string;
  };
}

export interface User {
  id: number;
  email: string;
  name?: string;
}

export const authService = {
  // Login user and store tokens
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    // When Django is connected, this will call:
    // const response = await api.post<AuthResponse>('/auth/login/', credentials);
    
    // Mock response for now
    throw new Error('Django backend not connected. Configure VITE_API_URL in .env');
    
    // Uncomment when Django is ready:
    // const response = await api.post<AuthResponse>('/auth/login/', credentials);
    // localStorage.setItem('auth_token', response.access);
    // localStorage.setItem('refresh_token', response.refresh);
    // return response;
  },

  // Logout user and clear tokens
  async logout(): Promise<void> {
    const refreshToken = localStorage.getItem('refresh_token');
    
    // When Django is connected:
    // if (refreshToken) {
    //   await api.post('/auth/logout/', { refresh: refreshToken });
    // }
    
    localStorage.removeItem('auth_token');
    localStorage.removeItem('refresh_token');
  },

  // Refresh access token
  async refreshToken(): Promise<string> {
    const refreshToken = localStorage.getItem('refresh_token');
    
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    // When Django is connected:
    // const response = await api.post<{ access: string }>('/auth/refresh/', {
    //   refresh: refreshToken,
    // });
    // localStorage.setItem('auth_token', response.access);
    // return response.access;
    
    throw new Error('Django backend not connected');
  },

  // Get current user
  async getCurrentUser(): Promise<User> {
    // When Django is connected:
    // return await api.get<User>('/auth/user/');
    
    throw new Error('Django backend not connected');
  },

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!localStorage.getItem('auth_token');
  },
};
