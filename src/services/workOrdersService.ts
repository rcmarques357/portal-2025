// Work Orders Service for Django API Integration
// Handles work order management API calls

import { api } from '@/utils/api';

/**
 * Django Work Order Endpoints:
 * 
 * GET /api/work-orders/
 * Query params: ?status=pending&priority=high
 * Response: [{ "id": 1, "title": "Repair Transformer", "status": "pending", ... }]
 * 
 * GET /api/work-orders/{id}/
 * Response: { "id": 1, "title": "Repair Transformer", "description": "...", ... }
 * 
 * POST /api/work-orders/
 * Request: { "title": "New Work Order", "priority": "high", "assigned_to": 5, ... }
 * Response: { "id": 2, "title": "New Work Order", ... }
 * 
 * PATCH /api/work-orders/{id}/
 * Request: { "status": "in_progress" }
 * Response: { "id": 1, "status": "in_progress", ... }
 * 
 * DELETE /api/work-orders/{id}/
 * Response: { "detail": "Work order deleted" }
 * 
 * GET /api/work-orders/stats/
 * Response: { "total": 150, "pending": 45, "in_progress": 30, "completed": 75 }
 * 
 * Django Model Example (models.py):
 * class WorkOrder(models.Model):
 *     STATUS_CHOICES = [
 *         ('pending', 'Pending'),
 *         ('in_progress', 'In Progress'),
 *         ('on_hold', 'On Hold'),
 *         ('completed', 'Completed'),
 *     ]
 *     title = models.CharField(max_length=255)
 *     description = models.TextField()
 *     status = models.CharField(max_length=20, choices=STATUS_CHOICES)
 *     priority = models.CharField(max_length=20)
 *     asset = models.ForeignKey('Asset', on_delete=models.CASCADE)
 *     assigned_to = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
 *     created_at = models.DateTimeField(auto_now_add=True)
 *     due_date = models.DateField()
 */

export interface WorkOrder {
  id: number;
  title: string;
  description?: string;
  status: 'pending' | 'in_progress' | 'on_hold' | 'completed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assetId?: number;
  assignedTo?: number;
  dueDate?: string;
  createdAt?: string;
}

export interface WorkOrderStats {
  total: number;
  pending: number;
  inProgress: number;
  onHold: number;
  completed: number;
}

export const workOrdersService = {
  // Get all work orders with optional filters
  async getWorkOrders(filters?: {
    status?: string;
    priority?: string;
    assignedTo?: number;
  }): Promise<WorkOrder[]> {
    // When Django is connected:
    // const queryParams = new URLSearchParams(filters as any).toString();
    // return await api.get<WorkOrder[]>(`/work-orders/${queryParams ? '?' + queryParams : ''}`);
    
    return [];
  },

  // Get single work order
  async getWorkOrder(id: number): Promise<WorkOrder> {
    // When Django is connected:
    // return await api.get<WorkOrder>(`/work-orders/${id}/`);
    
    throw new Error('Django backend not connected');
  },

  // Create new work order
  async createWorkOrder(workOrder: Omit<WorkOrder, 'id'>): Promise<WorkOrder> {
    // When Django is connected:
    // return await api.post<WorkOrder>('/work-orders/', workOrder);
    
    throw new Error('Django backend not connected');
  },

  // Update work order
  async updateWorkOrder(id: number, updates: Partial<WorkOrder>): Promise<WorkOrder> {
    // When Django is connected:
    // return await api.patch<WorkOrder>(`/work-orders/${id}/`, updates);
    
    throw new Error('Django backend not connected');
  },

  // Delete work order
  async deleteWorkOrder(id: number): Promise<void> {
    // When Django is connected:
    // await api.delete(`/work-orders/${id}/`);
  },

  // Get work order statistics
  async getWorkOrderStats(): Promise<WorkOrderStats> {
    // When Django is connected:
    // return await api.get<WorkOrderStats>('/work-orders/stats/');
    
    throw new Error('Django backend not connected');
  },
};
