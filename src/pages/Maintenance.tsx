import { useState } from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar, Wrench, Clock, CheckCircle, AlertTriangle, Search, MapPin } from 'lucide-react';

interface MaintenanceTask {
  id: string;
  equipment: string;
  location: string;
  type: string;
  scheduledDate: string;
  priority: 'high' | 'medium' | 'low';
  status: 'scheduled' | 'in-progress' | 'completed' | 'overdue';
  assignedTo?: string;
  description?: string;
}

const Maintenance = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const maintenanceTasks: MaintenanceTask[] = [
    {
      id: 'MT-001',
      equipment: 'Transformer T-245',
      location: 'Substation A',
      type: 'Preventive',
      scheduledDate: '2024-02-15',
      priority: 'high',
      status: 'scheduled',
      assignedTo: 'John Smith',
      description: 'Annual transformer oil testing and visual inspection'
    },
    {
      id: 'MT-002',
      equipment: 'Circuit Breaker CB-112',
      location: 'Substation B',
      type: 'Corrective',
      scheduledDate: '2024-02-12',
      priority: 'high',
      status: 'in-progress',
      assignedTo: 'Sarah Johnson',
      description: 'Replace faulty contact assembly'
    },
    {
      id: 'MT-003',
      equipment: 'Power Line PL-334',
      location: 'Distribution Grid North',
      type: 'Inspection',
      scheduledDate: '2024-02-10',
      priority: 'medium',
      status: 'completed',
      assignedTo: 'Mike Brown',
      description: 'Routine power line inspection'
    },
    {
      id: 'MT-004',
      equipment: 'Generator G-089',
      location: 'Power Plant 1',
      type: 'Preventive',
      scheduledDate: '2024-02-08',
      priority: 'high',
      status: 'overdue',
      assignedTo: 'Emily Davis',
      description: 'Generator maintenance - lubrication and filter replacement'
    },
    {
      id: 'MT-005',
      equipment: 'Switchgear SW-456',
      location: 'Substation C',
      type: 'Preventive',
      scheduledDate: '2024-02-20',
      priority: 'medium',
      status: 'scheduled',
      assignedTo: 'Robert Wilson',
      description: 'Quarterly switchgear maintenance'
    },
    {
      id: 'MT-006',
      equipment: 'Battery Bank BB-023',
      location: 'Control Center',
      type: 'Testing',
      scheduledDate: '2024-02-18',
      priority: 'low',
      status: 'scheduled',
      assignedTo: 'Lisa Anderson',
      description: 'Battery capacity testing'
    }
  ];

  const statusConfig = {
    scheduled: { variant: 'default' as const, icon: Calendar, label: 'Scheduled' },
    'in-progress': { variant: 'secondary' as const, icon: Clock, label: 'In Progress' },
    completed: { variant: 'default' as const, icon: CheckCircle, label: 'Completed' },
    overdue: { variant: 'destructive' as const, icon: AlertTriangle, label: 'Overdue' }
  };

  const priorityVariants = {
    high: 'destructive' as const,
    medium: 'default' as const,
    low: 'secondary' as const
  };

  const typeColors = {
    'Preventive': 'bg-primary/10 text-primary',
    'Corrective': 'bg-destructive/10 text-destructive',
    'Inspection': 'bg-secondary/50 text-secondary-foreground',
    'Testing': 'bg-accent text-accent-foreground'
  };

  const filteredTasks = maintenanceTasks.filter(task =>
    task.equipment.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = [
    { 
      title: 'Total Scheduled', 
      value: maintenanceTasks.filter(t => t.status === 'scheduled').length, 
      icon: Calendar,
      description: 'Upcoming tasks'
    },
    { 
      title: 'In Progress', 
      value: maintenanceTasks.filter(t => t.status === 'in-progress').length, 
      icon: Clock,
      description: 'Active maintenance'
    },
    { 
      title: 'Completed', 
      value: maintenanceTasks.filter(t => t.status === 'completed').length, 
      icon: CheckCircle,
      description: 'This month'
    },
    { 
      title: 'Overdue', 
      value: maintenanceTasks.filter(t => t.status === 'overdue').length, 
      icon: AlertTriangle,
      description: 'Require attention'
    }
  ];

  return (
    <PageLayout title="Maintenance Management">
      <div className="space-y-6">
        {/* Stats Overview */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle>Maintenance Tasks</CardTitle>
                <CardDescription>View and manage all maintenance activities</CardDescription>
              </div>
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search tasks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
                <TabsTrigger value="in-progress">In Progress</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
                <TabsTrigger value="overdue">Overdue</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="space-y-4 mt-4">
                {filteredTasks.map((task) => (
                  <MaintenanceTaskCard key={task.id} task={task} statusConfig={statusConfig} priorityVariants={priorityVariants} typeColors={typeColors} />
                ))}
              </TabsContent>
              
              {['scheduled', 'in-progress', 'completed', 'overdue'].map(status => (
                <TabsContent key={status} value={status} className="space-y-4 mt-4">
                  {filteredTasks.filter(t => t.status === status).map((task) => (
                    <MaintenanceTaskCard key={task.id} task={task} statusConfig={statusConfig} priorityVariants={priorityVariants} typeColors={typeColors} />
                  ))}
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

interface MaintenanceTaskCardProps {
  task: MaintenanceTask;
  statusConfig: any;
  priorityVariants: any;
  typeColors: any;
}

const MaintenanceTaskCard = ({ task, statusConfig, priorityVariants, typeColors }: MaintenanceTaskCardProps) => {
  const StatusIcon = statusConfig[task.status].icon;
  
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="space-y-3 flex-1">
            <div className="flex items-start gap-3">
              <Wrench className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
              <div className="space-y-1 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-semibold">{task.equipment}</h3>
                  <Badge variant={priorityVariants[task.priority]} className="capitalize">
                    {task.priority}
                  </Badge>
                  <Badge variant={statusConfig[task.status].variant} className="gap-1">
                    <StatusIcon className="h-3 w-3" />
                    {statusConfig[task.status].label}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {task.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {new Date(task.scheduledDate).toLocaleDateString()}
                  </span>
                </div>
                {task.description && (
                  <p className="text-sm text-muted-foreground">{task.description}</p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2 flex-wrap ml-8">
              <span className={`px-2 py-1 rounded-md text-xs font-medium ${typeColors[task.type]}`}>
                {task.type}
              </span>
              {task.assignedTo && (
                <span className="text-xs text-muted-foreground">
                  Assigned to: <span className="font-medium">{task.assignedTo}</span>
                </span>
              )}
            </div>
          </div>
          <Button variant="outline" size="sm" className="shrink-0">
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Maintenance;
