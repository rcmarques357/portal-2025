
import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Sidebar } from '@/components/layout/Sidebar';
import { StatsCard } from '@/components/ui/StatsCard';
import { AssetStatusCard } from '@/components/assets/AssetStatusCard';
import { DataIntegrationCard } from '@/components/assets/DataIntegrationCard';
import { AssetInventoryCard } from '@/components/assets/AssetInventoryCard';
import { MaintenanceCard } from '@/components/assets/MaintenanceCard';
import { AssetHealthChart } from '@/components/assets/AssetHealthChart';
import { Activity, AlertCircle, Database, Wrench } from 'lucide-react';

export function Dashboard() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  
  const toggleSidebar = () => {
    setIsSidebarCollapsed(prev => !prev);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 flex">
        <Sidebar isCollapsed={isSidebarCollapsed} onToggle={toggleSidebar} />
        
        <main className="flex-1 transition-all duration-300">
          <div className="container max-w-full p-4 lg:p-6 animate-fade-in">
            <h1 className="text-2xl font-bold mb-6">Asset Management Dashboard</h1>
            
            {/* Stats Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 animate-slide-up" style={{ '--delay': '100ms' } as React.CSSProperties}>
              <StatsCard 
                title="Total Assets" 
                value="20,127"
                trend={2.3}
                description="Active equipment"
                icon={<Activity />}
                className="bg-primary/5"
              />
              <StatsCard 
                title="GIS-SAP Sync" 
                value="99.2%"
                description="Data accuracy"
                icon={<Database />}
                className="bg-success/5"
              />
              <StatsCard 
                title="Maintenance Due" 
                value="47"
                trend={-12.5}
                description="Next 7 days"
                icon={<Wrench />}
                className="bg-warning/5"
              />
              <StatsCard 
                title="Critical Alerts" 
                value="8"
                trend={-25.0}
                description="Requires attention"
                icon={<AlertCircle />}
                className="bg-danger/5"
              />
            </div>
            
            {/* Main Content Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left column - Asset Status and Inventory */}
              <div className="space-y-4 animate-slide-up" style={{ '--delay': '200ms' } as React.CSSProperties}>
                <AssetStatusCard />
                <AssetInventoryCard />
              </div>
              
              {/* Middle column - Chart and Maintenance */}
              <div className="space-y-4 animate-slide-up" style={{ '--delay': '300ms' } as React.CSSProperties}>
                <AssetHealthChart />
                <MaintenanceCard />
              </div>
              
              {/* Right column - Data Integration */}
              <div className="space-y-4 animate-slide-up" style={{ '--delay': '400ms' } as React.CSSProperties}>
                <DataIntegrationCard />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
