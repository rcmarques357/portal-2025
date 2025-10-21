import React, { useState } from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { ArrowUp, CircleAlert, Plus, FileEdit, Clock, CheckCircle, XCircle, Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';

// Validation schema for correction requests
const correctionRequestSchema = z.object({
  assetType: z.string().min(1, { message: "Asset type is required" }),
  assetId: z.string().trim().min(1, { message: "Asset ID is required" }).max(100, { message: "Asset ID must be less than 100 characters" }),
  location: z.string().trim().min(1, { message: "Location is required" }).max(200, { message: "Location must be less than 200 characters" }),
  discrepancyType: z.string().min(1, { message: "Discrepancy type is required" }),
  description: z.string().trim().min(10, { message: "Description must be at least 10 characters" }).max(1000, { message: "Description must be less than 1000 characters" }),
  gisValue: z.string().trim().max(200, { message: "GIS value must be less than 200 characters" }).optional(),
  sapValue: z.string().trim().max(200, { message: "SAP value must be less than 200 characters" }).optional(),
  correctValue: z.string().trim().min(1, { message: "Correct value is required" }).max(200, { message: "Correct value must be less than 200 characters" }),
  priority: z.enum(['low', 'medium', 'high', 'critical']),
  requestedBy: z.string().trim().min(1, { message: "Requestor name is required" }).max(100, { message: "Name must be less than 100 characters" }),
});

type CorrectionRequest = z.infer<typeof correctionRequestSchema> & {
  id: string;
  status: 'pending' | 'in-review' | 'approved' | 'rejected' | 'completed';
  createdDate: string;
  updatedDate: string;
  assignedTo?: string;
};

export default function GISDiscrepancy() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('analytics');
  const [selectedOPCO, setSelectedOPCO] = useState('CMP');
  const [selectedDivisions, setSelectedDivisions] = useState(['Alfred', 'Auburn']);
  const [selectedDevices, setSelectedDevices] = useState(['FUSE/CUTOUT', 'TRANSFORMER']);
  const [selectedSCADA, setSelectedSCADA] = useState(['Y']);
  const [dateRange, setDateRange] = useState([20, 80]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  
  // Form state for new correction request
  const [formData, setFormData] = useState({
    assetType: '',
    assetId: '',
    location: '',
    discrepancyType: '',
    description: '',
    gisValue: '',
    sapValue: '',
    correctValue: '',
    priority: 'medium' as const,
    requestedBy: '',
  });
  
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Mock data
  const divisionAccuracy = [
    { division: 'Alfred', accuracy: 98.80, status: 'success' },
    { division: 'Auburn', accuracy: 99.38, status: 'success' },
    { division: 'Augusta', accuracy: 98.37, status: 'success' },
    { division: 'Binghamton', accuracy: 99.19, status: 'success' },
    { division: 'Brewster', accuracy: 98.30, status: 'warning' },
  ];

  const discrepanciesByType = [
    { type: 'Not in GIS', value: 6561 },
    { type: 'Should NOT be in GIS', value: 1979 },
    { type: 'Const. Station not in GIS', value: 3142 },
    { type: 'Duplicate', value: 1695 },
    { type: 'Object Type Error', value: 539 },
  ];

  const discrepanciesByDevice = [
    { device: 'FUSE/CUTOUT', value: 6055, percentage: 36.4 },
    { device: 'TRANSFORMER', value: 7730, percentage: 46.5 },
    { device: 'SWITCH', value: 688, percentage: 4.1 },
    { device: 'AIRBREAK SWITCH', value: 337, percentage: 2.0 },
    { device: 'RECLOSER', value: 6, percentage: 0.0 },
    { device: 'FAULT INDICATOR', value: 0, percentage: 0.0 },
    { device: 'TERMINATING CABI...', value: 0, percentage: 0.0 },
    { device: 'DISCONNECT SWIT...', value: 0, percentage: 0.0 },
    { device: 'REGULATOR', value: 0, percentage: 0.0 },
    { device: 'SWITCHGEAR', value: 0, percentage: 0.0 },
    { device: 'VAC INTERRUPTER', value: 0, percentage: 0.0 },
    { device: 'CAPACITOR', value: 0, percentage: 0.0 },
    { device: 'NET PROTECTOR', value: 0, percentage: 0.0 },
    { device: 'SECTIONALIZER', value: 0, percentage: 0.0 },
  ];

  const deviceAccuracyData = [
    { device: 'AIRBREAK SWITCH', accuracy: 95.67, count: 13108, status: 'warning' },
    { device: 'CAPACITOR', accuracy: 99.66, count: 8325, status: 'success' },
    { device: 'DISCONNECT SWITCH', accuracy: 90.42, count: 1680, status: 'danger' },
    { device: 'FAULT INDICATOR', accuracy: 96.19, count: 8850, status: 'success' },
    { device: 'FUSE/CUTOUT', accuracy: 97.43, count: 267850, status: 'success' },
  ];

  // Mock correction requests data
  const [correctionRequests, setCorrectionRequests] = useState<CorrectionRequest[]>([
    {
      id: 'CR-001',
      assetType: 'Conductor',
      assetId: 'COND-12345',
      location: 'Division: Auburn, Circuit: 301-L0783',
      discrepancyType: 'Incorrect Specification',
      description: 'GIS shows 336.4 ACSR conductor, but SAP shows 4/0 ACSR. Field verification confirms 336.4 ACSR is correct.',
      gisValue: '336.4 ACSR',
      sapValue: '4/0 ACSR',
      correctValue: '336.4 ACSR',
      priority: 'high',
      status: 'in-review',
      requestedBy: 'John Smith',
      createdDate: '2024-02-10',
      updatedDate: '2024-02-12',
      assignedTo: 'Sarah Johnson'
    },
    {
      id: 'CR-002',
      assetType: 'Recloser',
      assetId: 'REC-67890',
      location: 'Division: Alfred, Substation: A-45',
      discrepancyType: 'Missing in SAP',
      description: 'Recloser installed in field and documented in GIS but not present in SAP system. Installation date: 01/15/2024.',
      gisValue: 'Cooper Form 5',
      sapValue: 'N/A',
      correctValue: 'Cooper Form 5',
      priority: 'critical',
      status: 'pending',
      requestedBy: 'Michael Chen',
      createdDate: '2024-02-11',
      updatedDate: '2024-02-11',
    },
    {
      id: 'CR-003',
      assetType: 'Capacitor Bank',
      assetId: 'CAP-24680',
      location: 'Division: Augusta, Circuit: 401-L0892',
      discrepancyType: 'Incorrect Rating',
      description: 'Capacitor bank rating mismatch between systems. GIS shows 600 kVAR, SAP shows 450 kVAR. Nameplate confirms 600 kVAR.',
      gisValue: '600 kVAR',
      sapValue: '450 kVAR',
      correctValue: '600 kVAR',
      priority: 'medium',
      status: 'approved',
      requestedBy: 'Emily Rodriguez',
      createdDate: '2024-02-08',
      updatedDate: '2024-02-13',
      assignedTo: 'Robert Wilson'
    },
    {
      id: 'CR-004',
      assetType: 'Voltage Regulator',
      assetId: 'REG-13579',
      location: 'Division: Binghamton, Circuit: 501-L1045',
      discrepancyType: 'Duplicate Entry',
      description: 'Voltage regulator appears twice in SAP with different equipment numbers but same functional location.',
      gisValue: 'Single Entry',
      sapValue: 'Two Entries: EQ-001, EQ-002',
      correctValue: 'Single Entry - EQ-001',
      priority: 'low',
      status: 'completed',
      requestedBy: 'Lisa Anderson',
      createdDate: '2024-02-05',
      updatedDate: '2024-02-14',
      assignedTo: 'David Kim'
    },
    {
      id: 'CR-005',
      assetType: 'Transformer',
      assetId: 'XFMR-98765',
      location: 'Division: Brewster, Substation: B-78',
      discrepancyType: 'Incorrect Status',
      description: 'Transformer shows as active in SAP but was retired and removed from service on 12/20/2023. GIS correctly shows as retired.',
      gisValue: 'Retired',
      sapValue: 'Active',
      correctValue: 'Retired',
      priority: 'high',
      status: 'pending',
      requestedBy: 'Thomas Brown',
      createdDate: '2024-02-13',
      updatedDate: '2024-02-13',
    },
  ]);

  const discrepancyDetails = [
    {
      division: 'Auburn',
      gisFloc: '9301 L0783-0641-0081-ED00046',
      functionalLocation: '',
      equipment: '',
      device: 'FUSE/CUTOUT',
      discrepancy: 'Should NOT be in GIS',
      systemStatus: '',
    },
    {
      division: 'Auburn',
      gisFloc: '9301 L0799-3414-0075-ED00014',
      functionalLocation: '',
      equipment: '',
      device: 'FUSE/CUTOUT',
      discrepancy: 'Should NOT be in GIS',
      systemStatus: '',
    },
    {
      division: 'Auburn',
      gisFloc: '9301-L0798-3416-0020-ED00020',
      functionalLocation: '',
      equipment: '',
      device: 'FUSE/CUTOUT',
      discrepancy: 'Should NOT be in GIS',
      systemStatus: '',
    },
    {
      division: 'Auburn',
      gisFloc: '9301 L0798-3416-0020-ED00020',
      functionalLocation: '',
      equipment: '',
      device: 'FUSE/CUTOUT',
      discrepancy: 'Should NOT be in GIS',
      systemStatus: '',
    },
    {
      division: 'Auburn',
      gisFloc: '9301 L0798-3416-0021-ED00002',
      functionalLocation: '',
      equipment: '',
      device: 'FUSE/CUTOUT',
      discrepancy: 'Should NOT be in GIS',
      systemStatus: '',
    },
  ];

  const COLORS = ['hsl(var(--primary))', 'hsl(var(--success))', 'hsl(var(--warning))', 'hsl(var(--accent))', 'hsl(var(--secondary))'];

  const chartConfig = {
    value: {
      label: 'Count',
      color: 'hsl(var(--primary))',
    },
  };

  const toggleSelection = (item: string, list: string[], setter: (list: string[]) => void) => {
    if (list.includes(item)) {
      setter(list.filter(i => i !== item));
    } else {
      setter([...list, item]);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error for this field when user starts typing
    if (formErrors[field]) {
      setFormErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleSubmitRequest = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Validate form data
      correctionRequestSchema.parse(formData);
      
      // Create new request
      const newRequest: CorrectionRequest = {
        ...formData,
        id: `CR-${String(correctionRequests.length + 1).padStart(3, '0')}`,
        status: 'pending',
        createdDate: new Date().toISOString().split('T')[0],
        updatedDate: new Date().toISOString().split('T')[0],
      };
      
      setCorrectionRequests(prev => [newRequest, ...prev]);
      
      // Reset form
      setFormData({
        assetType: '',
        assetId: '',
        location: '',
        discrepancyType: '',
        description: '',
        gisValue: '',
        sapValue: '',
        correctValue: '',
        priority: 'medium',
        requestedBy: '',
      });
      
      setFormErrors({});
      
      toast({
        title: "Request Submitted",
        description: `Correction request ${newRequest.id} has been created successfully.`,
      });
      
      setActiveTab('requests');
      
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors: Record<string, string> = {};
        error.errors.forEach(err => {
          if (err.path[0]) {
            errors[err.path[0] as string] = err.message;
          }
        });
        setFormErrors(errors);
        
        toast({
          title: "Validation Error",
          description: "Please check the form for errors and try again.",
          variant: "destructive",
        });
      }
    }
  };

  const statusConfig = {
    pending: { variant: 'secondary' as const, icon: Clock, label: 'Pending' },
    'in-review': { variant: 'default' as const, icon: FileEdit, label: 'In Review' },
    approved: { variant: 'default' as const, icon: CheckCircle, label: 'Approved' },
    rejected: { variant: 'destructive' as const, icon: XCircle, label: 'Rejected' },
    completed: { variant: 'default' as const, icon: CheckCircle, label: 'Completed' },
  };

  const priorityConfig = {
    low: 'secondary' as const,
    medium: 'default' as const,
    high: 'destructive' as const,
    critical: 'destructive' as const,
  };

  const filteredRequests = correctionRequests.filter(request => {
    const matchesSearch = 
      request.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.assetType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.assetId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || request.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <PageLayout title="GIS - SAP Data Quality & Correction Requests">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="analytics">Analytics Dashboard</TabsTrigger>
          <TabsTrigger value="requests">Correction Requests</TabsTrigger>
          <TabsTrigger value="submit">Submit Request</TabsTrigger>
        </TabsList>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
        {/* OPCO Filter Tabs */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Filter by OPCO</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={selectedOPCO} onValueChange={setSelectedOPCO}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="CMP">CMP</TabsTrigger>
                <TabsTrigger value="NYSEG">NYSEG</TabsTrigger>
                <TabsTrigger value="RGE">RGE</TabsTrigger>
                <TabsTrigger value="UI">UI</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar - Filters */}
          <div className="lg:col-span-1 space-y-4">
            {/* Division Filter */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Filter by Division</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {['Alfred', 'Auburn', 'Augusta', 'Binghamton', 'Brewster'].map((division) => (
                  <div key={division} className="flex items-center space-x-2">
                    <Checkbox
                      id={`division-${division}`}
                      checked={selectedDivisions.includes(division)}
                      onCheckedChange={() => toggleSelection(division, selectedDivisions, setSelectedDivisions)}
                    />
                    <Label htmlFor={`division-${division}`} className="text-sm cursor-pointer">
                      {division}
                    </Label>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Device Filter */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Filter by Device</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {['AIRBREAK SWITCH', 'CAPACITOR', 'DISCONNECT SWITCH', 'FAULT INDICATOR', 'FUSE/CUTOUT'].map((device) => (
                  <div key={device} className="flex items-center space-x-2">
                    <Checkbox
                      id={`device-${device}`}
                      checked={selectedDevices.includes(device)}
                      onCheckedChange={() => toggleSelection(device, selectedDevices, setSelectedDevices)}
                    />
                    <Label htmlFor={`device-${device}`} className="text-xs cursor-pointer">
                      {device}
                    </Label>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Date Filter */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Filter by Date</CardTitle>
                <p className="text-xs text-muted-foreground">Discrepancy Identified</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-xs space-y-1">
                  <div>1/30/2023</div>
                  <div>9/30/2025</div>
                </div>
                <Slider
                  value={dateRange}
                  onValueChange={setDateRange}
                  max={100}
                  step={1}
                  className="w-full"
                />
              </CardContent>
            </Card>

            {/* SCADA Filter */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Filter by Devices with SCADA Flag</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {['Y', 'N'].map((flag) => (
                  <div key={flag} className="flex items-center space-x-2">
                    <Checkbox
                      id={`scada-${flag}`}
                      checked={selectedSCADA.includes(flag)}
                      onCheckedChange={() => toggleSelection(flag, selectedSCADA, setSelectedSCADA)}
                    />
                    <Label htmlFor={`scada-${flag}`} className="text-sm cursor-pointer">
                      {flag}
                    </Label>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3 space-y-6">
            {/* Top Row - Accuracy Gauge and Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Accuracy Gauge */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Accuracy - September 2025</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center space-y-4">
                  <div className="relative w-40 h-40">
                    <svg viewBox="0 0 200 200" className="transform -rotate-90">
                      <circle
                        cx="100"
                        cy="100"
                        r="80"
                        fill="none"
                        stroke="hsl(var(--muted))"
                        strokeWidth="20"
                      />
                      <circle
                        cx="100"
                        cy="100"
                        r="80"
                        fill="none"
                        stroke="hsl(var(--success))"
                        strokeWidth="20"
                        strokeDasharray={`${98.51 * 5.03} 502`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-foreground">98.51%</div>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 w-full text-center">
                    <div>
                      <div className="text-xs text-muted-foreground">Total Discrepancies</div>
                      <div className="text-xl font-bold">16,628</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Total Entries</div>
                      <div className="text-xl font-bold">1,113,515</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Division Accuracy */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Division Accuracy</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Division</TableHead>
                        <TableHead className="text-right">Accuracy</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {divisionAccuracy.map((row) => (
                        <TableRow key={row.division}>
                          <TableCell className="font-medium text-sm">{row.division}</TableCell>
                          <TableCell className="text-right">
                            <Badge variant={row.status === 'success' ? 'default' : 'secondary'}>
                              {row.accuracy}%
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                      <TableRow>
                        <TableCell className="font-bold">Total</TableCell>
                        <TableCell className="text-right font-bold">98.51%</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              {/* Discrepancies by Device - Pie Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Discrepancies by Device</CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={discrepanciesByDevice.filter(d => d.value > 0)}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ device, percentage }) => `${device.substring(0, 10)}... ${percentage}%`}
                          outerRadius={80}
                          fill="hsl(var(--primary))"
                          dataKey="value"
                        >
                          {discrepanciesByDevice.filter(d => d.value > 0).map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <ChartTooltip content={<ChartTooltipContent />} />
                      </PieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                  <div className="mt-4 space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span>Identified</span>
                      <div className="flex gap-2">
                        <Badge variant="outline">2023</Badge>
                        <Badge variant="outline">2024</Badge>
                        <Badge variant="outline">2025</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Discrepancies by Type - Bar Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Discrepancies by Type</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={discrepanciesByType}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis
                        dataKey="type"
                        angle={-45}
                        textAnchor="end"
                        height={100}
                        tick={{ fill: 'hsl(var(--foreground))', fontSize: 12 }}
                      />
                      <YAxis tick={{ fill: 'hsl(var(--foreground))' }} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Device Accuracy and Counts */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Device Accuracy and Counts</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Device</TableHead>
                      <TableHead className="text-right">Accuracy</TableHead>
                      <TableHead className="text-right">Count</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {deviceAccuracyData.map((row) => (
                      <TableRow key={row.device}>
                        <TableCell className="font-medium text-sm">{row.device}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            {row.status === 'danger' && <CircleAlert className="h-3 w-3 text-danger" />}
                            {row.status === 'warning' && <ArrowUp className="h-3 w-3 text-warning" />}
                            {row.status === 'success' && <ArrowUp className="h-3 w-3 text-success" />}
                            <span>{row.accuracy}%</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">{row.count.toLocaleString()}</TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell className="font-bold">Total</TableCell>
                      <TableCell className="text-right font-bold">98.51%</TableCell>
                      <TableCell className="text-right font-bold">1,113,515</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Discrepancy Details */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Discrepancy Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Division</TableHead>
                        <TableHead>GIS_FLOC</TableHead>
                        <TableHead>Functional Location</TableHead>
                        <TableHead>Equipment</TableHead>
                        <TableHead>Device</TableHead>
                        <TableHead>Discrepancy</TableHead>
                        <TableHead>System Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {discrepancyDetails.map((row, index) => (
                        <TableRow key={index}>
                          <TableCell className="text-sm">{row.division}</TableCell>
                          <TableCell className="text-xs font-mono">{row.gisFloc}</TableCell>
                          <TableCell className="text-sm">{row.functionalLocation || '-'}</TableCell>
                          <TableCell className="text-sm">{row.equipment || '-'}</TableCell>
                          <TableCell className="text-sm">{row.device}</TableCell>
                          <TableCell className="text-sm">{row.discrepancy}</TableCell>
                          <TableCell className="text-sm">{row.systemStatus || '-'}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        </TabsContent>

        {/* Correction Requests Tab */}
        <TabsContent value="requests" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <CardTitle>Correction Requests</CardTitle>
                  <CardDescription>Track and manage data correction requests</CardDescription>
                </div>
                <div className="flex gap-2">
                  <div className="relative w-full sm:w-64">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search requests..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-8"
                    />
                  </div>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="in-review">In Review</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredRequests.map((request) => {
                  const StatusIcon = statusConfig[request.status].icon;
                  return (
                    <Card key={request.id} className="border-l-4" style={{ borderLeftColor: request.priority === 'critical' || request.priority === 'high' ? 'hsl(var(--destructive))' : 'hsl(var(--primary))' }}>
                      <CardContent className="pt-6">
                        <div className="space-y-4">
                          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                            <div className="space-y-2 flex-1">
                              <div className="flex items-center gap-2 flex-wrap">
                                <h3 className="font-semibold text-lg">{request.id}</h3>
                                <Badge variant={statusConfig[request.status].variant} className="gap-1">
                                  <StatusIcon className="h-3 w-3" />
                                  {statusConfig[request.status].label}
                                </Badge>
                                <Badge variant={priorityConfig[request.priority]} className="capitalize">
                                  {request.priority}
                                </Badge>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-muted-foreground">
                                <div><span className="font-medium">Asset Type:</span> {request.assetType}</div>
                                <div><span className="font-medium">Asset ID:</span> {request.assetId}</div>
                                <div className="md:col-span-2"><span className="font-medium">Location:</span> {request.location}</div>
                                <div className="md:col-span-2"><span className="font-medium">Discrepancy:</span> {request.discrepancyType}</div>
                              </div>
                            </div>
                            <div className="text-sm text-muted-foreground shrink-0">
                              <div>Created: {new Date(request.createdDate).toLocaleDateString()}</div>
                              <div>Updated: {new Date(request.updatedDate).toLocaleDateString()}</div>
                              {request.assignedTo && <div className="font-medium">Assigned: {request.assignedTo}</div>}
                            </div>
                          </div>
                          
                          <div className="space-y-2 text-sm">
                            <p><span className="font-medium">Description:</span> {request.description}</p>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-3 bg-muted rounded-md">
                              {request.gisValue && (
                                <div>
                                  <div className="font-medium text-xs uppercase text-muted-foreground">GIS Value</div>
                                  <div className="font-mono">{request.gisValue}</div>
                                </div>
                              )}
                              {request.sapValue && (
                                <div>
                                  <div className="font-medium text-xs uppercase text-muted-foreground">SAP Value</div>
                                  <div className="font-mono">{request.sapValue}</div>
                                </div>
                              )}
                              <div>
                                <div className="font-medium text-xs uppercase text-muted-foreground">Correct Value</div>
                                <div className="font-mono text-primary">{request.correctValue}</div>
                              </div>
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Requested by: <span className="font-medium">{request.requestedBy}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
                {filteredRequests.length === 0 && (
                  <div className="text-center py-12 text-muted-foreground">
                    <FileEdit className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No correction requests found.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Submit Request Tab */}
        <TabsContent value="submit" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Submit Correction Request</CardTitle>
              <CardDescription>Report discrepancies between GIS and SAP data for electric assets</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitRequest} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="assetType">Asset Type *</Label>
                    <Select value={formData.assetType} onValueChange={(value) => handleInputChange('assetType', value)}>
                      <SelectTrigger id="assetType">
                        <SelectValue placeholder="Select asset type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Conductor">Conductor</SelectItem>
                        <SelectItem value="Recloser">Recloser</SelectItem>
                        <SelectItem value="Capacitor Bank">Capacitor Bank</SelectItem>
                        <SelectItem value="Voltage Regulator">Voltage Regulator</SelectItem>
                        <SelectItem value="Transformer">Transformer</SelectItem>
                        <SelectItem value="Switch">Switch</SelectItem>
                        <SelectItem value="Fuse/Cutout">Fuse/Cutout</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    {formErrors.assetType && <p className="text-sm text-destructive">{formErrors.assetType}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="assetId">Asset ID *</Label>
                    <Input
                      id="assetId"
                      placeholder="e.g., COND-12345"
                      value={formData.assetId}
                      onChange={(e) => handleInputChange('assetId', e.target.value)}
                    />
                    {formErrors.assetId && <p className="text-sm text-destructive">{formErrors.assetId}</p>}
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="location">Location *</Label>
                    <Input
                      id="location"
                      placeholder="e.g., Division: Auburn, Circuit: 301-L0783"
                      value={formData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                    />
                    {formErrors.location && <p className="text-sm text-destructive">{formErrors.location}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="discrepancyType">Discrepancy Type *</Label>
                    <Select value={formData.discrepancyType} onValueChange={(value) => handleInputChange('discrepancyType', value)}>
                      <SelectTrigger id="discrepancyType">
                        <SelectValue placeholder="Select discrepancy type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Incorrect Specification">Incorrect Specification</SelectItem>
                        <SelectItem value="Missing in GIS">Missing in GIS</SelectItem>
                        <SelectItem value="Missing in SAP">Missing in SAP</SelectItem>
                        <SelectItem value="Incorrect Status">Incorrect Status</SelectItem>
                        <SelectItem value="Duplicate Entry">Duplicate Entry</SelectItem>
                        <SelectItem value="Incorrect Rating">Incorrect Rating</SelectItem>
                        <SelectItem value="Incorrect Location">Incorrect Location</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    {formErrors.discrepancyType && <p className="text-sm text-destructive">{formErrors.discrepancyType}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="priority">Priority *</Label>
                    <Select value={formData.priority} onValueChange={(value: any) => handleInputChange('priority', value)}>
                      <SelectTrigger id="priority">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="critical">Critical</SelectItem>
                      </SelectContent>
                    </Select>
                    {formErrors.priority && <p className="text-sm text-destructive">{formErrors.priority}</p>}
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="description">Description *</Label>
                    <Textarea
                      id="description"
                      placeholder="Provide detailed description of the discrepancy..."
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      rows={4}
                    />
                    {formErrors.description && <p className="text-sm text-destructive">{formErrors.description}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="gisValue">GIS Value</Label>
                    <Input
                      id="gisValue"
                      placeholder="Current value in GIS"
                      value={formData.gisValue}
                      onChange={(e) => handleInputChange('gisValue', e.target.value)}
                    />
                    {formErrors.gisValue && <p className="text-sm text-destructive">{formErrors.gisValue}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="sapValue">SAP Value</Label>
                    <Input
                      id="sapValue"
                      placeholder="Current value in SAP"
                      value={formData.sapValue}
                      onChange={(e) => handleInputChange('sapValue', e.target.value)}
                    />
                    {formErrors.sapValue && <p className="text-sm text-destructive">{formErrors.sapValue}</p>}
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="correctValue">Correct Value *</Label>
                    <Input
                      id="correctValue"
                      placeholder="What the correct value should be"
                      value={formData.correctValue}
                      onChange={(e) => handleInputChange('correctValue', e.target.value)}
                    />
                    {formErrors.correctValue && <p className="text-sm text-destructive">{formErrors.correctValue}</p>}
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="requestedBy">Requested By *</Label>
                    <Input
                      id="requestedBy"
                      placeholder="Your name"
                      value={formData.requestedBy}
                      onChange={(e) => handleInputChange('requestedBy', e.target.value)}
                    />
                    {formErrors.requestedBy && <p className="text-sm text-destructive">{formErrors.requestedBy}</p>}
                  </div>
                </div>

                <div className="flex gap-4 justify-end">
                  <Button type="button" variant="outline" onClick={() => {
                    setFormData({
                      assetType: '',
                      assetId: '',
                      location: '',
                      discrepancyType: '',
                      description: '',
                      gisValue: '',
                      sapValue: '',
                      correctValue: '',
                      priority: 'medium',
                      requestedBy: '',
                    });
                    setFormErrors({});
                  }}>
                    Clear Form
                  </Button>
                  <Button type="submit">
                    <Plus className="h-4 w-4 mr-2" />
                    Submit Request
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </PageLayout>
  );
}
