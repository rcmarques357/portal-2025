import { useState } from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Home, TrendingUp, Target } from 'lucide-react';

export default function WorkOrdersOnHold() {
  const [selectedOpco, setSelectedOpco] = useState('NYSEG');
  const [selectedTasks, setSelectedTasks] = useState(['41S', '60H', '60K']);

  const metrics = {
    openTasks: 453,
    avgDaysOpen: 138,
    longestDaysOpen: 1655,
    pendingCosts: 18663799
  };

  const reasons = [
    { name: 'SEF Issue or Serial...', count: 225 },
    { name: 'WO not TECO', count: 57 },
    { name: 'Costs Needed', count: 40 },
    { name: 'Stores', count: 40 },
    { name: 'Field Check / Equip...', count: 34 },
    { name: 'Must See Long Text', count: 23 },
    { name: 'Joint Use Issue/NJU...', count: 12 },
    { name: 'Fuse Size Needed', count: 10 },
    { name: 'Paperwork Missing...', count: 10 },
    { name: 'Other', count: 2 }
  ];

  const divisions = [
    { name: 'Oneonta', days: [42, 14, 6, 37, 0], total: 99 },
    { name: 'Binghamton', days: [0, 64, 0, 17, 4, 5], total: 90 },
    { name: 'Geneva', days: [15, 13, 0, 59, 0], total: 87 },
    { name: 'Lancaster', days: [20, 32, 6, 18, 0], total: 76 },
    { name: 'Elmira', days: [13, 5, 12, 0], total: 30 },
    { name: 'Auburn', days: [5, 7, 8, 12, 0], total: 32 },
    { name: 'Ithaca', days: [19, 0, 8, 0], total: 27 },
    { name: 'Mechanicville', days: [0, 5, 4, 7], total: 16 },
    { name: 'Liberty', days: [0, 4, 7, 4], total: 15 },
    { name: 'Brewster', days: [12, 0, 1], total: 13 },
    { name: 'Hornell', days: [0, 7], total: 7 }
  ];

  const openTasks = [
    {
      companyCode: '9301',
      mainWorkOrder: 'MDA3B998',
      div: '38',
      functionalLoc: '9301-L0278-2701-0069-E5D0009',
      flocDesc: 'BROOKFIELD T -690 -7',
      street: 'QUAKER HILL RD',
      city: 'BROOKFIELD T',
      notification: '10105273468',
      order: '801000734913',
      wbs: 'U1-N002B',
      task: '60H'
    },
    {
      companyCode: '9301',
      mainWorkOrder: 'MDA3B998',
      div: '38',
      functionalLoc: '9301-L0324-2032-0083-E5D0098',
      flocDesc: 'WINDHAM T -99 -419',
      street: 'COUNTY ROUTE 12',
      city: 'WINDHAM T',
      notification: '10105233710',
      order: '801000731023',
      wbs: 'U1-N002B',
      task: '60H'
    },
    {
      companyCode: '9301',
      mainWorkOrder: 'M3A3B998',
      div: '38',
      functionalLoc: '9301 L0277 Z714-0019 E500014',
      flocDesc: 'GEORGETOWN T /03 1A',
      street: 'UPHAM RD',
      city: 'GEORGETOW',
      notification: '10105235385',
      order: '801000729934',
      wbs: 'U1 N002B',
      task: '60H'
    }
  ];

  return (
    <PageLayout title="Electric Work Order Holds (Tasks 41S, 60H, and 60K)">
      <div className="space-y-6">
        {/* Header with navigation buttons */}
        <div className="flex justify-end gap-2">
          <Button variant="outline" size="sm">
            <Home className="h-4 w-4 mr-2" />
            Home
          </Button>
          <Button variant="outline" size="sm">
            Details
          </Button>
          <Button variant="outline" size="sm">
            <TrendingUp className="h-4 w-4 mr-2" />
            Trend
          </Button>
          <Button variant="outline" size="sm">
            <Target className="h-4 w-4 mr-2" />
            KPI
          </Button>
        </div>

        <div className="flex gap-6">
          {/* Filters Sidebar */}
          <Card className="w-64 h-fit">
            <CardHeader>
              <CardTitle className="text-base">Filters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-sm font-semibold mb-3 block">Filter by OPCO</Label>
                <Tabs value={selectedOpco} onValueChange={setSelectedOpco}>
                  <TabsList className="grid grid-cols-2 w-full">
                    <TabsTrigger value="CMP">CMP</TabsTrigger>
                    <TabsTrigger value="NYSEG">NYSEG</TabsTrigger>
                  </TabsList>
                  <TabsList className="grid grid-cols-2 w-full mt-1">
                    <TabsTrigger value="RGE">RGE</TabsTrigger>
                    <TabsTrigger value="UI">UI</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              <div>
                <Label className="text-sm font-semibold mb-3 block">Filter by Task</Label>
                <div className="space-y-2">
                  {['41S', '60H', '60K'].map((task) => (
                    <div key={task} className="flex items-center space-x-2">
                      <Checkbox
                        id={task}
                        checked={selectedTasks.includes(task)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedTasks([...selectedTasks, task]);
                          } else {
                            setSelectedTasks(selectedTasks.filter((t) => t !== task));
                          }
                        }}
                      />
                      <Label htmlFor={task} className="text-sm cursor-pointer">
                        {task}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-sm font-semibold mb-3 block">Filter by Open Days</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="newer" />
                    <Label htmlFor="newer" className="text-sm cursor-pointer">
                      Newer (≤120 Days)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="older" />
                    <Label htmlFor="older" className="text-sm cursor-pointer">
                      Older (&gt;120 Days)
                    </Label>
                  </div>
                </div>
              </div>

              <div>
                <Label className="text-sm font-semibold mb-2 block">Filter by Order</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="All" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm font-semibold mb-2 block">Filter by WBS</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="All" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm font-semibold mb-2 block">Filter by Division</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="All" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm font-semibold mb-2 block">Filter by Work Center</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="All" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm font-semibold mb-2 block">Filter by Date</Label>
                <div className="space-y-2">
                  <Label className="text-xs">Task Created On</Label>
                  <input type="date" defaultValue="2020-06-04" className="w-full px-3 py-2 border rounded-md text-sm" />
                  <input type="date" defaultValue="2025-10-17" className="w-full px-3 py-2 border rounded-md text-sm" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Main Content */}
          <div className="flex-1 space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Open Tasks
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold text-primary">{metrics.openTasks}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Average Days Open
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold text-primary">{metrics.avgDaysOpen}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Longest Days Open
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold text-primary">
                    {metrics.longestDaysOpen.toLocaleString()}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Approx. Pending Costs
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold text-destructive">
                    ${metrics.pendingCosts.toLocaleString()}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-2 gap-6">
              {/* Reason for Open Task */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Reason for Open Task</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {reasons.map((reason) => (
                      <div key={reason.name} className="flex items-center gap-2">
                        <div className="text-xs text-muted-foreground w-32 truncate">
                          {reason.name}
                        </div>
                        <div className="flex-1 h-6 bg-primary/20 rounded relative">
                          <div
                            className="h-full bg-primary rounded flex items-center justify-end px-2"
                            style={{ width: `${(reason.count / 225) * 100}%` }}
                          >
                            <span className="text-xs font-medium text-primary-foreground">
                              {reason.count}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Length of Time Open */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Length of Time Open</CardTitle>
                  <div className="flex gap-4 text-xs mt-2">
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-green-600 rounded-sm"></div>
                      <span>0 - 45</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-yellow-600 rounded-sm"></div>
                      <span>46 - 90</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-orange-600 rounded-sm"></div>
                      <span>91 - 120</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-red-600 rounded-sm"></div>
                      <span>More than 120</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {divisions.map((division) => (
                      <div key={division.name} className="flex items-center gap-2">
                        <div className="text-xs text-muted-foreground w-28">
                          {division.name}
                        </div>
                        <div className="flex-1 h-6 flex rounded overflow-hidden">
                          {division.days.map((count, index) => {
                            const colors = ['bg-green-600', 'bg-yellow-600', 'bg-orange-600', 'bg-red-600'];
                            const width = (count / division.total) * 100;
                            return count > 0 ? (
                              <div
                                key={index}
                                className={`${colors[index]} flex items-center justify-center`}
                                style={{ width: `${width}%` }}
                              >
                                <span className="text-xs font-medium text-white">{count}</span>
                              </div>
                            ) : null;
                          })}
                        </div>
                        <div className="text-xs text-muted-foreground w-8 text-right">
                          {division.total}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 text-right">
                    <p className="text-xs text-muted-foreground">Count of Task</p>
                    <p className="text-xs text-muted-foreground italic mt-1">
                      *Hover and click on the 3 dots to Export Data
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Open Tasks Details Table */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Open Tasks Details</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table className="min-w-max">
                    <TableHeader>
                      <TableRow>
                        <TableHead className="whitespace-nowrap min-w-[120px]">Company Code</TableHead>
                        <TableHead className="whitespace-nowrap min-w-[140px]">Main Work Order</TableHead>
                        <TableHead className="whitespace-nowrap min-w-[60px]">Div</TableHead>
                        <TableHead className="whitespace-nowrap min-w-[250px]">Functional Loc#</TableHead>
                        <TableHead className="whitespace-nowrap min-w-[180px]">FLOC Description</TableHead>
                        <TableHead className="whitespace-nowrap min-w-[150px]">Street</TableHead>
                        <TableHead className="whitespace-nowrap min-w-[120px]">City</TableHead>
                        <TableHead className="whitespace-nowrap min-w-[120px]">Notification</TableHead>
                        <TableHead className="whitespace-nowrap min-w-[120px]">Order</TableHead>
                        <TableHead className="whitespace-nowrap min-w-[100px]">WBS</TableHead>
                        <TableHead className="whitespace-nowrap min-w-[80px]">Task</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {openTasks.map((task, index) => (
                        <TableRow key={index}>
                          <TableCell className="whitespace-nowrap">{task.companyCode}</TableCell>
                          <TableCell className="whitespace-nowrap">{task.mainWorkOrder}</TableCell>
                          <TableCell className="whitespace-nowrap">{task.div}</TableCell>
                          <TableCell className="font-mono text-xs whitespace-nowrap">{task.functionalLoc}</TableCell>
                          <TableCell className="whitespace-nowrap">{task.flocDesc}</TableCell>
                          <TableCell className="whitespace-nowrap">{task.street}</TableCell>
                          <TableCell className="whitespace-nowrap">{task.city}</TableCell>
                          <TableCell className="whitespace-nowrap">{task.notification}</TableCell>
                          <TableCell className="whitespace-nowrap">{task.order}</TableCell>
                          <TableCell className="whitespace-nowrap">{task.wbs}</TableCell>
                          <TableCell className="whitespace-nowrap">{task.task}</TableCell>
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
