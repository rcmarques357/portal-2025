import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Edit, Trash2, Calendar, AlertTriangle } from 'lucide-react';
import { Task, TaskStatus } from './types';
import { format, isPast } from 'date-fns';

interface TaskListProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
  onUpdateStatus: (taskId: string, status: TaskStatus) => void;
  onUpdateProgress: (taskId: string, percentCompleted: number) => void;
}

const taskStatusColors: Record<TaskStatus, string> = {
  'not started': 'bg-gray-500/10 text-gray-500 border-gray-500/20',
  'in progress': 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  completed: 'bg-green-500/10 text-green-500 border-green-500/20',
  delayed: 'bg-red-500/10 text-red-500 border-red-500/20',
};

export function TaskList({ tasks, onEdit, onDelete, onUpdateStatus, onUpdateProgress }: TaskListProps) {
  const isOverdue = (task: Task) => {
    return isPast(new Date(task.deadline)) && task.percentCompleted < 100;
  };

  if (tasks.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        No tasks yet. Add your first task to get started.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => {
        const overdue = isOverdue(task);
        
        return (
          <div
            key={task.id}
            className={`border rounded-lg p-4 space-y-3 ${
              overdue ? 'border-red-500 bg-red-500/5' : 'border-border'
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="font-semibold">{task.name}</h4>
                  {overdue && (
                    <div className="flex items-center gap-1 text-red-500">
                      <AlertTriangle className="h-4 w-4" />
                      <span className="text-xs font-medium">Overdue</span>
                    </div>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{task.description}</p>
              </div>
              <div className="flex gap-1">
                <Button size="icon" variant="ghost" onClick={() => onEdit(task)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="ghost" onClick={() => onDelete(task.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Status</label>
                <Select
                  value={task.status}
                  onValueChange={(value) => onUpdateStatus(task.id, value as TaskStatus)}
                >
                  <SelectTrigger className="h-9">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="not started">Not Started</SelectItem>
                    <SelectItem value="in progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="delayed">Delayed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Deadline</label>
                <div className="flex items-center gap-2 h-9">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{format(new Date(task.deadline), 'MMM dd, yyyy')}</span>
                </div>
              </div>

              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Weight</label>
                <div className="flex items-center h-9">
                  <Badge variant="outline">{task.weight}%</Badge>
                </div>
              </div>

              <div>
                <label className="text-xs text-muted-foreground mb-1 block">
                  Completion: {task.percentCompleted}%
                </label>
                <Slider
                  value={[task.percentCompleted]}
                  onValueChange={(value) => onUpdateProgress(task.id, value[0])}
                  max={100}
                  step={5}
                  className="mt-1"
                />
              </div>
            </div>

            <Progress value={task.percentCompleted} className="h-2" />
          </div>
        );
      })}
    </div>
  );
}
