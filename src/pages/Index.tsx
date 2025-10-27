import React from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Database, Zap, FileText, Settings, BarChart3, Map, Package } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Database,
      title: 'Asset Management',
      description: 'Comprehensive tracking and management of electric utility assets including transformers, conductors, and more.',
      action: () => navigate('/dashboards/assets'),
      color: 'text-primary'
    },
    {
      icon: Map,
      title: 'GIS Integration',
      description: 'Seamless integration with Geographic Information Systems for spatial asset data and discrepancy management.',
      action: () => navigate('/dashboards/gis-integration'),
      color: 'text-blue-500'
    },
    {
      icon: Package,
      title: 'SAP Integration',
      description: 'Direct connection to SAP systems for synchronized asset data and correction request workflows.',
      action: () => navigate('/dashboards/sap-integration'),
      color: 'text-green-500'
    },
    {
      icon: FileText,
      title: 'Work Orders',
      description: 'Track and manage maintenance work orders with detailed status monitoring and reporting capabilities.',
      action: () => navigate('/dashboards/work-orders'),
      color: 'text-orange-500'
    },
    {
      icon: BarChart3,
      title: 'Analytics & Reports',
      description: 'Advanced analytics dashboard with real-time insights into asset health, maintenance, and performance metrics.',
      action: () => navigate('/dashboards/analytics'),
      color: 'text-purple-500'
    },
    {
      icon: Settings,
      title: 'Data Quality',
      description: 'Monitor and improve data quality with automated discrepancy detection and correction workflows.',
      action: () => navigate('/dashboards/gis-discrepancy'),
      color: 'text-red-500'
    }
  ];

  return (
    <PageLayout title="Welcome to Asset Management System">
      <div className="space-y-8">
        {/* Hero Section */}
        <Card className="border-primary/20">
          <CardHeader className="text-center space-y-4 pb-8">
            <div className="flex justify-center">
              <Zap className="h-16 w-16 text-primary" />
            </div>
            <CardTitle className="text-4xl">Electric Utility Asset Management</CardTitle>
            <CardDescription className="text-lg max-w-3xl mx-auto">
              A comprehensive platform for managing electric utility assets, integrating GIS and SAP data, 
              tracking work orders, and ensuring data quality across your infrastructure.
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer group" onClick={feature.action}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <feature.icon className={`h-10 w-10 ${feature.color} group-hover:scale-110 transition-transform`} />
                </div>
                <CardTitle className="text-xl mt-4">{feature.title}</CardTitle>
                <CardDescription className="mt-2">
                  {feature.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="ghost" className="w-full group-hover:bg-primary/10">
                  Learn More →
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Stats */}
        <Card>
          <CardHeader>
            <CardTitle>System Overview</CardTitle>
            <CardDescription>Key metrics and capabilities at a glance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">15K+</div>
                <div className="text-sm text-muted-foreground mt-1">Total Assets</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-500">98%</div>
                <div className="text-sm text-muted-foreground mt-1">Data Sync Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-500">247</div>
                <div className="text-sm text-muted-foreground mt-1">Active Work Orders</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-500">12</div>
                <div className="text-sm text-muted-foreground mt-1">Integration Points</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default Index;
