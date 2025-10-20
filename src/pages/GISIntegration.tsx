import { PageLayout } from '@/components/layout/PageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  MapPin, 
  Database, 
  RefreshCw, 
  CheckCircle2, 
  AlertTriangle, 
  TrendingUp,
  Layers,
  Download,
  Upload
} from 'lucide-react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function GISIntegration() {
  const syncData = [
    { name: 'Mon', assets: 2400, updates: 1398 },
    { name: 'Tue', assets: 1398, updates: 2100 },
    { name: 'Wed', assets: 9800, updates: 3908 },
    { name: 'Thu', assets: 3908, updates: 4800 },
    { name: 'Fri', assets: 4800, updates: 3800 },
    { name: 'Sat', assets: 3800, updates: 4300 },
    { name: 'Sun', assets: 4300, updates: 2400 },
  ];

  const layerData = [
    { name: 'Transformers', value: 3247, status: 'synced' },
    { name: 'Poles', value: 8921, status: 'synced' },
    { name: 'Lines', value: 15432, status: 'syncing' },
    { name: 'Substations', value: 124, status: 'synced' },
    { name: 'Switches', value: 2156, status: 'error' },
  ];

  const dataQuality = [
    { name: 'Complete', value: 85 },
    { name: 'Incomplete', value: 10 },
    { name: 'Error', value: 5 },
  ];

  const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))'];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'synced':
        return <Badge variant="default" className="bg-green-500"><CheckCircle2 className="h-3 w-3 mr-1" />Synced</Badge>;
      case 'syncing':
        return <Badge variant="secondary"><RefreshCw className="h-3 w-3 mr-1 animate-spin" />Syncing</Badge>;
      case 'error':
        return <Badge variant="destructive"><AlertTriangle className="h-3 w-3 mr-1" />Error</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <PageLayout title="GIS Integration">
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="layers">Data Layers</TabsTrigger>
          <TabsTrigger value="sync">Synchronization</TabsTrigger>
          <TabsTrigger value="quality">Data Quality</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Status Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Assets</CardTitle>
                <MapPin className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">29,880</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-500 inline-flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +2.5%
                  </span>
                  {' '}from last sync
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Layers</CardTitle>
                <Layers className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5</div>
                <p className="text-xs text-muted-foreground">
                  4 synced, 1 in progress
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Last Sync</CardTitle>
                <RefreshCw className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2 mins ago</div>
                <p className="text-xs text-muted-foreground">
                  Next sync: 58 mins
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Data Quality</CardTitle>
                <Database className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">85%</div>
                <Progress value={85} className="mt-2" />
              </CardContent>
            </Card>
          </div>

          {/* Sync Activity Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Sync Activity (Last 7 Days)</CardTitle>
              <CardDescription>Asset updates and synchronization patterns</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={syncData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="assets" stroke="hsl(var(--chart-1))" strokeWidth={2} />
                  <Line type="monotone" dataKey="updates" stroke="hsl(var(--chart-2))" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="layers" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>GIS Data Layers</CardTitle>
                  <CardDescription>Manage and monitor your GIS data layers</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                  <Button size="sm">
                    <Upload className="h-4 w-4 mr-2" />
                    Import Layer
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {layerData.map((layer, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <Layers className="h-8 w-8 text-muted-foreground" />
                      <div>
                        <h4 className="font-medium">{layer.name}</h4>
                        <p className="text-sm text-muted-foreground">{layer.value.toLocaleString()} features</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      {getStatusBadge(layer.status)}
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
              <CardTitle>Layer Distribution</CardTitle>
              <CardDescription>Asset count by layer type</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={layerData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="hsl(var(--primary))" />
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
                  <CardDescription>Configure automatic sync intervals and preferences</CardDescription>
                </div>
                <Button>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Sync Now
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Automatic Sync</h4>
                    <p className="text-sm text-muted-foreground">Sync every hour</p>
                  </div>
                  <Badge variant="default" className="bg-green-500">Enabled</Badge>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Real-time Updates</h4>
                    <p className="text-sm text-muted-foreground">Push updates immediately</p>
                  </div>
                  <Badge variant="secondary">Disabled</Badge>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Conflict Resolution</h4>
                    <p className="text-sm text-muted-foreground">GIS data takes precedence</p>
                  </div>
                  <Badge variant="outline">Configured</Badge>
                </div>
              </div>

              <div className="pt-6 border-t">
                <h4 className="font-medium mb-4">Recent Sync History</h4>
                <div className="space-y-3">
                  {[
                    { time: '2 mins ago', status: 'success', records: 156 },
                    { time: '1 hour ago', status: 'success', records: 243 },
                    { time: '2 hours ago', status: 'success', records: 189 },
                    { time: '3 hours ago', status: 'partial', records: 201 },
                    { time: '4 hours ago', status: 'success', records: 178 },
                  ].map((sync, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-3">
                        {sync.status === 'success' ? (
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                        ) : (
                          <AlertTriangle className="h-4 w-4 text-yellow-500" />
                        )}
                        <span>{sync.time}</span>
                      </div>
                      <span className="text-muted-foreground">{sync.records} records updated</span>
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
                <CardTitle>Data Quality Overview</CardTitle>
                <CardDescription>Current state of GIS data quality</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={dataQuality}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {dataQuality.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Data Quality Metrics</CardTitle>
                <CardDescription>Key indicators of data integrity</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Coordinate Accuracy</span>
                    <span className="text-sm text-muted-foreground">92%</span>
                  </div>
                  <Progress value={92} />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Attribute Completeness</span>
                    <span className="text-sm text-muted-foreground">88%</span>
                  </div>
                  <Progress value={88} />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Topology Validation</span>
                    <span className="text-sm text-muted-foreground">95%</span>
                  </div>
                  <Progress value={95} />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Data Freshness</span>
                    <span className="text-sm text-muted-foreground">85%</span>
                  </div>
                  <Progress value={85} />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Quality Issues</CardTitle>
              <CardDescription>Items requiring attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { issue: 'Missing coordinates', count: 45, severity: 'high' },
                  { issue: 'Incomplete attributes', count: 128, severity: 'medium' },
                  { issue: 'Topology errors', count: 12, severity: 'high' },
                  { issue: 'Outdated records', count: 203, severity: 'low' },
                  { issue: 'Duplicate entries', count: 8, severity: 'medium' },
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
                        <p className="text-xs text-muted-foreground">{issue.count} records affected</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Review</Button>
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
