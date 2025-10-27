// Assets Service for Django API Integration
// Handles all asset-related API calls

import { api } from '@/utils/api';

/**
 * Django Asset Endpoints:
 * 
 * GET /api/assets/
 * Response: [{ "id": 1, "name": "Transformer A", "type": "transformer", "status": "operational", ... }]
 * 
 * GET /api/assets/{id}/
 * Response: { "id": 1, "name": "Transformer A", "type": "transformer", ... }
 * 
 * POST /api/assets/
 * Request: { "name": "New Asset", "type": "transformer", ... }
 * Response: { "id": 2, "name": "New Asset", ... }
 * 
 * PUT /api/assets/{id}/
 * Request: { "name": "Updated Asset", ... }
 * Response: { "id": 1, "name": "Updated Asset", ... }
 * 
 * DELETE /api/assets/{id}/
 * Response: { "detail": "Asset deleted successfully" }
 * 
 * GET /api/assets/stats/
 * Response: { "total": 1250, "operational": 980, "maintenance": 180, ... }
 * 
 * Django Model Example (models.py):
 * class Asset(models.Model):
 *     name = models.CharField(max_length=255)
 *     type = models.CharField(max_length=100)
 *     status = models.CharField(max_length=50)
 *     location = models.CharField(max_length=255)
 *     install_date = models.DateField()
 *     last_maintenance = models.DateField(null=True)
 *     created_at = models.DateTimeField(auto_now_add=True)
 *     updated_at = models.DateTimeField(auto_now=True)
 */

export interface Asset {
  id: number;
  name: string;
  type: string;
  status: string;
  location?: string;
  installDate?: string;
  lastMaintenance?: string;
}

export interface AssetStats {
  total: number;
  operational: number;
  maintenance: number;
  offline: number;
}

export const assetsService = {
  // Get all assets
  async getAssets(): Promise<Asset[]> {
    // When Django is connected:
    // return await api.get<Asset[]>('/assets/');
    
    // Return empty array for now (pages will use mock data as fallback)
    return [];
  },

  // Get single asset by ID
  async getAsset(id: number): Promise<Asset> {
    // When Django is connected:
    // return await api.get<Asset>(`/assets/${id}/`);
    
    throw new Error('Django backend not connected');
  },

  // Create new asset
  async createAsset(asset: Omit<Asset, 'id'>): Promise<Asset> {
    // When Django is connected:
    // return await api.post<Asset>('/assets/', asset);
    
    throw new Error('Django backend not connected');
  },

  // Update existing asset
  async updateAsset(id: number, asset: Partial<Asset>): Promise<Asset> {
    // When Django is connected:
    // return await api.put<Asset>(`/assets/${id}/`, asset);
    
    throw new Error('Django backend not connected');
  },

  // Delete asset
  async deleteAsset(id: number): Promise<void> {
    // When Django is connected:
    // await api.delete(`/assets/${id}/`);
  },

  // Get asset statistics
  async getAssetStats(): Promise<AssetStats> {
    // When Django is connected:
    // return await api.get<AssetStats>('/assets/stats/');
    
    throw new Error('Django backend not connected');
  },
};
