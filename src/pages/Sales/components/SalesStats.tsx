
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowUpRight, ShoppingBag, Calendar } from 'lucide-react';

interface SalesStatsProps {
  totalSales: number;
  completedSales: number;
  averageOrderValue: number;
  totalItems: number;
}

const SalesStats: React.FC<SalesStatsProps> = ({ 
  totalSales, 
  completedSales, 
  averageOrderValue, 
  totalItems 
}) => {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <Card className="transition-all hover:smooth-shadow">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-primary/10 p-3">
              <ShoppingBag className="h-6 w-6 text-primary" />
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Total Sales</p>
              <div className="flex items-center gap-2">
                <p className="text-2xl font-medium">R{totalSales.toFixed(2)}</p>
                <span className="flex items-center text-xs text-green-500">
                  <ArrowUpRight className="h-3 w-3" /> 18%
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="transition-all hover:smooth-shadow">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-green-500/10 p-3">
              <ShoppingBag className="h-6 w-6 text-green-500" />
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Orders</p>
              <div className="flex items-center gap-2">
                <p className="text-2xl font-medium">{completedSales}</p>
                <span className="flex items-center text-xs text-green-500">
                  <ArrowUpRight className="h-3 w-3" /> 12%
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="transition-all hover:smooth-shadow">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-blue-500/10 p-3">
              <ShoppingBag className="h-6 w-6 text-blue-500" />
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Avg. Order Value</p>
              <div className="flex items-center gap-2">
                <p className="text-2xl font-medium">R{averageOrderValue.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="transition-all hover:smooth-shadow">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-purple-500/10 p-3">
              <Calendar className="h-6 w-6 text-purple-500" />
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Items Sold</p>
              <div className="flex items-center gap-2">
                <p className="text-2xl font-medium">{totalItems}</p>
                <span className="flex items-center text-xs text-green-500">
                  <ArrowUpRight className="h-3 w-3" /> 8%
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
//this is a test
export default SalesStats;
