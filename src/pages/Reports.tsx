import { PageLayout } from '@/components/layout/PageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { FileText, Download, Calendar, Filter, Search, TrendingUp, BarChart3, PieChart } from 'lucide-react';
import { useState } from 'react';

interface Report {
  id: string;
  name: string;
  category: string;
  description: string;
  lastGenerated: string;
  frequency: string;
  format: string[];
  status: 'ready' | 'generating' | 'scheduled';
}

const Reports = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const reports: Report[] = [
    {
      id: '1',
      name: 'Asset Inventory Summary',
      category: 'Assets',
      description: 'Comprehensive overview of all assets including status, location, and health metrics',
      lastGenerated: '2024-01-15',
      frequency: 'Weekly',
      format: ['PDF', 'Excel', 'CSV'],
      status: 'ready'
    },
    {
      id: '2',
      name: 'Maintenance Performance',
      category: 'Maintenance',
      description: 'Analysis of maintenance activities, completion rates, and resource utilization',
      lastGenerated: '2024-01-14',
      frequency: 'Monthly',
      format: ['PDF', 'Excel'],
      status: 'ready'
    },
    {
      id: '3',
      name: 'Work Order Status Report',
      category: 'Work Orders',
      description: 'Current status of all work orders including pending, in-progress, and completed',
      lastGenerated: '2024-01-15',
      frequency: 'Daily',
      format: ['PDF', 'Excel', 'CSV'],
      status: 'ready'
    },
    {
      id: '4',
      name: 'GIS Data Quality Assessment',
      category: 'Data Quality',
      description: 'Evaluation of GIS data integrity, completeness, and accuracy metrics',
      lastGenerated: '2024-01-10',
      frequency: 'Monthly',
      format: ['PDF', 'Excel'],
      status: 'ready'
    },
    {
      id: '5',
      name: 'SAP Integration Status',
      category: 'Integration',
      description: 'Status of SAP data synchronization and discrepancy analysis',
      lastGenerated: '2024-01-15',
      frequency: 'Weekly',
      format: ['PDF', 'Excel'],
      status: 'generating'
    },
    {
      id: '6',
      name: 'Asset Health Trends',
      category: 'Analytics',
      description: 'Historical trends and predictive analysis of asset health and performance',
      lastGenerated: '2024-01-12',
      frequency: 'Monthly',
      format: ['PDF', 'Excel'],
      status: 'ready'
    },
    {
      id: '7',
      name: 'Compliance & Standards Report',
      category: 'Governance',
      description: 'Overview of compliance status against governance standards and regulations',
      lastGenerated: '2024-01-01',
      frequency: 'Quarterly',
      format: ['PDF'],
      status: 'scheduled'
    },
    {
      id: '8',
      name: 'Customer Transformer Association',
      category: 'Projects',
      description: 'Analysis of AMI data for customer-to-transformer relationships and discrepancies',
      lastGenerated: '2024-01-13',
      frequency: 'Weekly',
      format: ['PDF', 'Excel', 'CSV'],
      status: 'ready'
    }
  ];

  const categories = ['all', 'Assets', 'Maintenance', 'Work Orders', 'Data Quality', 'Integration', 'Analytics', 'Governance', 'Projects'];

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || report.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusBadge = (status: Report['status']) => {
    switch (status) {
      case 'ready':
        return <Badge variant="default" className="bg-green-500/10 text-green-600 hover:bg-green-500/20">Ready</Badge>;
      case 'generating':
        return <Badge variant="default" className="bg-blue-500/10 text-blue-600 hover:bg-blue-500/20">Generating</Badge>;
      case 'scheduled':
        return <Badge variant="default" className="bg-yellow-500/10 text-yellow-600 hover:bg-yellow-500/20">Scheduled</Badge>;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'analytics':
        return <TrendingUp className="h-4 w-4" />;
      case 'assets':
        return <BarChart3 className="h-4 w-4" />;
      default:
        return <PieChart className="h-4 w-4" />;
    }
  };

  return (
    <PageLayout title="Reports">
      <div className="space-y-6">
        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{reports.length}</div>
              <p className="text-xs text-muted-foreground">Available reports</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ready to Download</CardTitle>
              <Download className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{reports.filter(r => r.status === 'ready').length}</div>
              <p className="text-xs text-muted-foreground">Reports available</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Scheduled</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{reports.filter(r => r.status === 'scheduled').length}</div>
              <p className="text-xs text-muted-foreground">Upcoming reports</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Generating</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{reports.filter(r => r.status === 'generating').length}</div>
              <p className="text-xs text-muted-foreground">In progress</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Available Reports</CardTitle>
            <CardDescription>Generate and download reports for various aspects of asset management</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search reports..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full md:w-[200px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Reports List */}
            <div className="space-y-4">
              {filteredReports.map((report) => (
                <Card key={report.id}>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="mt-1">
                          {getCategoryIcon(report.category)}
                        </div>
                        <div className="space-y-1 flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="font-semibold">{report.name}</h3>
                            {getStatusBadge(report.status)}
                          </div>
                          <p className="text-sm text-muted-foreground">{report.description}</p>
                          <div className="flex flex-wrap gap-4 text-xs text-muted-foreground mt-2">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              Last generated: {report.lastGenerated}
                            </span>
                            <span>Frequency: {report.frequency}</span>
                            <span>Category: {report.category}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        {report.format.map((format) => (
                          <Button
                            key={format}
                            variant="outline"
                            size="sm"
                            disabled={report.status !== 'ready'}
                            className="w-full md:w-auto"
                          >
                            <Download className="h-4 w-4 mr-2" />
                            Download {format}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {filteredReports.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No reports found matching your criteria.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default Reports;
