import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Activity, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

interface AssetStatus {
  type: string;
  count: number;
  status: 'operational' | 'warning' | 'critical' | 'offline';
}

const assetData: AssetStatus[] = [
  { type: 'Transformers', count: 1247, status: 'operational' },
  { type: 'Substations', count: 89, status: 'operational' },
  { type: 'Power Lines', count: 2341, status: 'warning' },
  { type: 'Circuit Breakers', count: 456, status: 'operational' },
  { type: 'Meters', count: 15782, status: 'warning' },
  { type: 'Switchgear', count: 234, status: 'critical' },
];

const statusConfig = {
  operational: { icon: CheckCircle, color: 'text-success', bg: 'bg-success/10', label: 'Operational' },
  warning: { icon: AlertTriangle, color: 'text-warning', bg: 'bg-warning/10', label: 'Warning' },
  critical: { icon: XCircle, color: 'text-danger', bg: 'bg-danger/10', label: 'Critical' },
  offline: { icon: XCircle, color: 'text-muted-foreground', bg: 'bg-muted', label: 'Offline' },
};

export function AssetStatusCard() {
  return (
    <Card className="animate-enter">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-primary" />
          Equipment Status Overview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {assetData.map((asset) => {
            const config = statusConfig[asset.status];
            const Icon = config.icon;
            
            return (
              <div
                key={asset.type}
                className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${config.bg}`}>
                    <Icon className={`h-4 w-4 ${config.color}`} />
                  </div>
                  <div>
                    <p className="font-medium">{asset.type}</p>
                    <p className="text-sm text-muted-foreground">{asset.count.toLocaleString()} units</p>
                  </div>
                </div>
                <Badge variant={asset.status === 'operational' ? 'default' : asset.status === 'warning' ? 'secondary' : 'destructive'}>
                  {config.label}
                </Badge>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
