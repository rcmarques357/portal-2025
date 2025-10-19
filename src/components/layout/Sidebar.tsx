import React, { useState } from 'react';
import { 
  BarChart, PieChart, Globe, Wallet, LineChart,
  Settings, ChevronRight, ChevronLeft, Home, Database, Wrench, FileText, ChevronDown
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

interface SubSubItem {
  title: string;
  href: string;
}

interface SubItem {
  title: string;
  href: string;
  subItems?: SubSubItem[];
}

interface NavItem {
  title: string;
  icon: React.ElementType;
  href: string;
  subItems?: SubItem[];
}

export function Sidebar({ isCollapsed, onToggle, className }: SidebarProps) {
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  
  const navItems = [
    {
      title: 'Dashboards',
      icon: Home,
      href: '/dashboards',
      subItems: [
        { 
          title: 'Asset Data Process', 
          href: '/dashboards/asset-data-process'
        },
        { 
          title: 'Asset Data Quality', 
          href: '/dashboards/asset-data-quality',
          subItems: [
            { title: 'Work Orders On Hold', href: '/workorders-on-hold' },
            { title: 'GIS to SAP Discrepancy', href: '/dashboards/asset-data-quality/gis-sap-discrepancy' }
          ]
        }
      ]
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
      title: 'Projects',
      icon: FileText,
      href: '/projects',
      subItems: [
        { title: 'Customer Transformer Detection', href: '/projects/customer-transformer-detection' }
      ]
    },
    {
      title: 'Documentation',
      icon: FileText,
      href: '/documentation',
      subItems: [
        { title: 'Business Process Manuals', href: '/documentation#bpm' },
        { title: 'Governance & Standards', href: '/documentation/governance' },
        { title: 'Processes & Procedures', href: '/documentation#procedures' }
      ]
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
            const isExpanded = expandedItems.includes(item.title);
            const hasSubItems = item.subItems && item.subItems.length > 0;
            
            return (
              <div key={index}>
                <div
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground cursor-pointer",
                    isActive ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-sidebar-foreground",
                    isCollapsed && "justify-center px-0"
                  )}
                  onClick={() => {
                    if (hasSubItems && !isCollapsed) {
                      setExpandedItems(prev =>
                        prev.includes(item.title)
                          ? prev.filter(t => t !== item.title)
                          : [...prev, item.title]
                      );
                    }
                  }}
                >
                  <Link
                    to={item.href}
                    className="flex items-center gap-3 flex-1"
                    onClick={(e) => hasSubItems && !isCollapsed && e.preventDefault()}
                  >
                    <item.icon className={cn("h-5 w-5 shrink-0")} />
                    <span className={cn(
                      "text-sm font-medium transition-opacity duration-200",
                      isCollapsed ? "opacity-0 w-0" : "opacity-100"
                    )}>
                      {item.title}
                    </span>
                  </Link>
                  {hasSubItems && !isCollapsed && (
                    <ChevronDown className={cn(
                      "h-4 w-4 transition-transform duration-200",
                      isExpanded && "rotate-180"
                    )} />
                  )}
                </div>
                
                {hasSubItems && isExpanded && !isCollapsed && (
                  <div className="ml-8 mt-1 space-y-1">
                    {item.subItems.map((subItem, subIndex) => {
                      const hasSubSubItems = subItem.subItems && subItem.subItems.length > 0;
                      const isSubExpanded = expandedItems.includes(`${item.title}-${subItem.title}`);
                      
                      return (
                        <div key={subIndex}>
                          <div
                            className="flex items-center gap-2 rounded-md px-3 py-1.5 text-sm transition-colors hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground text-sidebar-foreground/80 cursor-pointer"
                            onClick={() => {
                              if (hasSubSubItems) {
                                setExpandedItems(prev =>
                                  prev.includes(`${item.title}-${subItem.title}`)
                                    ? prev.filter(t => t !== `${item.title}-${subItem.title}`)
                                    : [...prev, `${item.title}-${subItem.title}`]
                                );
                              }
                            }}
                          >
                            <Link
                              to={subItem.href}
                              className="flex items-center gap-2 flex-1"
                              onClick={(e) => hasSubSubItems && e.preventDefault()}
                            >
                              <div className="h-1.5 w-1.5 rounded-full bg-sidebar-foreground/40" />
                              {subItem.title}
                            </Link>
                            {hasSubSubItems && (
                              <ChevronDown className={cn(
                                "h-3 w-3 transition-transform duration-200",
                                isSubExpanded && "rotate-180"
                              )} />
                            )}
                          </div>
                          
                          {hasSubSubItems && isSubExpanded && (
                            <div className="ml-6 mt-1 space-y-1">
                              {subItem.subItems.map((subSubItem, subSubIndex) => (
                                <Link
                                  key={subSubIndex}
                                  to={subSubItem.href}
                                  className="flex items-center gap-2 rounded-md px-3 py-1.5 text-xs transition-colors hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground text-sidebar-foreground/70"
                                >
                                  <div className="h-1 w-1 rounded-full bg-sidebar-foreground/30" />
                                  {subSubItem.title}
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
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
