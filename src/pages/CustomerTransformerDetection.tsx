import { useState } from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Download, Search } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

// Mock data for the voltage comparison charts
const generateVoltageData = (baseVoltage: number, variance: number) => {
  const hours = Array.from({ length: 24 }, (_, i) => i);
  return hours.map(hour => ({
    time: `${hour.toString().padStart(2, '0')}:00`,
    voltage: baseVoltage + (Math.random() - 0.5) * variance
  }));
};

const mockCustomers = [
  {
    id: '4311426309',
    reportedTransformer: 'DS 4834',
    suspectedTransformer: 'DS 4035',
    confidence: '99%',
    recordedData: generateVoltageData(235, 20),
    suspectedData: generateVoltageData(235, 15),
    recordedComparedTo: '4310810515',
    suspectedComparedTo: '4310543301',
    comparisonDate: '10 Jun 2025'
  },
  {
    id: '4310536351',
    reportedTransformer: 'DS 11283',
    suspectedTransformer: 'DS 11530',
    confidence: '99%',
    recordedData: generateVoltageData(240, 18),
    suspectedData: generateVoltageData(240, 12),
    recordedComparedTo: '4310370711',
    suspectedComparedTo: '4311409869',
    comparisonDate: '9 Jun 2025'
  },
  {
    id: '4311239766',
    reportedTransformer: 'DS 1297',
    suspectedTransformer: 'DS 2980',
    confidence: '99%',
    recordedData: generateVoltageData(238, 22),
    suspectedData: generateVoltageData(238, 14),
    recordedComparedTo: '4310370711',
    suspectedComparedTo: '4311409869',
    comparisonDate: '9 Jun 2025'
  }
];

export default function CustomerTransformerDetection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [substationFilter, setSubstationFilter] = useState('all');
  const [confidenceFilter, setConfidenceFilter] = useState('all');

  const filteredCustomers = mockCustomers.filter(customer => {
    const matchesSearch = customer.id.includes(searchQuery) || 
                         customer.reportedTransformer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         customer.suspectedTransformer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <PageLayout title="Customer Transformer Detection">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Suspected Customer To Transformer Mappings</CardTitle>
            <CardDescription>
              Review customers detected to be listed on the wrong distribution substation.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Filters Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium">
                  Filters <span className="text-muted-foreground">(displaying {filteredCustomers.length} customers)</span>
                </h3>
                <Button variant="outline" size="sm">Reset filters</Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Suspected Substation</label>
                  <Select value={substationFilter} onValueChange={setSubstationFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select substation" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Substations</SelectItem>
                      <SelectItem value="ds1">DS 4834</SelectItem>
                      <SelectItem value="ds2">DS 11283</SelectItem>
                      <SelectItem value="ds3">DS 1297</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Minimum Confidence Level</label>
                  <Select value={confidenceFilter} onValueChange={setConfidenceFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select confidence" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Levels</SelectItem>
                      <SelectItem value="95">95% and above</SelectItem>
                      <SelectItem value="90">90% and above</SelectItem>
                      <SelectItem value="85">85% and above</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Search</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search table..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Results Table with Charts */}
            <div className="space-y-6">
              {/* Table Header */}
              <div className="grid grid-cols-12 gap-4 pb-4 border-b text-sm font-medium text-muted-foreground">
                <div className="col-span-2">CUSTOMER</div>
                <div className="col-span-2">REPORTED DISTRIBUTION TRANSFORMER</div>
                <div className="col-span-2">SUSPECTED DISTRIBUTION TRANSFORMER</div>
                <div className="col-span-1">CONFIDENCE</div>
                <div className="col-span-5 text-center">VOLTAGE COMPARISON</div>
              </div>

              {/* Customer Rows */}
              {filteredCustomers.map((customer, idx) => (
                <div key={idx} className="space-y-4 pb-6 border-b last:border-b-0">
                  <div className="grid grid-cols-12 gap-4 items-start">
                    <div className="col-span-2 font-medium">{customer.id}</div>
                    <div className="col-span-2">{customer.reportedTransformer}</div>
                    <div className="col-span-2">{customer.suspectedTransformer}</div>
                    <div className="col-span-1 font-semibold">{customer.confidence}</div>
                    
                    {/* Charts */}
                    <div className="col-span-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Recorded Chart */}
                      <div className="space-y-2">
                        <div className="text-xs text-muted-foreground text-center">
                          CLOSEST CUSTOMER (RECORDED)
                        </div>
                        <ResponsiveContainer width="100%" height={150}>
                          <LineChart data={customer.recordedData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                            <XAxis 
                              dataKey="time" 
                              tick={{ fontSize: 10 }}
                              interval={3}
                            />
                            <YAxis 
                              domain={[210, 260]} 
                              tick={{ fontSize: 10 }}
                            />
                            <Tooltip />
                            <Line 
                              type="monotone" 
                              dataKey="voltage" 
                              stroke="hsl(var(--primary))" 
                              strokeWidth={2}
                              dot={false}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                        <div className="text-xs text-muted-foreground text-center">
                          Compared to {customer.recordedComparedTo} on {customer.comparisonDate}
                        </div>
                      </div>

                      {/* Suspected Chart */}
                      <div className="space-y-2">
                        <div className="text-xs text-muted-foreground text-center">
                          CLOSEST CUSTOMER (SUSPECTED)
                        </div>
                        <ResponsiveContainer width="100%" height={150}>
                          <LineChart data={customer.suspectedData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                            <XAxis 
                              dataKey="time" 
                              tick={{ fontSize: 10 }}
                              interval={3}
                            />
                            <YAxis 
                              domain={[210, 260]} 
                              tick={{ fontSize: 10 }}
                            />
                            <Tooltip />
                            <Line 
                              type="monotone" 
                              dataKey="voltage" 
                              stroke="hsl(var(--chart-2))" 
                              strokeWidth={2}
                              dot={false}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                        <div className="text-xs text-muted-foreground text-center">
                          Compared to {customer.suspectedComparedTo} on {customer.comparisonDate}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Export Button */}
            <div className="flex justify-end pt-4">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export Results
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
}
