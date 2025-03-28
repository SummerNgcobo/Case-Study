import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend
} from 'recharts';
import { ArrowUpRight, Package, ShoppingCart, AlertTriangle, Truck } from 'lucide-react';

// Sample data
const salesData = [
  { name: 'Jan', value: 18000 },
  { name: 'Feb', value: 28500 },
  { name: 'Mar', value: 22500 },
  { name: 'Apr', value: 33000 },
  { name: 'May', value: 39000 },
  { name: 'Jun', value: 42000 },
  { name: 'Jul', value: 46500 },
];

const inventoryData = [
  { name: 'Electronics', inStock: 85, lowStock: 15 },
  { name: 'Furniture', inStock: 65, lowStock: 35 },
  { name: 'Clothing', inStock: 90, lowStock: 10 },
  { name: 'Books', inStock: 45, lowStock: 55 },
  { name: 'Toys', inStock: 70, lowStock: 30 },
];

const popularProducts = [
  { name: 'Wireless Headphones', sales: 120, stock: 45 },
  { name: 'Smart Watch', sales: 95, stock: 28 },
  { name: 'Bluetooth Speaker', sales: 85, stock: 32 },
  { name: 'Laptop Bag', sales: 65, stock: 18 },
  { name: 'Phone Charger', sales: 55, stock: 50 },
];

const lowStockAlerts = [
  { name: 'Wireless Headphones', currentStock: 5, minThreshold: 10 },
  { name: 'Smart Watch', currentStock: 3, minThreshold: 15 },
  { name: 'Laptop Bag', currentStock: 2, minThreshold: 10 },
];

const Index = () => {
  const [chartView, setChartView] = useState('weekly');
  
  return (
    <Layout className="animate-fade-in">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h1 className="font-light">Dashboard</h1>
          <p className="text-muted-foreground">Welcome to your inventory management system.</p>
        </div>
        
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="transition-all hover:smooth-shadow">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-primary/10 p-3">
                  <Package className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Total Products</p>
                  <div className="flex items-center gap-2">
                    <p className="text-2xl font-medium">1,256</p>
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
                  <ShoppingCart className="h-6 w-6 text-blue-500" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Monthly Sales</p>
                  <div className="flex items-center gap-2">
                    <p className="text-2xl font-medium">R373,350</p>
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
                <div className="rounded-full bg-amber-500/10 p-3">
                  <AlertTriangle className="h-6 w-6 text-amber-500" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Low Stock</p>
                  <div className="flex items-center gap-2">
                    <p className="text-2xl font-medium">23</p>
                    <span className="flex items-center text-xs text-red-500">
                      <ArrowUpRight className="h-3 w-3" /> 5%
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
                  <Truck className="h-6 w-6 text-green-500" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Suppliers</p>
                  <div className="flex items-center gap-2">
                    <p className="text-2xl font-medium">56</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="col-span-full md:col-span-2 transition-all hover:smooth-shadow">
            <CardHeader>
              <CardTitle>Sales Overview</CardTitle>
              <CardDescription>Your sales performance for the current period.</CardDescription>
              <Tabs value={chartView} onValueChange={setChartView} className="mt-2">
                <TabsList>
                  <TabsTrigger value="weekly">Weekly</TabsTrigger>
                  <TabsTrigger value="monthly">Monthly</TabsTrigger>
                  <TabsTrigger value="yearly">Yearly</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={salesData}
                    margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366F1" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#6366F1" stopOpacity={0.1} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                    <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `R${value}`} />
                    <Tooltip
                      formatter={(value) => [`R${value}`, 'Revenue']}
                      contentStyle={{ borderRadius: '8px', border: '1px solid #f0f0f0' }}
                    />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#6366F1"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#salesGradient)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card className="transition-all hover:smooth-shadow">
            <CardHeader>
              <CardTitle>Inventory Status</CardTitle>
              <CardDescription>Stock levels by category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={inventoryData}
                    margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                    barSize={20}
                    layout="vertical"
                  >
                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                    <XAxis type="number" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis dataKey="name" type="category" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #f0f0f0' }} />
                    <Legend />
                    <Bar dataKey="inStock" name="In Stock" stackId="a" fill="#6366F1" radius={[0, 4, 4, 0]} />
                    <Bar dataKey="lowStock" name="Low Stock" stackId="a" fill="#FCA5A5" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="transition-all hover:smooth-shadow">
            <CardHeader>
              <CardTitle>Popular Products</CardTitle>
              <CardDescription>Top selling products this month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {popularProducts.map((product, index) => (
                  <div key={index} className="flex items-center justify-between border-b pb-2 last:border-0">
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-muted-foreground">Stock: {product.stock} units</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{product.sales} sold</p>
                      <p className="text-sm text-muted-foreground">This month</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card className="transition-all hover:smooth-shadow">
            <CardHeader>
              <CardTitle>Low Stock Alerts</CardTitle>
              <CardDescription>Products that need replenishing</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {lowStockAlerts.map((alert, index) => (
                  <div key={index} className="flex items-center justify-between border-b pb-2 last:border-0">
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-red-500/10 p-2">
                        <AlertTriangle className="h-4 w-4 text-red-500" />
                      </div>
                      <div>
                        <p className="font-medium">{alert.name}</p>
                        <p className="text-sm text-muted-foreground">Minimum: {alert.minThreshold} units</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-red-500">{alert.currentStock} left</p>
                      <Button size="sm" variant="outline" className="mt-1">
                        Restock
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
