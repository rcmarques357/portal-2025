import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, Calendar, TrendingUp } from 'lucide-react';
import { Initiative } from './types';
import { format } from 'date-fns';

interface InitiativeCardProps {
  initiative: Initiative;
  onClick: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const statusColors: Record<string, string> = {
  planned: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  'in progress': 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
  completed: 'bg-green-500/10 text-green-500 border-green-500/20',
  'on hold': 'bg-gray-500/10 text-gray-500 border-gray-500/20',
};

export function InitiativeCard({ initiative, onClick, onEdit, onDelete }: InitiativeCardProps) {
  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit();
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete();
  };

  return (
    <Card className="cursor-pointer hover:shadow-lg transition-all" onClick={onClick}>
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono text-muted-foreground">
                {initiative.processNumber}
              </span>
              <Badge variant="outline" className={statusColors[initiative.status]}>
                {initiative.status}
              </Badge>
            </div>
            <CardTitle className="text-lg">{initiative.name}</CardTitle>
          </div>
          <div className="flex gap-1">
            <Button size="icon" variant="ghost" onClick={handleEdit}>
              <Edit className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="ghost" onClick={handleDelete}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {initiative.description}
        </p>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              <span className="font-semibold">{initiative.completenessRate}%</span>
            </div>
          </div>
          <Progress value={initiative.completenessRate} className="h-2" />
        </div>

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>{format(new Date(initiative.startDate), 'MMM dd, yyyy')}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>{format(new Date(initiative.completionDate), 'MMM dd, yyyy')}</span>
          </div>
        </div>

        <div className="text-xs text-muted-foreground">
          {initiative.tasks.length} {initiative.tasks.length === 1 ? 'task' : 'tasks'}
        </div>
      </CardContent>
    </Card>
  );
}
