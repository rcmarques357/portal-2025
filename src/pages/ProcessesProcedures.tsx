import { PageLayout } from '@/components/layout/PageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  FileText, 
  Download, 
  Search,
  Clock,
  User,
  CheckCircle2,
  AlertCircle,
  FolderOpen
} from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function ProcessesProcedures() {
  const processes = [
    {
      category: 'Asset Management',
      items: [
        {
          title: 'Asset Registration and Tagging',
          description: 'Step-by-step guide for registering new assets in the system',
          version: 'v2.1',
          lastUpdated: '2024-01-15',
          author: 'Asset Management Team',
          status: 'current'
        },
        {
          title: 'Asset Inspection Procedures',
          description: 'Detailed procedures for conducting routine asset inspections',
          version: 'v1.8',
          lastUpdated: '2024-01-10',
          author: 'Operations Team',
          status: 'current'
        },
        {
          title: 'Asset Retirement Process',
          description: 'Process for decommissioning and retiring assets',
          version: 'v1.5',
          lastUpdated: '2023-12-20',
          author: 'Asset Management Team',
          status: 'current'
        }
      ]
    },
    {
      category: 'Data Management',
      items: [
        {
          title: 'GIS Data Entry Standards',
          description: 'Standards and procedures for entering data into GIS systems',
          version: 'v3.0',
          lastUpdated: '2024-01-20',
          author: 'GIS Team',
          status: 'current'
        },
        {
          title: 'SAP Data Synchronization',
          description: 'Process for syncing data between GIS and SAP systems',
          version: 'v2.3',
          lastUpdated: '2024-01-18',
          author: 'IT Integration Team',
          status: 'current'
        },
        {
          title: 'Data Quality Validation',
          description: 'Procedures for validating and ensuring data quality',
          version: 'v1.9',
          lastUpdated: '2024-01-12',
          author: 'Data Quality Team',
          status: 'current'
        },
        {
          title: 'Data Backup and Recovery',
          description: 'Backup procedures and disaster recovery protocols',
          version: 'v2.0',
          lastUpdated: '2023-12-28',
          author: 'IT Operations',
          status: 'current'
        }
      ]
    },
    {
      category: 'Maintenance Operations',
      items: [
        {
          title: 'Preventive Maintenance Scheduling',
          description: 'Guidelines for scheduling and executing preventive maintenance',
          version: 'v2.4',
          lastUpdated: '2024-01-22',
          author: 'Maintenance Team',
          status: 'current'
        },
        {
          title: 'Emergency Response Procedures',
          description: 'Emergency maintenance and response protocols',
          version: 'v1.7',
          lastUpdated: '2024-01-08',
          author: 'Operations Team',
          status: 'current'
        },
        {
          title: 'Contractor Management',
          description: 'Procedures for managing external contractors and vendors',
          version: 'v1.6',
          lastUpdated: '2023-12-15',
          author: 'Procurement Team',
          status: 'current'
        }
      ]
    },
    {
      category: 'Work Order Management',
      items: [
        {
          title: 'Work Order Creation and Assignment',
          description: 'Process for creating and assigning work orders',
          version: 'v2.2',
          lastUpdated: '2024-01-19',
          author: 'Operations Team',
          status: 'current'
        },
        {
          title: 'Work Order Status Updates',
          description: 'Guidelines for updating work order status and completion',
          version: 'v1.9',
          lastUpdated: '2024-01-14',
          author: 'Operations Team',
          status: 'current'
        },
        {
          title: 'Work Order Prioritization',
          description: 'Criteria and process for prioritizing work orders',
          version: 'v1.4',
          lastUpdated: '2023-12-22',
          author: 'Planning Team',
          status: 'current'
        },
        {
          title: 'Work Order Documentation',
          description: 'Standards for documenting work order activities and results',
          version: 'v2.0',
          lastUpdated: '2024-01-11',
          author: 'Quality Assurance',
          status: 'current'
        }
      ]
    },
    {
      category: 'Reporting and Analytics',
      items: [
        {
          title: 'Monthly Performance Reporting',
          description: 'Process for generating monthly performance reports',
          version: 'v1.8',
          lastUpdated: '2024-01-16',
          author: 'Analytics Team',
          status: 'current'
        },
        {
          title: 'KPI Tracking and Analysis',
          description: 'Guidelines for tracking key performance indicators',
          version: 'v2.1',
          lastUpdated: '2024-01-21',
          author: 'Analytics Team',
          status: 'current'
        },
        {
          title: 'Custom Report Generation',
          description: 'Procedures for creating custom reports and dashboards',
          version: 'v1.5',
          lastUpdated: '2023-12-30',
          author: 'IT Support',
          status: 'current'
        }
      ]
    }
  ];

  const recentlyUpdated = processes
    .flatMap(cat => cat.items.map(item => ({ ...item, category: cat.category })))
    .sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime())
    .slice(0, 5);

  return (
    <PageLayout title="Processes & Procedures">
      <Tabs defaultValue="all" className="space-y-6">
        <TabsList>
          <TabsTrigger value="all">All Procedures</TabsTrigger>
          <TabsTrigger value="recent">Recently Updated</TabsTrigger>
          <TabsTrigger value="search">Search</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Process & Procedure Documentation</CardTitle>
              <CardDescription>
                Comprehensive collection of operational processes and procedures
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {processes.map((category, categoryIndex) => (
                  <AccordionItem key={categoryIndex} value={`category-${categoryIndex}`}>
                    <AccordionTrigger className="text-lg font-semibold">
                      <div className="flex items-center gap-2">
                        <FolderOpen className="h-5 w-5" />
                        {category.category}
                        <Badge variant="secondary" className="ml-2">
                          {category.items.length}
                        </Badge>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-3 pt-2">
                        {category.items.map((item, itemIndex) => (
                          <Card key={itemIndex} className="border-l-4 border-l-primary">
                            <CardHeader className="pb-3">
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <CardTitle className="text-base flex items-center gap-2">
                                    <FileText className="h-4 w-4" />
                                    {item.title}
                                    <Badge variant="outline" className="ml-2">
                                      {item.version}
                                    </Badge>
                                  </CardTitle>
                                  <CardDescription className="mt-1">
                                    {item.description}
                                  </CardDescription>
                                </div>
                                <Button size="sm" variant="outline">
                                  <Download className="h-4 w-4 mr-2" />
                                  Download
                                </Button>
                              </div>
                            </CardHeader>
                            <CardContent className="pt-0">
                              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  Updated: {new Date(item.lastUpdated).toLocaleDateString()}
                                </div>
                                <div className="flex items-center gap-1">
                                  <User className="h-3 w-3" />
                                  {item.author}
                                </div>
                                {item.status === 'current' ? (
                                  <div className="flex items-center gap-1 text-green-600">
                                    <CheckCircle2 className="h-3 w-3" />
                                    Current
                                  </div>
                                ) : (
                                  <div className="flex items-center gap-1 text-yellow-600">
                                    <AlertCircle className="h-3 w-3" />
                                    Under Review
                                  </div>
                                )}
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recent" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recently Updated Procedures</CardTitle>
              <CardDescription>
                Most recently updated documentation and procedures
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentlyUpdated.map((item, index) => (
                <Card key={index} className="border-l-4 border-l-primary">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="secondary">{item.category}</Badge>
                          <Badge variant="outline">{item.version}</Badge>
                        </div>
                        <CardTitle className="text-base flex items-center gap-2">
                          <FileText className="h-4 w-4" />
                          {item.title}
                        </CardTitle>
                        <CardDescription className="mt-1">
                          {item.description}
                        </CardDescription>
                      </div>
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        Updated: {new Date(item.lastUpdated).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {item.author}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="search" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Search Procedures</CardTitle>
              <CardDescription>
                Search through all process and procedure documentation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search by title, description, or category..." 
                    className="pl-9"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm">Filter by Category</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {processes.map((cat, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <input type="checkbox" id={`cat-${idx}`} />
                          <label htmlFor={`cat-${idx}`} className="text-sm cursor-pointer">
                            {cat.category}
                          </label>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm">Filter by Status</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex items-center gap-2">
                        <input type="checkbox" id="status-current" />
                        <label htmlFor="status-current" className="text-sm cursor-pointer">
                          Current
                        </label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input type="checkbox" id="status-review" />
                        <label htmlFor="status-review" className="text-sm cursor-pointer">
                          Under Review
                        </label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input type="checkbox" id="status-draft" />
                        <label htmlFor="status-draft" className="text-sm cursor-pointer">
                          Draft
                        </label>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm">Date Range</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex items-center gap-2">
                        <input type="radio" name="date" id="date-all" defaultChecked />
                        <label htmlFor="date-all" className="text-sm cursor-pointer">
                          All Time
                        </label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input type="radio" name="date" id="date-month" />
                        <label htmlFor="date-month" className="text-sm cursor-pointer">
                          Last Month
                        </label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input type="radio" name="date" id="date-quarter" />
                        <label htmlFor="date-quarter" className="text-sm cursor-pointer">
                          Last Quarter
                        </label>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="pt-4 text-center text-muted-foreground">
                  Enter search terms and apply filters to find procedures
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </PageLayout>
  );
}
