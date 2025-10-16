import React from 'react';
import { 
  BarChart, PieChart, Globe, Wallet, LineChart,
  Settings, ChevronRight, ChevronLeft, Home, Database, Wrench
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Link, useLocation } from 'react-router-dom';
import logo from '@/assets/logo.png';

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
  className?: string;
}

interface NavItem {
  title: string;
  icon: React.ElementType;
  href: string;
}

export function Sidebar({ isCollapsed, onToggle, className }: SidebarProps) {
  const location = useLocation();
  
  const navItems = [
    {
      title: 'Dashboard',
      icon: Home,
      href: '/',
    },
    {
      title: 'Asset Inventory',
      icon: BarChart,
      href: '/assets',
    },
    {
      title: 'GIS Integration',
      icon: Globe,
      href: '/gis',
    },
    {
      title: 'SAP Data',
      icon: Database,
      href: '/sap',
    },
    {
      title: 'Maintenance',
      icon: Wrench,
      href: '/maintenance',
    },
    {
      title: 'Work Orders',
      icon: Wallet,
      href: '/workorders',
    },
    {
      title: 'Analytics',
      icon: LineChart,
      href: '/analytics',
    },
    {
      title: 'Reports',
      icon: PieChart,
      href: '/reports',
    },
    {
      title: 'Settings',
      icon: Settings,
      href: '/settings',
    }
  ];

  return (
    <aside className={cn(
      "bg-sidebar text-sidebar-foreground relative transition-all duration-300 ease-in-out flex flex-col border-r border-sidebar-border",
      isCollapsed ? "w-16" : "w-64",
      className
    )}>
      <div className="flex h-16 items-center justify-center border-b border-sidebar-border gap-2">
        <img 
          src={logo} 
          alt="Asset Data Hub Logo" 
          className={cn(
            "transition-all duration-200",
            isCollapsed ? "h-8 w-8" : "h-8 w-8"
          )}
        />
        <h2 className={cn(
          "font-semibold tracking-tight transition-opacity duration-200",
          isCollapsed ? "opacity-0 w-0" : "opacity-100"
        )}>
          Asset Data Hub
        </h2>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className={cn(
            "absolute right-2 text-sidebar-foreground h-8 w-8",
            isCollapsed ? "right-2" : "right-4"
          )}
        >
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>
      
      <ScrollArea className="flex-1 py-4">
        <nav className="grid gap-1 px-2">
          {navItems.map((item, index) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={index}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  isActive ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-sidebar-foreground",
                  isCollapsed && "justify-center px-0"
                )}
              >
                <item.icon className={cn("h-5 w-5 shrink-0")} />
                <span className={cn(
                  "text-sm font-medium transition-opacity duration-200",
                  isCollapsed ? "opacity-0 w-0" : "opacity-100"
                )}>
                  {item.title}
                </span>
              </Link>
            );
          })}
        </nav>
      </ScrollArea>
      
      <div className="p-4 border-t border-sidebar-border">
        <div className={cn(
          "transition-opacity duration-200 rounded-md bg-sidebar-accent/50 p-2 text-xs text-sidebar-accent-foreground",
          isCollapsed ? "opacity-0" : "opacity-100"
        )}>
          <p className="font-medium">System Status</p>
          <p>All systems operational</p>
          <p className="text-[10px]">Last sync: 2 min ago</p>
        </div>
      </div>
    </aside>
  );
}
