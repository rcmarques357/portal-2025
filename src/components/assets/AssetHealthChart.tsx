import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp } from 'lucide-react';

const healthData = [
  { month: 'Jul', excellent: 75, good: 15, fair: 7, poor: 3 },
  { month: 'Aug', excellent: 73, good: 17, fair: 7, poor: 3 },
  { month: 'Sep', excellent: 76, good: 14, fair: 7, poor: 3 },
  { month: 'Oct', excellent: 78, good: 13, fair: 6, poor: 3 },
  { month: 'Nov', excellent: 77, good: 14, fair: 6, poor: 3 },
  { month: 'Dec', excellent: 79, good: 13, fair: 5, poor: 3 },
];

export function AssetHealthChart() {
  return (
    <Card className="animate-enter">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          Asset Health Trend
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={healthData}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis dataKey="month" className="text-xs" />
            <YAxis className="text-xs" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '0.5rem'
              }}
            />
            <Legend />
            <Bar dataKey="excellent" stackId="a" fill="hsl(var(--success))" name="Excellent" />
            <Bar dataKey="good" stackId="a" fill="hsl(var(--primary))" name="Good" />
            <Bar dataKey="fair" stackId="a" fill="hsl(var(--warning))" name="Fair" />
            <Bar dataKey="poor" stackId="a" fill="hsl(var(--danger))" name="Poor" />
          </BarChart>
        </ResponsiveContainer>
        <p className="text-sm text-muted-foreground mt-4">
          Asset health distribution over the last 6 months, showing improvement in overall equipment condition.
        </p>
      </CardContent>
    </Card>
  );
}
