import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, TrendingUp, TrendingDown } from 'lucide-react';

interface InventoryItem {
  category: string;
  total: number;
  change: number;
  percentage: string;
}

const inventory: InventoryItem[] = [
  { category: 'Distribution Equipment', total: 8942, change: 23, percentage: '+0.3%' },
  { category: 'Transmission Assets', total: 1834, change: -5, percentage: '-0.3%' },
  { category: 'Substations', total: 89, change: 2, percentage: '+2.3%' },
  { category: 'Monitoring Devices', total: 15782, change: 145, percentage: '+0.9%' },
];

export function AssetInventoryCard() {
  return (
    <Card className="animate-enter">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package className="h-5 w-5 text-primary" />
          Asset Inventory
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {inventory.map((item) => (
            <div key={item.category} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <div>
                <p className="font-medium">{item.category}</p>
                <p className="text-2xl font-bold mt-1">{item.total.toLocaleString()}</p>
              </div>
              <div className="text-right">
                <div className={`flex items-center gap-1 ${item.change >= 0 ? 'text-success' : 'text-danger'}`}>
                  {item.change >= 0 ? (
                    <TrendingUp className="h-4 w-4" />
                  ) : (
                    <TrendingDown className="h-4 w-4" />
                  )}
                  <span className="text-sm font-medium">{item.percentage}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {item.change >= 0 ? '+' : ''}{item.change} this month
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
