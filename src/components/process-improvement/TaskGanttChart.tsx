import React from 'react';
import { Task } from './types';
import { format, differenceInDays, min, max } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Calendar } from 'lucide-react';

interface TaskGanttChartProps {
  tasks: Task[];
  initiativeStartDate: string;
}

const taskStatusColors: Record<Task['status'], string> = {
  'not started': 'bg-gray-500',
  'in progress': 'bg-blue-500',
  completed: 'bg-green-500',
  delayed: 'bg-red-500',
};

export function TaskGanttChart({ tasks, initiativeStartDate }: TaskGanttChartProps) {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        No tasks to display in Gantt chart.
      </div>
    );
  }

  // Calculate date range
  const allDates = [
    new Date(initiativeStartDate),
    ...tasks.map(t => new Date(t.deadline)),
  ];
  const startDate = min(allDates);
  const endDate = max(allDates);
  const totalDays = differenceInDays(endDate, startDate) || 1;

  // Generate month markers
  const months: { label: string; position: number }[] = [];
  const currentDate = new Date(startDate);
  while (currentDate <= endDate) {
    const daysFromStart = differenceInDays(currentDate, startDate);
    const position = (daysFromStart / totalDays) * 100;
    months.push({
      label: format(currentDate, 'MMM yyyy'),
      position,
    });
    currentDate.setMonth(currentDate.getMonth() + 1);
  }

  return (
    <div className="space-y-4">
      {/* Timeline Header */}
      <div className="relative bg-muted/30 rounded-lg p-4 min-h-[60px]">
        <div className="flex items-center gap-2 mb-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">
            {format(startDate, 'MMM dd, yyyy')} - {format(endDate, 'MMM dd, yyyy')}
          </span>
        </div>
        <div className="relative h-8">
          {months.map((month, idx) => (
            <div
              key={idx}
              className="absolute top-0 text-xs text-muted-foreground"
              style={{ left: `${month.position}%` }}
            >
              <div className="border-l border-border h-8" />
              <span className="ml-1">{month.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tasks Gantt Bars */}
      <div className="space-y-3">
        {tasks.map((task) => {
          // Calculate task bar position and width
          const taskStart = new Date(initiativeStartDate);
          const taskEnd = new Date(task.deadline);
          const startOffset = differenceInDays(taskStart, startDate);
          const taskDuration = differenceInDays(taskEnd, taskStart) || 1;
          
          const leftPosition = (startOffset / totalDays) * 100;
          const barWidth = (taskDuration / totalDays) * 100;

          return (
            <div key={task.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm truncate">{task.name}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className="text-xs">
                      {task.status}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {task.percentCompleted}% complete
                    </span>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground whitespace-nowrap ml-4">
                  Due: {format(taskEnd, 'MMM dd')}
                </div>
              </div>

              {/* Gantt Bar */}
              <div className="relative bg-muted/30 rounded h-8 overflow-visible">
                <div
                  className={`absolute top-0 h-full rounded transition-all ${
                    taskStatusColors[task.status]
                  } opacity-80 hover:opacity-100`}
                  style={{
                    left: `${Math.max(0, leftPosition)}%`,
                    width: `${Math.min(barWidth, 100 - leftPosition)}%`,
                  }}
                >
                  {/* Progress indicator */}
                  <div
                    className="h-full bg-white/30 rounded-l"
                    style={{ width: `${task.percentCompleted}%` }}
                  />
                  
                  {/* Task weight badge */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-semibold text-white drop-shadow-md">
                      {task.weight}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 pt-4 border-t">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-gray-500" />
          <span className="text-xs">Not Started</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-blue-500" />
          <span className="text-xs">In Progress</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-green-500" />
          <span className="text-xs">Completed</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-red-500" />
          <span className="text-xs">Delayed</span>
        </div>
      </div>
    </div>
  );
}
