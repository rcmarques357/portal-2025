import React, { useState } from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { ArrowUp, CircleAlert } from 'lucide-react';

export default function GISDiscrepancy() {
  const [selectedOPCO, setSelectedOPCO] = useState('CMP');
  const [selectedDivisions, setSelectedDivisions] = useState(['Alfred', 'Auburn']);
  const [selectedDevices, setSelectedDevices] = useState(['FUSE/CUTOUT', 'TRANSFORMER']);
  const [selectedSCADA, setSelectedSCADA] = useState(['Y']);
  const [dateRange, setDateRange] = useState([20, 80]);

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

  return (
    <PageLayout title="GIS - SAP Accuracy of Electric Distribution Devices">
      <div className="space-y-6">
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
      </div>
    </PageLayout>
  );
}
