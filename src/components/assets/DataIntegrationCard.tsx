import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Database, RefreshCw, CheckCircle2, Clock } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface IntegrationStatus {
  system: string;
  lastSync: string;
  status: 'synced' | 'syncing' | 'pending';
  records: number;
  progress?: number;
}

const integrations: IntegrationStatus[] = [
  { system: 'GIS Database', lastSync: '5 minutes ago', status: 'synced', records: 18459 },
  { system: 'SAP ERP', lastSync: '2 minutes ago', status: 'synced', records: 15234 },
  { system: 'Work Orders', lastSync: 'In progress', status: 'syncing', records: 3421, progress: 67 },
  { system: 'Asset Register', lastSync: '15 minutes ago', status: 'synced', records: 20127 },
];

const statusConfig = {
  synced: { icon: CheckCircle2, color: 'text-success', label: 'Synced', variant: 'default' as const },
  syncing: { icon: RefreshCw, color: 'text-warning', label: 'Syncing', variant: 'secondary' as const },
  pending: { icon: Clock, color: 'text-muted-foreground', label: 'Pending', variant: 'outline' as const },
};

export function DataIntegrationCard() {
  return (
    <Card className="animate-enter">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="h-5 w-5 text-primary" />
          Data Integration Status
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {integrations.map((integration) => {
            const config = statusConfig[integration.status];
            const Icon = config.icon;
            
            return (
              <div key={integration.system} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Icon className={`h-4 w-4 ${config.color} ${integration.status === 'syncing' ? 'animate-spin' : ''}`} />
                    <div>
                      <p className="font-medium">{integration.system}</p>
                      <p className="text-xs text-muted-foreground">
                        {integration.records.toLocaleString()} records
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant={config.variant}>{config.label}</Badge>
                    <p className="text-xs text-muted-foreground mt-1">{integration.lastSync}</p>
                  </div>
                </div>
                {integration.progress !== undefined && (
                  <Progress value={integration.progress} className="h-1" />
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
