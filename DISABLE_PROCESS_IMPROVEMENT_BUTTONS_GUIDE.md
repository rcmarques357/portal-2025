# Guide: Disable Create/Update/Delete Buttons in Process Improvement Section

## Overview

This guide shows you how to restrict create, update, and delete operations in the Process Improvement section based on user roles. Only users with "editor" or "admin" roles will be able to modify data.

## Prerequisites

- Django backend with role-based authentication (see `DJANGO_BACKEND_SETUP.md`)
- `AuthContext` already implemented in your React app
- User logged in with a specific role (`regular`, `editor`, or `admin`)

---

## Part 1: Understanding the Current Setup

### Your Auth System

Your app already has an `AuthContext` that provides:

```typescript
const { user, canEdit, isAdmin, userRole } = useAuth();

// canEdit = true for 'editor' and 'admin' roles
// canEdit = false for 'regular' users
```

### Buttons to Control

**In the Process Improvement section, there are several buttons:**

1. **Main Page (`src/pages/ProcessImprovement.tsx`)**:
   - "New Initiative" button
   - Edit and Delete buttons on each initiative card

2. **Initiative Detail Page (`src/components/process-improvement/InitiativeDetail.tsx`)**:
   - "Edit" and "Delete" buttons for the initiative
   - "Add Task" button
   - Edit and Delete buttons for each task

---

## Part 2: Implementation Steps

### Step 1: Update ProcessImprovement.tsx

Import `useAuth` and conditionally render buttons:

```tsx
import { useAuth } from '@/contexts/AuthContext';

export default function ProcessImprovement() {
  const { canEdit } = useAuth(); // Add this line
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingInitiative, setEditingInitiative] = useState<Initiative | null>(null);
  const [selectedInitiative, setSelectedInitiative] = useState<Initiative | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<keyof Initiative>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [initiatives, setInitiatives] = useState<Initiative[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchInitiatives = async () => {
      try {
        const response = await fetch('/api/initiatives');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setInitiatives(data);
      } catch (error) {
        console.error("Could not fetch initiatives:", error);
      }
    };

    fetchInitiatives();
  }, []);

  const handleEditInitiative = (initiative: Initiative) => {
    setEditingInitiative(initiative);
    setIsFormOpen(true);
  };

  const handleDeleteInitiative = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this initiative?")) {
      try {
        const response = await fetch(`/api/initiatives/${id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        setInitiatives(initiatives.filter(initiative => initiative.id !== id));
      } catch (error) {
        console.error("Could not delete initiative:", error);
      }
    }
  };

  const filteredAndSortedInitiatives = useMemo(() => {
    let filtered = initiatives.filter(initiative =>
      initiative.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const sorted = [...filtered].sort((a, b) => {
      const aValue = a[sortBy];
      const bValue = b[sortBy];

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortOrder === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
      } else if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
      }

      return 0;
    });

    return sorted;
  }, [initiatives, searchQuery, sortBy, sortOrder]);

  return (
    <PageLayout title="Process Improvement">
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex-1 w-full sm:max-w-md">
            {/* Search input */}
          </div>
          
          {/* Only show "New Initiative" button if user canEdit */}
          {canEdit && (
            <Button onClick={() => { setEditingInitiative(null); setIsFormOpen(true); }}>
              <Plus className="h-4 w-4 mr-2" />
              New Initiative
            </Button>
          )}
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
              canEdit={canEdit} // Pass canEdit as prop
            />
          ))}
        </div>
      </div>

      {/* Only allow form to open if canEdit */}
      {isFormOpen && canEdit && (
        <InitiativeForm
          initiative={editingInitiative}
          onSave={(data) => {
            // ... save logic
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
```

### Step 2: Update InitiativeCard.tsx

Accept `canEdit` prop and conditionally render action buttons:

```tsx
interface InitiativeCardProps {
  initiative: Initiative;
  onClick: () => void;
  onEdit: () => void;
  onDelete: () => void;
  canEdit: boolean; // Add this prop
}

export function InitiativeCard({ 
  initiative, 
  onClick, 
  onEdit, 
  onDelete,
  canEdit // Add this
}: InitiativeCardProps) {
  
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
            {/* Initiative info */}
          </div>
          
          {/* Only show action buttons if canEdit */}
          {canEdit && (
            <div className="flex gap-1">
              <Button size="icon" variant="ghost" onClick={handleEdit}>
                <Edit className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="ghost" onClick={handleDelete}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {/* Card content */}
      </CardContent>
    </Card>
  );
}
```

### Step 3: Update InitiativeDetail.tsx

Import `useAuth` and conditionally render all action buttons:

```tsx
import { useAuth } from '@/contexts/AuthContext';

export function InitiativeDetail({
  initiative,
  onBack,
  onUpdate,
  onDelete,
  onEdit,
  onUpdateTask,
}: InitiativeDetailProps) {
  const { canEdit } = useAuth(); // Add this line
  
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [selectedTaskForFiles, setSelectedTaskForFiles] = useState<Task | null>(null);

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsTaskFormOpen(true);
  };

  const handleDeleteTask = async (taskId: string) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        const response = await fetch(`/api/tasks/${taskId}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const updatedTasks = initiative.tasks.filter(task => task.id !== taskId);
        onUpdate({ ...initiative, tasks: updatedTasks });
      } catch (error) {
        console.error("Could not delete task:", error);
      }
    }
  };

  const handleQuickTaskUpdate = async (taskId: string, updates: Partial<Task>) => {
    try {
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const updatedTask = await response.json();
      const updatedTasks = initiative.tasks.map(task => task.id === taskId ? updatedTask : task);
      onUpdate({ ...initiative, tasks: updatedTasks });
    } catch (error) {
      console.error("Could not update task:", error);
    }
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
            <h1 className="text-3xl font-bold">{initiative.name}</h1>
          </div>
        </div>
        
        {/* Only show Edit/Delete if canEdit */}
        {canEdit && (
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
        )}
      </div>

      {/* ... Overview cards and description ... */}

      {/* Tasks Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Tasks ({initiative.tasks.length})</CardTitle>
            
            {/* Only show "Add Task" button if canEdit */}
            {canEdit && (
              <Button onClick={() => { setEditingTask(null); setIsTaskFormOpen(true); }}>
                <Plus className="h-4 w-4 mr-2" />
                Add Task
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="list" className="w-full">
            <TabsList>
              {/* ... tabs ... */}
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
                onViewFiles={(task) => setSelectedTaskForFiles(task)}
                canEdit={canEdit} // Pass canEdit to TaskList
              />
            </TabsContent>
            
            <TabsContent value="gantt" className="mt-0">
              {/* Gantt chart is read-only, no changes needed */}
              <TaskGanttChart
                tasks={initiative.tasks}
                initiativeStartDate={initiative.startDate}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Only allow task form to open if canEdit */}
      {isTaskFormOpen && canEdit && (
        <TaskForm
          task={editingTask}
          onSave={(data) => {
            // ... save logic
          }}
          onCancel={() => {
            setIsTaskFormOpen(false);
            setEditingTask(null);
          }}
        />
      )}

      {/* File viewer - read-only, no changes needed */}
      {selectedTaskForFiles && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50">
          {/* ... file viewer ... */}
        </div>
      )}
    </div>
  );
}
```

### Step 4: Update TaskList.tsx

Accept `canEdit` prop and conditionally render action buttons:

```tsx
interface TaskListProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
  onUpdateStatus: (taskId: string, status: Task['status']) => void;
  onUpdateProgress: (taskId: string, percentCompleted: number) => void;
  onViewFiles: (task: Task) => void;
  canEdit: boolean; // Add this prop
}

export function TaskList({
  tasks,
  onEdit,
  onDelete,
  onUpdateStatus,
  onUpdateProgress,
  onViewFiles,
  canEdit, // Add this
}: TaskListProps) {
  
  return (
    <div className="space-y-3">
      {tasks.map(task => (
        <Card key={task.id}>
          <CardContent className="pt-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                {/* Task info */}
                <h4 className="font-semibold">{task.name}</h4>
                <p className="text-sm text-muted-foreground">{task.description}</p>
              </div>
              
              {/* Only show action buttons if canEdit */}
              {canEdit && (
                <div className="flex gap-1">
                  <Button size="icon" variant="ghost" onClick={() => onEdit(task)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="ghost" onClick={() => onDelete(task.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
            
            {/* Progress controls */}
            <div className="mt-4 space-y-2">
              {/* Show progress slider as disabled if !canEdit */}
              <Slider
                value={[task.percentCompleted]}
                onValueChange={(value) => canEdit && onUpdateProgress(task.id, value[0])}
                max={100}
                step={1}
                disabled={!canEdit} // Disable slider for regular users
                className="w-full"
              />
              
              {/* Status dropdown */}
              <Select
                value={task.status}
                onValueChange={(value) => canEdit && onUpdateStatus(task.id, value)}
                disabled={!canEdit} // Disable dropdown for regular users
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="not started">Not Started</SelectItem>
                  <SelectItem value="in progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="on hold">On Hold</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* View Files button - always visible */}
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => onViewFiles(task)}
              className="mt-2"
            >
              View Files ({task.files.length})
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
```

### Step 5: Update TaskFiles.tsx (Optional)

If you want to restrict file uploads to editors/admins:

```tsx
import { useAuth } from '@/contexts/AuthContext';

export function TaskFiles({ files, onAddFile, onDeleteFile }: TaskFilesProps) {
  const { canEdit } = useAuth();
  
  return (
    <div className="space-y-4">
      {/* Only show upload form if canEdit */}
      {canEdit && (
        <div className="border-2 border-dashed rounded-lg p-6">
          {/* File upload form */}
          <Button onClick={handleFileUpload}>
            <Upload className="h-4 w-4 mr-2" />
            Upload File
          </Button>
        </div>
      )}
      
      {/* Files list */}
      <div className="space-y-2">
        {files.map(file => (
          <div key={file.id} className="flex items-center justify-between p-3 border rounded">
            <div>
              <p className="font-medium">{file.name}</p>
              <p className="text-sm text-muted-foreground">{file.uploadedBy}</p>
            </div>
            
            <div className="flex gap-2">
              <Button variant="ghost" size="sm">
                <Download className="h-4 w-4" />
              </Button>
              
              {/* Only show delete button if canEdit */}
              {canEdit && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => onDeleteFile(file.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

---

## Part 3: Testing the Implementation

### Test Scenarios

1. **As a Regular User (`role: 'regular'`)**:
   - ❌ Should NOT see "New Initiative" button
   - ❌ Should NOT see Edit/Delete buttons on initiative cards
   - ❌ Should NOT see Edit/Delete buttons on initiative detail page
   - ❌ Should NOT see "Add Task" button
   - ❌ Should NOT see Edit/Delete buttons on tasks
   - ❌ Should NOT be able to change task progress/status
   - ✅ SHOULD be able to view all data (read-only)
   - ✅ SHOULD be able to view and download files

2. **As an Editor (`role: 'editor'`)**:
   - ✅ SHOULD see all create/update/delete buttons
   - ✅ SHOULD be able to create, edit, and delete initiatives
   - ✅ SHOULD be able to create, edit, and delete tasks
   - ✅ SHOULD be able to change task progress/status
   - ✅ SHOULD be able to upload/delete files

3. **As an Admin (`role: 'admin'`)**:
   - ✅ SHOULD have same permissions as Editor
   - ✅ SHOULD see all create/update/delete buttons

### How to Test

1. **Create Test Users in Django**:

```python
# In Django shell
python manage.py shell

from your_app.models import User

# Create regular user
regular_user = User.objects.create_user(
    email='regular@test.com',
    password='test123',
    role='regular'
)

# Create editor user
editor_user = User.objects.create_user(
    email='editor@test.com',
    password='test123',
    role='editor'
)

# Create admin user
admin_user = User.objects.create_user(
    email='admin@test.com',
    password='test123',
    role='admin'
)
```

2. **Test in Browser**:
   - Login as `regular@test.com`
   - Navigate to Process Improvement section
   - Verify no create/edit/delete buttons appear
   - Logout and login as `editor@test.com`
   - Verify all buttons appear
   - Test creating/editing/deleting

3. **Check Console for Errors**:
   - Open browser DevTools (F12)
   - Check for any errors when clicking buttons
   - Verify API calls are only made when user has permissions

---

## Part 4: Additional Security (Backend Validation)

**IMPORTANT**: Frontend restrictions can be bypassed! Always validate permissions on the backend.

### Django View Permission Checks

Make sure your Django views enforce permissions:

```python
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .permissions import IsEditorOrAdmin  # From DJANGO_BACKEND_SETUP.md

class InitiativeViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    
    def get_permissions(self):
        """
        Apply IsEditorOrAdmin for create, update, delete
        Allow IsAuthenticated for read-only operations
        """
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            return [IsAuthenticated(), IsEditorOrAdmin()]
        return [IsAuthenticated()]
    
    # ... rest of viewset
```

This ensures that even if a user bypasses the frontend restrictions, the backend will reject unauthorized requests.

---

## Part 5: Alternative Approach - Disable Instead of Hide

If you want to **show but disable** buttons instead of hiding them:

```tsx
{/* Instead of conditional rendering */}
<Button 
  onClick={() => handleEdit(initiative)}
  disabled={!canEdit} // Disable if user can't edit
>
  <Edit className="h-4 w-4 mr-2" />
  Edit
</Button>

{/* With tooltip explaining why */}
{!canEdit ? (
  <Tooltip>
    <TooltipTrigger asChild>
      <Button disabled>
        <Edit className="h-4 w-4 mr-2" />
        Edit
      </Button>
    </TooltipTrigger>
    <TooltipContent>
      <p>You need editor or admin permissions to edit</p>
    </TooltipContent>
  </Tooltip>
) : (
  <Button onClick={() => handleEdit(initiative)}>
    <Edit className="h-4 w-4 mr-2" />
    Edit
  </Button>
)}
```

---

## Part 6: Summary Checklist

### Frontend Changes
- [ ] Import `useAuth` in `ProcessImprovement.tsx`
- [ ] Conditionally render "New Initiative" button
- [ ] Pass `canEdit` prop to `InitiativeCard`
- [ ] Update `InitiativeCard` to accept and use `canEdit` prop
- [ ] Import `useAuth` in `InitiativeDetail.tsx`
- [ ] Conditionally render Edit/Delete buttons in detail view
- [ ] Conditionally render "Add Task" button
- [ ] Pass `canEdit` prop to `TaskList`
- [ ] Update `TaskList` to disable controls for regular users
- [ ] (Optional) Update `TaskFiles` to restrict uploads

### Backend Security
- [ ] Verify Django permissions in viewsets
- [ ] Test backend rejects unauthorized requests
- [ ] Implement proper error handling

### Testing
- [ ] Create test users with different roles
- [ ] Test as regular user (read-only access)
- [ ] Test as editor (full access)
- [ ] Test as admin (full access)
- [ ] Verify backend rejects unauthorized API calls

---

## Quick Reference

### AuthContext Hook Usage

```tsx
import { useAuth } from '@/contexts/AuthContext';

function MyComponent() {
  const { user, canEdit, isAdmin, userRole } = useAuth();
  
  // canEdit: boolean - true for 'editor' and 'admin'
  // isAdmin: boolean - true only for 'admin'
  // userRole: 'regular' | 'editor' | 'admin' | null
  
  return (
    <>
      {canEdit && <Button>Edit</Button>}
      {isAdmin && <Button>Admin Only</Button>}
    </>
  );
}
```

### Conditional Rendering Patterns

```tsx
// Hide button completely
{canEdit && <Button>Edit</Button>}

// Show disabled button
<Button disabled={!canEdit}>Edit</Button>

// Show with tooltip
{!canEdit ? (
  <Tooltip>
    <TooltipTrigger asChild>
      <Button disabled>Edit</Button>
    </TooltipTrigger>
    <TooltipContent>Need editor permissions</TooltipContent>
  </Tooltip>
) : (
  <Button>Edit</Button>
)}
```

---

## Need Help?

1. Check `DJANGO_BACKEND_SETUP.md` for role setup
2. Check `AuthContext.tsx` for available auth methods
3. Test with different user roles to verify behavior
4. Check browser console for permission errors
5. Verify Django backend permissions are enforced
