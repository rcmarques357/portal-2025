import { PageLayout } from '@/components/layout/PageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Database, 
  RefreshCw, 
  CheckCircle2, 
  AlertTriangle, 
  TrendingUp,
  Server,
  Download,
  Upload,
  Link as LinkIcon
} from 'lucide-react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function SAPIntegration() {
  const syncData = [
    { name: 'Mon', records: 3200, errors: 12 },
    { name: 'Tue', records: 2800, errors: 8 },
    { name: 'Wed', records: 4100, errors: 15 },
    { name: 'Thu', records: 3900, errors: 6 },
    { name: 'Fri', records: 4500, errors: 10 },
    { name: 'Sat', records: 3300, errors: 4 },
    { name: 'Sun', records: 2900, errors: 7 },
  ];

  const moduleData = [
    { name: 'PM (Plant Maintenance)', records: 15420, status: 'active' },
    { name: 'MM (Materials Management)', records: 8932, status: 'active' },
    { name: 'FI (Financial)', records: 12456, status: 'active' },
    { name: 'PS (Project System)', records: 3241, status: 'syncing' },
    { name: 'CO (Controlling)', records: 6789, status: 'error' },
  ];

  const dataDistribution = [
    { name: 'Equipment', value: 35 },
    { name: 'Work Orders', value: 28 },
    { name: 'Materials', value: 22 },
    { name: 'Notifications', value: 15 },
  ];

  const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))'];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="default" className="bg-green-500"><CheckCircle2 className="h-3 w-3 mr-1" />Active</Badge>;
      case 'syncing':
        return <Badge variant="secondary"><RefreshCw className="h-3 w-3 mr-1 animate-spin" />Syncing</Badge>;
      case 'error':
        return <Badge variant="destructive"><AlertTriangle className="h-3 w-3 mr-1" />Error</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <PageLayout title="SAP Integration">
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="modules">SAP Modules</TabsTrigger>
          <TabsTrigger value="sync">Synchronization</TabsTrigger>
          <TabsTrigger value="quality">Data Quality</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Status Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Records</CardTitle>
                <Database className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">46,838</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-500 inline-flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +5.2%
                  </span>
                  {' '}from last week
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Modules</CardTitle>
                <Server className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5</div>
                <p className="text-xs text-muted-foreground">
                  3 active, 1 syncing, 1 error
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Connection Status</CardTitle>
                <LinkIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Online</div>
                <p className="text-xs text-muted-foreground">
                  Uptime: 99.8%
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Data Accuracy</CardTitle>
                <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">94%</div>
                <Progress value={94} className="mt-2" />
              </CardContent>
            </Card>
          </div>

          {/* Sync Activity Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Sync Activity (Last 7 Days)</CardTitle>
              <CardDescription>Records synchronized and error tracking</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={syncData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="records" stroke="hsl(var(--chart-1))" strokeWidth={2} name="Records Synced" />
                  <Line type="monotone" dataKey="errors" stroke="hsl(var(--destructive))" strokeWidth={2} name="Errors" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Data Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Data Distribution by Type</CardTitle>
              <CardDescription>Breakdown of SAP data records</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={dataDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {dataDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="modules" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>SAP Modules</CardTitle>
                  <CardDescription>Connected SAP modules and their status</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export Data
                  </Button>
                  <Button size="sm">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Sync All
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {moduleData.map((module, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <Server className="h-8 w-8 text-muted-foreground" />
                      <div>
                        <h4 className="font-medium">{module.name}</h4>
                        <p className="text-sm text-muted-foreground">{module.records.toLocaleString()} records</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      {getStatusBadge(module.status)}
                      <Button variant="ghost" size="sm">
                        <RefreshCw className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Module Activity</CardTitle>
              <CardDescription>Record count by SAP module</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={moduleData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="records" fill="hsl(var(--primary))" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sync" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Synchronization Settings</CardTitle>
                  <CardDescription>Configure SAP data sync preferences</CardDescription>
                </div>
                <Button>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Force Sync
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Automatic Sync</h4>
                    <p className="text-sm text-muted-foreground">Sync every 30 minutes</p>
                  </div>
                  <Badge variant="default" className="bg-green-500">Enabled</Badge>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Delta Sync</h4>
                    <p className="text-sm text-muted-foreground">Only sync changed records</p>
                  </div>
                  <Badge variant="default" className="bg-green-500">Enabled</Badge>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Batch Processing</h4>
                    <p className="text-sm text-muted-foreground">Process 500 records per batch</p>
                  </div>
                  <Badge variant="outline">Configured</Badge>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Error Handling</h4>
                    <p className="text-sm text-muted-foreground">Retry failed records automatically</p>
                  </div>
                  <Badge variant="default" className="bg-green-500">Enabled</Badge>
                </div>
              </div>

              <div className="pt-6 border-t">
                <h4 className="font-medium mb-4">Recent Sync History</h4>
                <div className="space-y-3">
                  {[
                    { time: '5 mins ago', module: 'PM Module', status: 'success', records: 234 },
                    { time: '35 mins ago', module: 'MM Module', status: 'success', records: 189 },
                    { time: '1 hour ago', module: 'FI Module', status: 'success', records: 312 },
                    { time: '1.5 hours ago', module: 'PS Module', status: 'partial', records: 156 },
                    { time: '2 hours ago', module: 'CO Module', status: 'failed', records: 0 },
                  ].map((sync, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-3">
                        {sync.status === 'success' ? (
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                        ) : sync.status === 'partial' ? (
                          <AlertTriangle className="h-4 w-4 text-yellow-500" />
                        ) : (
                          <AlertTriangle className="h-4 w-4 text-red-500" />
                        )}
                        <div>
                          <span className="font-medium">{sync.module}</span>
                          <span className="text-muted-foreground ml-2">{sync.time}</span>
                        </div>
                      </div>
                      <span className="text-muted-foreground">{sync.records} records</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="quality" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Data Quality Metrics</CardTitle>
                <CardDescription>Key indicators of SAP data quality</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Data Completeness</span>
                    <span className="text-sm text-muted-foreground">94%</span>
                  </div>
                  <Progress value={94} />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Field Accuracy</span>
                    <span className="text-sm text-muted-foreground">91%</span>
                  </div>
                  <Progress value={91} />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Reference Integrity</span>
                    <span className="text-sm text-muted-foreground">97%</span>
                  </div>
                  <Progress value={97} />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Sync Success Rate</span>
                    <span className="text-sm text-muted-foreground">96%</span>
                  </div>
                  <Progress value={96} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Connection Health</CardTitle>
                <CardDescription>SAP system connection metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="text-sm font-medium">Response Time</p>
                    <p className="text-2xl font-bold">142ms</p>
                  </div>
                  <CheckCircle2 className="h-8 w-8 text-green-500" />
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="text-sm font-medium">Uptime</p>
                    <p className="text-2xl font-bold">99.8%</p>
                  </div>
                  <CheckCircle2 className="h-8 w-8 text-green-500" />
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="text-sm font-medium">Last Successful Sync</p>
                    <p className="text-sm text-muted-foreground">5 minutes ago</p>
                  </div>
                  <RefreshCw className="h-8 w-8 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Data Quality Issues</CardTitle>
              <CardDescription>Issues requiring attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { issue: 'Missing equipment details', count: 67, module: 'PM', severity: 'high' },
                  { issue: 'Incomplete material descriptions', count: 143, module: 'MM', severity: 'medium' },
                  { issue: 'Invalid cost center references', count: 23, module: 'CO', severity: 'high' },
                  { issue: 'Outdated work order status', count: 89, module: 'PM', severity: 'low' },
                  { issue: 'Duplicate functional locations', count: 12, module: 'PM', severity: 'medium' },
                ].map((issue, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <AlertTriangle className={`h-5 w-5 ${
                        issue.severity === 'high' ? 'text-red-500' : 
                        issue.severity === 'medium' ? 'text-yellow-500' : 
                        'text-blue-500'
                      }`} />
                      <div>
                        <h4 className="font-medium text-sm">{issue.issue}</h4>
                        <p className="text-xs text-muted-foreground">
                          {issue.count} records • {issue.module} Module
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Resolve</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </PageLayout>
  );
}
