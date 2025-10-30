import React, { useState } from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Search } from 'lucide-react';
import { InitiativeCard } from '@/components/process-improvement/InitiativeCard';
import { InitiativeDetail } from '@/components/process-improvement/InitiativeDetail';
import { InitiativeForm } from '@/components/process-improvement/InitiativeForm';
import { Initiative, Task } from '@/components/process-improvement/types';
import { mockInitiatives } from '@/components/process-improvement/mockData';

export default function ProcessImprovement() {
  const [initiatives, setInitiatives] = useState<Initiative[]>(mockInitiatives);
  const [selectedInitiative, setSelectedInitiative] = useState<Initiative | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingInitiative, setEditingInitiative] = useState<Initiative | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('name');

  const calculateInitiativeCompletion = (tasks: Task[]): number => {
    if (tasks.length === 0) return 0;
    const totalWeight = tasks.reduce((sum, task) => sum + task.weight, 0);
    const weightedCompletion = tasks.reduce((sum, task) => sum + (task.percentCompleted * task.weight), 0);
    return totalWeight > 0 ? Math.round(weightedCompletion / totalWeight) : 0;
  };

  const handleCreateInitiative = (data: { processNumber: string; name: string; description: string; status: Initiative['status']; startDate: string; completionDate: string }) => {
    const newInitiative: Initiative = {
      ...data,
      id: Date.now().toString(),
      completenessRate: 0,
      tasks: [],
    };
    setInitiatives([...initiatives, newInitiative]);
    setIsFormOpen(false);
  };

  const handleUpdateInitiative = (id: string, updates: Partial<Initiative>) => {
    setInitiatives(initiatives.map(init => {
      if (init.id === id) {
        const updated = { ...init, ...updates };
        if (updates.tasks) {
          updated.completenessRate = calculateInitiativeCompletion(updates.tasks);
        }
        return updated;
      }
      return init;
    }));
    if (selectedInitiative?.id === id) {
      const updated = initiatives.find(i => i.id === id);
      if (updated) {
        setSelectedInitiative({ ...updated, ...updates });
      }
    }
  };

  const handleDeleteInitiative = (id: string) => {
    if (window.confirm('Are you sure you want to delete this initiative?')) {
      setInitiatives(initiatives.filter(init => init.id !== id));
      if (selectedInitiative?.id === id) {
        setSelectedInitiative(null);
      }
    }
  };

  const handleEditInitiative = (initiative: Initiative) => {
    setEditingInitiative(initiative);
    setIsFormOpen(true);
  };

  const handleUpdateTask = (initiativeId: string, taskId: string, updates: Partial<Task>) => {
    const initiative = initiatives.find(i => i.id === initiativeId);
    if (initiative) {
      const updatedTasks = initiative.tasks.map(task => 
        task.id === taskId ? { ...task, ...updates } : task
      );
      handleUpdateInitiative(initiativeId, { tasks: updatedTasks });
    }
  };

  const filteredAndSortedInitiatives = initiatives
    .filter(init => {
      const matchesSearch = init.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           init.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'all' || init.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'completion':
          return b.completenessRate - a.completenessRate;
        case 'startDate':
          return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
        default:
          return 0;
      }
    });

  if (selectedInitiative) {
    return (
      <PageLayout title="Process Improvement">
        <InitiativeDetail
          initiative={selectedInitiative}
          onBack={() => setSelectedInitiative(null)}
          onUpdate={(updates) => handleUpdateInitiative(selectedInitiative.id, updates)}
          onDelete={() => handleDeleteInitiative(selectedInitiative.id)}
          onEdit={() => handleEditInitiative(selectedInitiative)}
          onUpdateTask={(taskId, updates) => handleUpdateTask(selectedInitiative.id, taskId, updates)}
        />
      </PageLayout>
    );
  }

  return (
    <PageLayout title="Process Improvement">
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex-1 w-full sm:max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search initiatives..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <Button onClick={() => { setEditingInitiative(null); setIsFormOpen(true); }}>
            <Plus className="h-4 w-4 mr-2" />
            New Initiative
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="planned">Planned</SelectItem>
              <SelectItem value="in progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="on hold">On Hold</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="completion">Completion Rate</SelectItem>
              <SelectItem value="startDate">Start Date</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Initiatives Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredAndSortedInitiatives.map(initiative => (
            <InitiativeCard
              key={initiative.id}
              initiative={initiative}
              onClick={() => setSelectedInitiative(initiative)}
              onEdit={() => handleEditInitiative(initiative)}
              onDelete={() => handleDeleteInitiative(initiative.id)}
            />
          ))}
        </div>

        {filteredAndSortedInitiatives.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            No initiatives found matching your filters.
          </div>
        )}
      </div>

      {isFormOpen && (
        <InitiativeForm
          initiative={editingInitiative}
          onSave={(data) => {
            if (editingInitiative) {
              handleUpdateInitiative(editingInitiative.id, data);
            } else {
              handleCreateInitiative(data);
            }
            setIsFormOpen(false);
            setEditingInitiative(null);
          }}
          onCancel={() => {
            setIsFormOpen(false);
            setEditingInitiative(null);
          }}
        />
      )}
    </PageLayout>
  );
}
