# Django Backend Data Integration Guide

## Overview
This guide shows you how to connect real Django database data to your React frontend. Your React app already has service files ready - you just need to set up the Django backend and uncomment the API calls.

## Quick Start Steps

1. **Set up Django models and API endpoints** (see below)
2. **Uncomment API calls** in service files
3. **Use React Query** to fetch data in components
4. **Set environment variable** `VITE_API_URL=http://localhost:8000/api`

---

## Part 1: Django Backend Setup

### 1.1 Install Required Packages

```bash
pip install django djangorestframework djangorestframework-simplejwt django-cors-headers
```

### 1.2 Create Django Models

Create `models.py` in your Django app:

```python
from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Asset(models.Model):
    STATUS_CHOICES = [
        ('operational', 'Operational'),
        ('maintenance', 'Maintenance'),
        ('offline', 'Offline'),
    ]
    
    name = models.CharField(max_length=255)
    type = models.CharField(max_length=100)
    status = models.CharField(max_length=50, choices=STATUS_CHOICES, default='operational')
    location = models.CharField(max_length=255, blank=True)
    install_date = models.DateField(null=True, blank=True)
    last_maintenance = models.DateField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.name} ({self.type})"

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
    description = models.TextField(blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    priority = models.CharField(max_length=20, choices=PRIORITY_CHOICES, default='medium')
    asset = models.ForeignKey(Asset, on_delete=models.CASCADE, null=True, blank=True)
    assigned_to = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    due_date = models.DateField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.title

class Stock(models.Model):
    symbol = models.CharField(max_length=10, unique=True)
    name = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    change = models.DecimalField(max_digits=10, decimal_places=2)
    change_percent = models.DecimalField(max_digits=5, decimal_places=2)
    volume = models.BigIntegerField()
    market_cap = models.BigIntegerField()
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.symbol} - {self.name}"
```

### 1.3 Create Serializers

Create `serializers.py`:

```python
from rest_framework import serializers
from .models import Asset, WorkOrder, Stock

class AssetSerializer(serializers.ModelSerializer):
    install_date = serializers.DateField(source='install_date', required=False)
    last_maintenance = serializers.DateField(source='last_maintenance', required=False)
    
    class Meta:
        model = Asset
        fields = ['id', 'name', 'type', 'status', 'location', 'install_date', 'last_maintenance']

class WorkOrderSerializer(serializers.ModelSerializer):
    asset_id = serializers.IntegerField(source='asset.id', required=False, allow_null=True)
    assigned_to = serializers.IntegerField(required=False, allow_null=True)
    due_date = serializers.DateField(required=False, allow_null=True)
    
    class Meta:
        model = WorkOrder
        fields = ['id', 'title', 'description', 'status', 'priority', 
                  'asset_id', 'assigned_to', 'due_date', 'created_at']

class StockSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stock
        fields = ['symbol', 'name', 'price', 'change', 'change_percent', 
                  'volume', 'market_cap', 'updated_at']
```

### 1.4 Create ViewSets

Create `views.py`:

```python
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Asset, WorkOrder, Stock
from .serializers import AssetSerializer, WorkOrderSerializer, StockSerializer
from .permissions import IsEditorOrAdmin  # From DJANGO_BACKEND_SETUP.md

class AssetViewSet(viewsets.ModelViewSet):
    queryset = Asset.objects.all()
    serializer_class = AssetSerializer
    permission_classes = [IsAuthenticated, IsEditorOrAdmin]
    
    @action(detail=False, methods=['get'])
    def stats(self, request):
        """Get asset statistics"""
        total = Asset.objects.count()
        operational = Asset.objects.filter(status='operational').count()
        maintenance = Asset.objects.filter(status='maintenance').count()
        offline = Asset.objects.filter(status='offline').count()
        
        return Response({
            'total': total,
            'operational': operational,
            'maintenance': maintenance,
            'offline': offline
        })

class WorkOrderViewSet(viewsets.ModelViewSet):
    queryset = WorkOrder.objects.all()
    serializer_class = WorkOrderSerializer
    permission_classes = [IsAuthenticated, IsEditorOrAdmin]
    
    def get_queryset(self):
        """Filter work orders by query parameters"""
        queryset = WorkOrder.objects.all()
        status = self.request.query_params.get('status')
        priority = self.request.query_params.get('priority')
        assigned_to = self.request.query_params.get('assigned_to')
        
        if status:
            queryset = queryset.filter(status=status)
        if priority:
            queryset = queryset.filter(priority=priority)
        if assigned_to:
            queryset = queryset.filter(assigned_to=assigned_to)
        
        return queryset
    
    @action(detail=False, methods=['get'])
    def stats(self, request):
        """Get work order statistics"""
        total = WorkOrder.objects.count()
        pending = WorkOrder.objects.filter(status='pending').count()
        in_progress = WorkOrder.objects.filter(status='in_progress').count()
        on_hold = WorkOrder.objects.filter(status='on_hold').count()
        completed = WorkOrder.objects.filter(status='completed').count()
        
        return Response({
            'total': total,
            'pending': pending,
            'inProgress': in_progress,
            'onHold': on_hold,
            'completed': completed
        })

class StockViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Stock.objects.all()
    serializer_class = StockSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'symbol'
    
    @action(detail=True, methods=['get'])
    def history(self, request, symbol=None):
        """Get stock price history"""
        days = int(request.query_params.get('days', 30))
        # Implement your history logic here
        # This is a placeholder
        stock = self.get_object()
        history = [float(stock.price)] * days  # Replace with actual history
        
        return Response({'history': history})
```

### 1.5 Configure URLs

Update `urls.py`:

```python
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AssetViewSet, WorkOrderViewSet, StockViewSet

router = DefaultRouter()
router.register(r'assets', AssetViewSet)
router.register(r'work-orders', WorkOrderViewSet)
router.register(r'stocks', StockViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
```

### 1.6 Run Migrations

```bash
python manage.py makemigrations
python manage.py migrate
```

### 1.7 Create Sample Data

```python
# In Django shell or create a management command
python manage.py shell

from your_app.models import Asset, WorkOrder

# Create sample assets
Asset.objects.create(
    name="Transformer A",
    type="transformer",
    status="operational",
    location="Station 1"
)

Asset.objects.create(
    name="Generator B",
    type="generator",
    status="maintenance",
    location="Station 2"
)

# Create sample work orders
asset = Asset.objects.first()
WorkOrder.objects.create(
    title="Inspect Transformer",
    description="Monthly inspection",
    status="pending",
    priority="high",
    asset=asset
)
```

---

## Part 2: React Frontend Integration

### 2.1 Set Environment Variable

Create `.env` file in your React project root:

```env
VITE_API_URL=http://localhost:8000/api
```

### 2.2 Uncomment Service Methods

The service files already have the API calls - just uncomment them!

**Example for `src/services/assetsService.ts`:**

```typescript
async getAssets(): Promise<Asset[]> {
  // Remove this line:
  // return [];
  
  // Uncomment this line:
  return await api.get<Asset[]>('/assets/');
}
```

Do this for all methods in:
- `src/services/assetsService.ts`
- `src/services/workOrdersService.ts`
- `src/services/stocksService.ts`

### 2.3 Use React Query in Components

**Example: Fetch Assets in a Component**

```tsx
import { useQuery } from '@tanstack/react-query';
import { assetsService } from '@/services/assetsService';

export function AssetsPage() {
  const { data: assets, isLoading, error } = useQuery({
    queryKey: ['assets'],
    queryFn: assetsService.getAssets,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {assets?.map(asset => (
        <div key={asset.id}>
          <h3>{asset.name}</h3>
          <p>Status: {asset.status}</p>
        </div>
      ))}
    </div>
  );
}
```

**Example: Create Asset with Mutation**

```tsx
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { assetsService } from '@/services/assetsService';
import { toast } from 'sonner';

export function CreateAssetForm() {
  const queryClient = useQueryClient();
  
  const createMutation = useMutation({
    mutationFn: assetsService.createAsset,
    onSuccess: () => {
      // Invalidate and refetch assets list
      queryClient.invalidateQueries({ queryKey: ['assets'] });
      toast.success('Asset created successfully');
    },
    onError: (error) => {
      toast.error('Failed to create asset');
    },
  });

  const handleSubmit = (formData) => {
    createMutation.mutate(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Your form fields */}
      <button type="submit" disabled={createMutation.isPending}>
        {createMutation.isPending ? 'Creating...' : 'Create Asset'}
      </button>
    </form>
  );
}
```

### 2.4 Complete Integration Checklist

1. ✅ Set up Django models
2. ✅ Create serializers
3. ✅ Create viewsets
4. ✅ Configure URLs
5. ✅ Run migrations
6. ✅ Create sample data
7. ⬜ Set `VITE_API_URL` in `.env`
8. ⬜ Uncomment API calls in service files
9. ⬜ Use React Query in components
10. ⬜ Test the integration

---

## Part 3: Testing the Integration

### 3.1 Test Django API Directly

```bash
# Start Django server
python manage.py runserver

# Login to get JWT token
curl -X POST http://localhost:8000/api/auth/login/ \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "password123"}'

# Test endpoints with token
curl -X GET http://localhost:8000/api/assets/ \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### 3.2 Test React App

1. Start Django backend: `python manage.py runserver`
2. Start React dev server: `npm run dev`
3. Login at `/auth`
4. Navigate to pages that fetch data

### 3.3 Debugging Tips

**Check Browser Network Tab:**
- Are requests being sent to the correct URL?
- Is the Authorization header included?
- What's the response status code?

**Common Issues:**

1. **CORS Errors**: Make sure `CORS_ALLOWED_ORIGINS` includes your React dev server URL in Django settings
2. **401 Unauthorized**: Token expired or not sent correctly
3. **404 Not Found**: Check your Django URL configuration
4. **Empty Data**: Check if Django database has records

---

## Part 4: Advanced Features

### Add Real-Time Updates

Use React Query's automatic refetching:

```tsx
const { data } = useQuery({
  queryKey: ['assets'],
  queryFn: assetsService.getAssets,
  refetchInterval: 30000, // Refetch every 30 seconds
});
```

### Add Optimistic Updates

```tsx
const updateMutation = useMutation({
  mutationFn: (data) => assetsService.updateAsset(id, data),
  onMutate: async (newData) => {
    await queryClient.cancelQueries({ queryKey: ['assets', id] });
    
    const previous = queryClient.getQueryData(['assets', id]);
    
    queryClient.setQueryData(['assets', id], newData);
    
    return { previous };
  },
  onError: (err, newData, context) => {
    queryClient.setQueryData(['assets', id], context.previous);
  },
  onSettled: () => {
    queryClient.invalidateQueries({ queryKey: ['assets'] });
  },
});
```

### Add Pagination

Update Django view:

```python
from rest_framework.pagination import PageNumberPagination

class StandardResultsSetPagination(PageNumberPagination):
    page_size = 20
    page_size_query_param = 'page_size'
    max_page_size = 100

class AssetViewSet(viewsets.ModelViewSet):
    pagination_class = StandardResultsSetPagination
    # ... rest of the viewset
```

Use in React:

```tsx
const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
  queryKey: ['assets'],
  queryFn: ({ pageParam = 1 }) => 
    api.get(`/assets/?page=${pageParam}`),
  getNextPageParam: (lastPage) => lastPage.next ? lastPage.page + 1 : undefined,
  initialPageParam: 1,
});
```

---

## Quick Reference

### Service Files Location
- `src/services/assetsService.ts` - Asset management
- `src/services/workOrdersService.ts` - Work orders
- `src/services/stocksService.ts` - Financial data
- `src/services/authService.ts` - Authentication (already active)
- `src/utils/api.ts` - Base API configuration

### Django Endpoints Pattern
- `GET /api/assets/` - List all
- `GET /api/assets/{id}/` - Get one
- `POST /api/assets/` - Create
- `PUT /api/assets/{id}/` - Update (full)
- `PATCH /api/assets/{id}/` - Update (partial)
- `DELETE /api/assets/{id}/` - Delete
- `GET /api/assets/stats/` - Get statistics

### React Query Hooks
- `useQuery` - Fetch data (GET)
- `useMutation` - Create/Update/Delete (POST/PUT/DELETE)
- `useQueryClient` - Invalidate/Update cache
- `useInfiniteQuery` - Pagination

### Authentication Flow
1. User logs in at `/auth`
2. JWT tokens stored in localStorage
3. `api.ts` automatically adds token to requests
4. Django validates token and returns data

---

## Need Help?

1. Check `DJANGO_BACKEND_SETUP.md` for auth setup details
2. Review service file comments for endpoint specifications
3. Test Django API with curl/Postman before React integration
4. Check browser console and network tab for errors
5. Verify CORS settings in Django if requests are blocked
