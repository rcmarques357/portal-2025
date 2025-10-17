import React, { useState } from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Filter, Download, MapPin, Wrench, AlertCircle, CheckCircle2, Clock } from 'lucide-react';

interface Asset {
  id: string;
  name: string;
  type: string;
  location: string;
  status: 'operational' | 'maintenance' | 'critical' | 'offline';
  lastInspection: string;
  sapId: string;
  gisId: string;
  voltage: string;
}

const mockAssets: Asset[] = [
  { id: '1', name: 'Transformer TX-4523', type: 'Transformer', location: 'Substation A', status: 'operational', lastInspection: '2025-10-10', sapId: 'SAP-45231', gisId: 'GIS-9872', voltage: '138kV' },
  { id: '2', name: 'Circuit Breaker CB-1024', type: 'Circuit Breaker', location: 'Substation B', status: 'maintenance', lastInspection: '2025-10-05', sapId: 'SAP-10243', gisId: 'GIS-5643', voltage: '69kV' },
  { id: '3', name: 'Transformer TX-8891', type: 'Transformer', location: 'Substation C', status: 'critical', lastInspection: '2025-09-28', sapId: 'SAP-88912', gisId: 'GIS-3421', voltage: '138kV' },
  { id: '4', name: 'Switch SW-3456', type: 'Switch', location: 'Substation A', status: 'operational', lastInspection: '2025-10-12', sapId: 'SAP-34562', gisId: 'GIS-7823', voltage: '34.5kV' },
  { id: '5', name: 'Transformer TX-6677', type: 'Transformer', location: 'Substation D', status: 'offline', lastInspection: '2025-10-01', sapId: 'SAP-66773', gisId: 'GIS-1234', voltage: '138kV' },
  { id: '6', name: 'Regulator RG-2233', type: 'Regulator', location: 'Substation B', status: 'operational', lastInspection: '2025-10-14', sapId: 'SAP-22334', gisId: 'GIS-8765', voltage: '12.47kV' },
];

const statusConfig = {
  operational: { label: 'Operational', icon: CheckCircle2, color: 'bg-success/10 text-success' },
  maintenance: { label: 'Maintenance', icon: Wrench, color: 'bg-warning/10 text-warning' },
  critical: { label: 'Critical', icon: AlertCircle, color: 'bg-danger/10 text-danger' },
  offline: { label: 'Offline', icon: Clock, color: 'bg-muted text-muted-foreground' },
};

export default function Assets() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredAssets = mockAssets.filter(asset => {
    const matchesSearch = asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         asset.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         asset.sapId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'all' || asset.type === filterType;
    const matchesStatus = filterStatus === 'all' || asset.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const stats = {
    total: mockAssets.length,
    operational: mockAssets.filter(a => a.status === 'operational').length,
    maintenance: mockAssets.filter(a => a.status === 'maintenance').length,
    critical: mockAssets.filter(a => a.status === 'critical').length,
  };

  return (
    <PageLayout title="Asset Inventory">
      <div className="space-y-6">
        <div>
          <p className="text-muted-foreground">
            Comprehensive view of all equipment assets integrated from GIS and SAP systems
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Total Assets</CardDescription>
              <CardTitle className="text-3xl">{stats.total}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Operational</CardDescription>
              <CardTitle className="text-3xl text-success">{stats.operational}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>In Maintenance</CardDescription>
              <CardTitle className="text-3xl text-warning">{stats.maintenance}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Critical</CardDescription>
              <CardTitle className="text-3xl text-danger">{stats.critical}</CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card>
          <CardHeader>
            <CardTitle>Equipment Inventory</CardTitle>
            <CardDescription>Search and filter your asset database</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 md:flex-row md:items-end">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by name, location, or SAP ID..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Equipment Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Transformer">Transformer</SelectItem>
                  <SelectItem value="Circuit Breaker">Circuit Breaker</SelectItem>
                  <SelectItem value="Switch">Switch</SelectItem>
                  <SelectItem value="Regulator">Regulator</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="operational">Operational</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                  <SelectItem value="offline">Offline</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                Export
              </Button>
            </div>

            {/* Assets Table */}
            <div className="mt-6 border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Asset Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Voltage</TableHead>
                    <TableHead>SAP ID</TableHead>
                    <TableHead>GIS ID</TableHead>
                    <TableHead>Last Inspection</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAssets.length > 0 ? (
                    filteredAssets.map((asset) => {
                      const StatusIcon = statusConfig[asset.status].icon;
                      return (
                        <TableRow key={asset.id}>
                          <TableCell className="font-medium">{asset.name}</TableCell>
                          <TableCell>{asset.type}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4 text-muted-foreground" />
                              {asset.location}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={statusConfig[asset.status].color}>
                              <StatusIcon className="h-3 w-3 mr-1" />
                              {statusConfig[asset.status].label}
                            </Badge>
                          </TableCell>
                          <TableCell>{asset.voltage}</TableCell>
                          <TableCell className="font-mono text-sm">{asset.sapId}</TableCell>
                          <TableCell className="font-mono text-sm">{asset.gisId}</TableCell>
                          <TableCell>{asset.lastInspection}</TableCell>
                        </TableRow>
                      );
                    })
                  ) : (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                        No assets found matching your filters
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
}
