import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Edit, Trash2, Plus, Calendar, TrendingUp, List, GanttChart } from 'lucide-react';
import { Initiative, Task } from './types';
import { TaskList } from './TaskList';
import { TaskGanttChart } from './TaskGanttChart';
import { TaskForm } from './TaskForm';
import { format } from 'date-fns';

interface InitiativeDetailProps {
  initiative: Initiative;
  onBack: () => void;
  onUpdate: (updates: Partial<Initiative>) => void;
  onDelete: () => void;
  onEdit: () => void;
  onUpdateTask: (taskId: string, updates: Partial<Task>) => void;
}

const statusColors: Record<string, string> = {
  planned: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  'in progress': 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
  completed: 'bg-green-500/10 text-green-500 border-green-500/20',
  'on hold': 'bg-gray-500/10 text-gray-500 border-gray-500/20',
};

export function InitiativeDetail({
  initiative,
  onBack,
  onUpdate,
  onDelete,
  onEdit,
  onUpdateTask,
}: InitiativeDetailProps) {
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const handleCreateTask = (taskData: Omit<Task, 'id'>) => {
    const newTask: Task = {
      ...taskData,
      id: `t${Date.now()}`,
    };
    onUpdate({ tasks: [...initiative.tasks, newTask] });
    setIsTaskFormOpen(false);
  };

  const handleUpdateTask = (updates: Omit<Task, 'id'>) => {
    if (editingTask) {
      const updatedTasks = initiative.tasks.map(task =>
        task.id === editingTask.id ? { ...task, ...updates } : task
      );
      onUpdate({ tasks: updatedTasks });
    }
    setEditingTask(null);
    setIsTaskFormOpen(false);
  };

  const handleDeleteTask = (taskId: string) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      onUpdate({ tasks: initiative.tasks.filter(t => t.id !== taskId) });
    }
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsTaskFormOpen(true);
  };

  const handleQuickTaskUpdate = (taskId: string, updates: Partial<Task>) => {
    const updatedTasks = initiative.tasks.map(task =>
      task.id === taskId ? { ...task, ...updates } : task
    );
    onUpdate({ tasks: updatedTasks });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm font-mono text-muted-foreground">
                {initiative.processNumber}
              </span>
              <Badge variant="outline" className={statusColors[initiative.status]}>
                {initiative.status}
              </Badge>
            </div>
            <h1 className="text-3xl font-bold">{initiative.name}</h1>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onEdit}>
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
          <Button variant="destructive" onClick={onDelete}>
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Completion Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <TrendingUp className="h-8 w-8 text-primary" />
              <div>
                <div className="text-3xl font-bold">{initiative.completenessRate}%</div>
                <Progress value={initiative.completenessRate} className="h-2 mt-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Start Date
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <Calendar className="h-8 w-8 text-primary" />
              <div className="text-2xl font-semibold">
                {format(new Date(initiative.startDate), 'MMM dd, yyyy')}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Target Completion
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <Calendar className="h-8 w-8 text-primary" />
              <div className="text-2xl font-semibold">
                {format(new Date(initiative.completionDate), 'MMM dd, yyyy')}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Description */}
      <Card>
        <CardHeader>
          <CardTitle>Description</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{initiative.description}</p>
        </CardContent>
      </Card>

      {/* Tasks Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Tasks ({initiative.tasks.length})</CardTitle>
            <Button onClick={() => { setEditingTask(null); setIsTaskFormOpen(true); }}>
              <Plus className="h-4 w-4 mr-2" />
              Add Task
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="list" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-2 mb-4">
              <TabsTrigger value="list" className="flex items-center gap-2">
                <List className="h-4 w-4" />
                List View
              </TabsTrigger>
              <TabsTrigger value="gantt" className="flex items-center gap-2">
                <GanttChart className="h-4 w-4" />
                Gantt Chart
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="list" className="mt-0">
              <TaskList
                tasks={initiative.tasks}
                onEdit={handleEditTask}
                onDelete={handleDeleteTask}
                onUpdateStatus={(taskId, status) => handleQuickTaskUpdate(taskId, { status })}
                onUpdateProgress={(taskId, percentCompleted) =>
                  handleQuickTaskUpdate(taskId, { percentCompleted })
                }
              />
            </TabsContent>
            
            <TabsContent value="gantt" className="mt-0">
              <TaskGanttChart
                tasks={initiative.tasks}
                initiativeStartDate={initiative.startDate}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {isTaskFormOpen && (
        <TaskForm
          task={editingTask}
          onSave={(data) => {
            if (editingTask) {
              handleUpdateTask(data);
            } else {
              handleCreateTask(data);
            }
          }}
          onCancel={() => {
            setIsTaskFormOpen(false);
            setEditingTask(null);
          }}
        />
      )}
    </div>
  );
}
