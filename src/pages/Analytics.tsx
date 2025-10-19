import { PageLayout } from '@/components/layout/PageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, Activity, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { StatsCard } from '@/components/ui/StatsCard';

const Analytics = () => {
  // Mock data for asset utilization over time
  const utilizationData = [
    { month: 'Jan', utilization: 78, target: 85 },
    { month: 'Feb', utilization: 82, target: 85 },
    { month: 'Mar', utilization: 85, target: 85 },
    { month: 'Apr', utilization: 88, target: 85 },
    { month: 'May', utilization: 84, target: 85 },
    { month: 'Jun', utilization: 89, target: 85 },
  ];

  // Mock data for maintenance costs
  const maintenanceCostData = [
    { month: 'Jan', planned: 45000, unplanned: 12000 },
    { month: 'Feb', planned: 48000, unplanned: 15000 },
    { month: 'Mar', planned: 42000, unplanned: 8000 },
    { month: 'Apr', planned: 50000, unplanned: 18000 },
    { month: 'May', planned: 46000, unplanned: 10000 },
    { month: 'Jun', planned: 52000, unplanned: 14000 },
  ];

  // Mock data for asset health distribution
  const assetHealthData = [
    { name: 'Excellent', value: 342, color: 'hsl(var(--chart-1))' },
    { name: 'Good', value: 256, color: 'hsl(var(--chart-2))' },
    { name: 'Fair', value: 128, color: 'hsl(var(--chart-3))' },
    { name: 'Poor', value: 45, color: 'hsl(var(--chart-4))' },
    { name: 'Critical', value: 12, color: 'hsl(var(--chart-5))' },
  ];

  // Mock data for work order completion rate
  const workOrderData = [
    { week: 'Week 1', completed: 45, pending: 12 },
    { week: 'Week 2', completed: 52, pending: 8 },
    { week: 'Week 3', completed: 48, pending: 15 },
    { week: 'Week 4', completed: 58, pending: 10 },
  ];

  // Mock data for asset category performance
  const categoryPerformanceData = [
    { category: 'Transformers', efficiency: 92, downtime: 2.1 },
    { category: 'Switches', efficiency: 88, downtime: 3.5 },
    { category: 'Meters', efficiency: 95, downtime: 1.2 },
    { category: 'Cables', efficiency: 89, downtime: 2.8 },
    { category: 'Poles', efficiency: 94, downtime: 1.5 },
  ];

  return (
    <PageLayout title="Analytics">
      <div className="space-y-6">
        {/* Date Range Selector */}
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <Select defaultValue="30days">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7days">Last 7 Days</SelectItem>
                <SelectItem value="30days">Last 30 Days</SelectItem>
                <SelectItem value="90days">Last 90 Days</SelectItem>
                <SelectItem value="1year">Last Year</SelectItem>
                <SelectItem value="custom">Custom Range</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Asset Utilization"
            value="89%"
            description="Current utilization rate"
            icon={<Activity className="h-4 w-4" />}
            trend={5.2}
          />
          <StatsCard
            title="Avg Response Time"
            value="2.4h"
            description="Work order response"
            icon={<Clock className="h-4 w-4" />}
            trend={-12}
          />
          <StatsCard
            title="Completion Rate"
            value="94.5%"
            description="Work orders completed"
            icon={<CheckCircle className="h-4 w-4" />}
            trend={3.1}
          />
          <StatsCard
            title="Critical Issues"
            value="12"
            description="Requiring attention"
            icon={<AlertCircle className="h-4 w-4" />}
            trend={-8}
          />
        </div>

        {/* Tabs for different analytics views */}
        <Tabs defaultValue="performance" className="space-y-4">
          <TabsList>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
            <TabsTrigger value="assets">Assets</TabsTrigger>
            <TabsTrigger value="workorders">Work Orders</TabsTrigger>
          </TabsList>

          {/* Performance Tab */}
          <TabsContent value="performance" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Asset Utilization Trend</CardTitle>
                  <CardDescription>Monthly utilization vs target</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={utilizationData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="utilization" stroke="hsl(var(--primary))" strokeWidth={2} />
                      <Line type="monotone" dataKey="target" stroke="hsl(var(--muted-foreground))" strokeDasharray="5 5" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Category Performance</CardTitle>
                  <CardDescription>Efficiency by asset category</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={categoryPerformanceData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="category" type="category" width={100} />
                      <Tooltip />
                      <Bar dataKey="efficiency" fill="hsl(var(--primary))" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Maintenance Tab */}
          <TabsContent value="maintenance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Maintenance Costs</CardTitle>
                <CardDescription>Planned vs unplanned maintenance expenses</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={maintenanceCostData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="planned" fill="hsl(var(--chart-2))" name="Planned" />
                    <Bar dataKey="unplanned" fill="hsl(var(--chart-5))" name="Unplanned" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Assets Tab */}
          <TabsContent value="assets" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Asset Health Distribution</CardTitle>
                  <CardDescription>Current health status of all assets</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={assetHealthData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {assetHealthData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Health Summary</CardTitle>
                  <CardDescription>Detailed breakdown by status</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {assetHealthData.map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div 
                            className="w-3 h-3 rounded-full" 
                            style={{ backgroundColor: item.color }}
                          />
                          <span className="text-sm font-medium">{item.name}</span>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-bold">{item.value}</div>
                          <div className="text-xs text-muted-foreground">
                            {((item.value / assetHealthData.reduce((acc, curr) => acc + curr.value, 0)) * 100).toFixed(1)}%
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Work Orders Tab */}
          <TabsContent value="workorders" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Work Order Completion</CardTitle>
                <CardDescription>Weekly completion vs pending</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={workOrderData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="completed" fill="hsl(var(--chart-2))" name="Completed" />
                    <Bar dataKey="pending" fill="hsl(var(--chart-3))" name="Pending" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default Analytics;
