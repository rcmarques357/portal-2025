import React from 'react';
import { Search, Bell, User, Settings, LogOut, UserCircle, Sun, Moon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import logo from '@/assets/logo.png';

interface NavbarProps {
  className?: string;
}

export function Navbar({ className }: NavbarProps) {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();

  return (
    <header className={cn("bg-background/95 backdrop-blur-sm sticky top-0 z-30 border-b", className)}>
      <div className="container flex items-center justify-between h-16 px-4">
        <div className="flex items-center gap-2 lg:gap-4">
          <img src={logo} alt="Asset Data Hub Logo" className="h-8 w-8" />
          <h1 className="text-lg font-semibold tracking-tight lg:text-xl">Asset Data Hub</h1>
          
          <div className="relative hidden md:flex items-center h-9 rounded-md px-3 text-muted-foreground focus-within:text-foreground bg-muted/50">
            <Search className="h-4 w-4 mr-2" />
            <Input 
              type="search" 
              placeholder="Search equipment, locations..." 
              className="h-9 w-[200px] lg:w-[280px] bg-transparent border-none px-0 py-0 shadow-none focus-visible:ring-0 placeholder:text-muted-foreground"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="h-9 w-9"
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="relative h-9 w-9"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary animate-pulse" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-medium">Critical Alert</p>
                  <p className="text-xs text-muted-foreground">Transformer TX-4523 requires immediate inspection</p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-medium">Data Sync Complete</p>
                  <p className="text-xs text-muted-foreground">GIS-SAP integration updated 15,234 records</p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-medium">Maintenance Reminder</p>
                  <p className="text-xs text-muted-foreground">4 work orders scheduled for tomorrow</p>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="h-9 w-9 transition-transform duration-200 hover:scale-105 cursor-pointer">
                <AvatarFallback className="bg-primary/10 text-primary">
                  <User className="h-5 w-5" />
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate('/settings')}>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem>
                <UserCircle className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
