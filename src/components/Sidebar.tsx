
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Truck, 
  BarChart3, 
  Bell, 
  Settings, 
  ChevronLeft,
  ChevronRight,
  Menu
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useIsMobile } from '@/hooks/use-mobile';

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  to: string;
  notification?: number;
  collapsed: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ 
  icon, 
  label, 
  to, 
  notification,
  collapsed
}) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          "flex items-center gap-3 rounded-lg px-3 py-2 transition-all duration-300 ease-in-out hover:bg-accent",
          isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground"
        )
      }
    >
      {icon}
      {!collapsed && <span>{label}</span>}
      {!collapsed && notification && (
        <span className="ml-auto flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs">
          {notification}
        </span>
      )}
      {collapsed && notification && (
        <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs">
          {notification}
        </span>
      )}
    </NavLink>
  );
};

const Sidebar: React.FC = () => {
  const isMobile = useIsMobile();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  
  // Get saved state from localStorage on component mount
  useEffect(() => {
    const savedCollapsed = localStorage.getItem('sidebar-collapsed');
    if (savedCollapsed !== null) {
      setCollapsed(JSON.parse(savedCollapsed));
    }
  }, []);

  // Save state to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('sidebar-collapsed', JSON.stringify(collapsed));
  }, [collapsed]);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const SidebarContent = () => (
    <div className="flex flex-col gap-4 px-2 py-4 h-full">
      <div className="flex items-center justify-between px-2">
        {!collapsed && <span className="text-lg font-medium">Menu</span>}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleSidebar}
          className={cn("ml-auto transition-transform", collapsed && "-rotate-180")}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>
      
      <nav className="flex flex-col gap-1">
        <SidebarItem
          icon={<LayoutDashboard className="h-4 w-4" />}
          label="Dashboard"
          to="/"
          collapsed={collapsed}
        />
        <SidebarItem
          icon={<Package className="h-4 w-4" />}
          label="Products"
          to="/products"
          collapsed={collapsed}
        />
        <SidebarItem
          icon={<ShoppingCart className="h-4 w-4" />}
          label="Sales"
          to="/sales"
          notification={3}
          collapsed={collapsed}
        />
        <SidebarItem
          icon={<Truck className="h-4 w-4" />}
          label="Suppliers"
          to="/suppliers"
          collapsed={collapsed}
        />
        <SidebarItem
          icon={<BarChart3 className="h-4 w-4" />}
          label="Reports"
          to="/reports"
          collapsed={collapsed}
        />
        <SidebarItem
          icon={<Bell className="h-4 w-4" />}
          label="Notifications"
          to="/notifications"
          notification={5}
          collapsed={collapsed}
        />
        <SidebarItem
          icon={<Settings className="h-4 w-4" />}
          label="Settings"
          to="/settings"
          collapsed={collapsed}
        />
      </nav>
    </div>
  );

  // Mobile sidebar (Sheet)
  if (isMobile) {
    return (
      <>
        <Button 
          variant="ghost" 
          size="icon" 
          className="fixed left-4 top-20 z-40 bg-background/80 backdrop-blur-sm border shadow-sm"
          onClick={() => setMobileOpen(true)}
        >
          <Menu className="h-4 w-4" />
        </Button>
        
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetContent side="left" className="p-0">
            <SidebarContent />
          </SheetContent>
        </Sheet>
      </>
    );
  }

  // Desktop sidebar
  return (
    <aside className={cn(
      "fixed inset-y-0 left-0 z-30 flex h-full flex-col border-r bg-background transition-all duration-300 ease-in-out",
      collapsed ? "w-[70px]" : "w-[240px]"
    )}>
      <SidebarContent />
    </aside>
  );
};

export default Sidebar;
