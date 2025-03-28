
import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, className }) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className={cn(
          "flex-1 transition-all ease-in-out", 
          isMobile ? "p-6" : "p-6 md:p-10 ml-[70px] md:ml-[240px]"
        )}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
