import { PageLayout } from '@/components/layout/PageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, Filter, Plus, Clock, CheckCircle2, AlertCircle, 
  Pause, Calendar, User, MapPin, Wrench, FileText 
} from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

interface WorkOrder {
  id: string;
  orderNumber: string;
  title: string;
  description: string;
  status: 'open' | 'in-progress' | 'on-hold' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'critical';
  type: string;
  assignee: string;
  location: string;
  equipment: string;
  dueDate: string;
  createdDate: string;
  completedDate?: string;
}

const WorkOrders = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedPriority, setSelectedPriority] = useState<string>('all');
  const [activeTab, setActiveTab] = useState('all');

  const workOrders: WorkOrder[] = [
    {
      id: '1',
      orderNumber: 'WO-2024-0156',
      title: 'Transformer Maintenance',
      description: 'Routine maintenance and inspection of transformer T-345',
      status: 'in-progress',
      priority: 'high',
      type: 'Preventive Maintenance',
      assignee: 'John Smith',
      location: 'Substation A - Bay 3',
      equipment: 'Transformer T-345',
      dueDate: '2024-01-20',
      createdDate: '2024-01-10'
    },
    {
      id: '2',
      orderNumber: 'WO-2024-0157',
      title: 'Cable Replacement',
      description: 'Replace damaged underground cable section',
      status: 'open',
      priority: 'critical',
      type: 'Corrective Maintenance',
      assignee: 'Unassigned',
      location: 'Grid Section 12-B',
      equipment: 'Cable 12-B-045',
      dueDate: '2024-01-18',
      createdDate: '2024-01-15'
    },
    {
      id: '3',
      orderNumber: 'WO-2024-0158',
      title: 'Circuit Breaker Inspection',
      description: 'Annual inspection of circuit breakers',
      status: 'completed',
      priority: 'medium',
      type: 'Preventive Maintenance',
      assignee: 'Sarah Johnson',
      location: 'Substation B - Bay 1',
      equipment: 'Circuit Breaker CB-112',
      dueDate: '2024-01-15',
      createdDate: '2024-01-05',
      completedDate: '2024-01-14'
    },
    {
      id: '4',
      orderNumber: 'WO-2024-0159',
      title: 'Meter Calibration',
      description: 'Calibrate smart meters in zone 5',
      status: 'on-hold',
      priority: 'low',
      type: 'Calibration',
      assignee: 'Mike Davis',
      location: 'Zone 5 - Residential',
      equipment: 'Smart Meters (Zone 5)',
      dueDate: '2024-01-25',
      createdDate: '2024-01-12'
    },
    {
      id: '5',
      orderNumber: 'WO-2024-0160',
      title: 'Voltage Regulator Repair',
      description: 'Repair faulty voltage regulator',
      status: 'in-progress',
      priority: 'high',
      type: 'Corrective Maintenance',
      assignee: 'John Smith',
      location: 'Substation C - Bay 2',
      equipment: 'Voltage Regulator VR-089',
      dueDate: '2024-01-19',
      createdDate: '2024-01-14'
    },
    {
      id: '6',
      orderNumber: 'WO-2024-0161',
      title: 'Oil Analysis',
      description: 'Collect and analyze transformer oil samples',
      status: 'open',
      priority: 'medium',
      type: 'Testing',
      assignee: 'Unassigned',
      location: 'Substation A - Bay 5',
      equipment: 'Transformer T-567',
      dueDate: '2024-01-22',
      createdDate: '2024-01-15'
    },
    {
      id: '7',
      orderNumber: 'WO-2024-0162',
      title: 'Emergency Power Outage',
      description: 'Investigate and restore power outage in sector 7',
      status: 'completed',
      priority: 'critical',
      type: 'Emergency',
      assignee: 'Emergency Team',
      location: 'Sector 7 - Commercial',
      equipment: 'Multiple',
      dueDate: '2024-01-13',
      createdDate: '2024-01-13',
      completedDate: '2024-01-13'
    },
    {
      id: '8',
      orderNumber: 'WO-2024-0163',
      title: 'GIS Data Update',
      description: 'Update GIS system with new asset locations',
      status: 'open',
      priority: 'low',
      type: 'Administrative',
      assignee: 'Lisa Chen',
      location: 'Office - Data Center',
      equipment: 'GIS System',
      dueDate: '2024-01-30',
      createdDate: '2024-01-14'
    }
  ];

  const getStatusBadge = (status: WorkOrder['status']) => {
    const variants = {
      'open': { variant: 'default' as const, className: 'bg-blue-500/10 text-blue-600 hover:bg-blue-500/20', icon: Clock },
      'in-progress': { variant: 'default' as const, className: 'bg-purple-500/10 text-purple-600 hover:bg-purple-500/20', icon: Wrench },
      'on-hold': { variant: 'default' as const, className: 'bg-yellow-500/10 text-yellow-600 hover:bg-yellow-500/20', icon: Pause },
      'completed': { variant: 'default' as const, className: 'bg-green-500/10 text-green-600 hover:bg-green-500/20', icon: CheckCircle2 },
      'cancelled': { variant: 'default' as const, className: 'bg-red-500/10 text-red-600 hover:bg-red-500/20', icon: AlertCircle }
    };
    
    const config = variants[status];
    const Icon = config.icon;
    
    return (
      <Badge variant={config.variant} className={config.className}>
        <Icon className="h-3 w-3 mr-1" />
        {status.replace('-', ' ')}
      </Badge>
    );
  };

  const getPriorityBadge = (priority: WorkOrder['priority']) => {
    const variants = {
      'low': 'bg-slate-500/10 text-slate-600 hover:bg-slate-500/20',
      'medium': 'bg-blue-500/10 text-blue-600 hover:bg-blue-500/20',
      'high': 'bg-orange-500/10 text-orange-600 hover:bg-orange-500/20',
      'critical': 'bg-red-500/10 text-red-600 hover:bg-red-500/20'
    };
    
    return (
      <Badge variant="outline" className={variants[priority]}>
        {priority.toUpperCase()}
      </Badge>
    );
  };

  const filteredOrders = workOrders.filter(order => {
    const matchesSearch = 
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.equipment.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = selectedStatus === 'all' || order.status === selectedStatus;
    const matchesPriority = selectedPriority === 'all' || order.priority === selectedPriority;
    const matchesTab = activeTab === 'all' || order.status === activeTab;
    
    return matchesSearch && matchesStatus && matchesPriority && matchesTab;
  });

  const getStatusCount = (status: string) => {
    if (status === 'all') return workOrders.length;
    return workOrders.filter(order => order.status === status).length;
  };

  return (
    <PageLayout title="Work Orders">
      <div className="space-y-6">
        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{workOrders.length}</div>
              <p className="text-xs text-muted-foreground">All work orders</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">In Progress</CardTitle>
              <Wrench className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{getStatusCount('in-progress')}</div>
              <p className="text-xs text-muted-foreground">Active work orders</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">On Hold</CardTitle>
              <Pause className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{getStatusCount('on-hold')}</div>
              <p className="text-xs text-muted-foreground">Pending work orders</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{getStatusCount('completed')}</div>
              <p className="text-xs text-muted-foreground">This period</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Work Order Management</CardTitle>
                <CardDescription>Manage and track all maintenance work orders</CardDescription>
              </div>
              <Button onClick={() => toast({ title: "Create Work Order", description: "Work order creation feature coming soon" })}>
                <Plus className="h-4 w-4 mr-2" />
                New Work Order
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search work orders..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="on-hold">On Hold</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedPriority} onValueChange={setSelectedPriority}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priorities</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="all">All ({getStatusCount('all')})</TabsTrigger>
                <TabsTrigger value="open">Open ({getStatusCount('open')})</TabsTrigger>
                <TabsTrigger value="in-progress">In Progress ({getStatusCount('in-progress')})</TabsTrigger>
                <TabsTrigger value="on-hold">On Hold ({getStatusCount('on-hold')})</TabsTrigger>
                <TabsTrigger value="completed">Completed ({getStatusCount('completed')})</TabsTrigger>
              </TabsList>

              <TabsContent value={activeTab} className="mt-6">
                <div className="space-y-4">
                  {filteredOrders.map((order) => (
                    <Card key={order.id}>
                      <CardContent className="p-6">
                        <div className="flex flex-col lg:flex-row gap-4">
                          <div className="flex-1 space-y-3">
                            <div className="flex items-start justify-between gap-4">
                              <div>
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="text-sm text-muted-foreground">{order.orderNumber}</span>
                                  {getPriorityBadge(order.priority)}
                                </div>
                                <h3 className="font-semibold text-lg">{order.title}</h3>
                              </div>
                              {getStatusBadge(order.status)}
                            </div>
                            
                            <p className="text-sm text-muted-foreground">{order.description}</p>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                              <div className="flex items-center gap-2 text-muted-foreground">
                                <Wrench className="h-4 w-4" />
                                <span>{order.equipment}</span>
                              </div>
                              <div className="flex items-center gap-2 text-muted-foreground">
                                <MapPin className="h-4 w-4" />
                                <span>{order.location}</span>
                              </div>
                              <div className="flex items-center gap-2 text-muted-foreground">
                                <User className="h-4 w-4" />
                                <span>{order.assignee}</span>
                              </div>
                              <div className="flex items-center gap-2 text-muted-foreground">
                                <Calendar className="h-4 w-4" />
                                <span>Due: {order.dueDate}</span>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <Badge variant="outline">{order.type}</Badge>
                              <span className="text-xs text-muted-foreground">
                                Created: {order.createdDate}
                              </span>
                              {order.completedDate && (
                                <span className="text-xs text-muted-foreground">
                                  | Completed: {order.completedDate}
                                </span>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex lg:flex-col gap-2">
                            <Button variant="outline" size="sm" className="flex-1 lg:flex-none">
                              View Details
                            </Button>
                            <Button variant="outline" size="sm" className="flex-1 lg:flex-none">
                              Edit
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                  {filteredOrders.length === 0 && (
                    <div className="text-center py-12 text-muted-foreground">
                      <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>No work orders found matching your criteria.</p>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default WorkOrders;
