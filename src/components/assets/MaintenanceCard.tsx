import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Wrench, Calendar, MapPin } from 'lucide-react';

interface MaintenanceTask {
  id: string;
  equipment: string;
  location: string;
  type: 'preventive' | 'corrective' | 'inspection';
  scheduledDate: string;
  priority: 'high' | 'medium' | 'low';
}

const tasks: MaintenanceTask[] = [
  {
    id: 'M-001',
    equipment: 'Transformer TX-4523',
    location: 'Substation Alpha-12',
    type: 'preventive',
    scheduledDate: 'Today, 2:00 PM',
    priority: 'high',
  },
  {
    id: 'M-002',
    equipment: 'Circuit Breaker CB-8821',
    location: 'Distribution Center North',
    type: 'inspection',
    scheduledDate: 'Tomorrow, 9:00 AM',
    priority: 'medium',
  },
  {
    id: 'M-003',
    equipment: 'Power Line PL-2341',
    location: 'Sector 7-B',
    type: 'corrective',
    scheduledDate: 'Today, 4:30 PM',
    priority: 'high',
  },
  {
    id: 'M-004',
    equipment: 'Switchgear SG-1129',
    location: 'Main Distribution Hub',
    type: 'preventive',
    scheduledDate: 'Dec 18, 10:00 AM',
    priority: 'low',
  },
];

const typeColors = {
  preventive: 'bg-primary/10 text-primary',
  corrective: 'bg-danger/10 text-danger',
  inspection: 'bg-accent/10 text-accent-foreground',
};

const priorityVariants = {
  high: 'destructive' as const,
  medium: 'secondary' as const,
  low: 'outline' as const,
};

export function MaintenanceCard() {
  return (
    <Card className="animate-enter">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wrench className="h-5 w-5 text-primary" />
          Upcoming Maintenance
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="font-medium">{task.equipment}</p>
                  <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    <span>{task.location}</span>
                  </div>
                </div>
                <Badge variant={priorityVariants[task.priority]}>
                  {task.priority}
                </Badge>
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className={`text-xs px-2 py-1 rounded-full ${typeColors[task.type]}`}>
                  {task.type}
                </span>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  <span>{task.scheduledDate}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
