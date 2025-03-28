
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend
} from 'recharts';
import { Download, Calendar, FileText, BarChart3, PieChart as PieChartIcon, TrendingUp } from 'lucide-react';

// Sample data for reports
const salesByDateData = [
  { date: '2023-07-01', sales: 149.98 },
  { date: '2023-07-02', sales: 79.99 },
  { date: '2023-07-03', sales: 229.97 },
  { date: '2023-07-05', sales: 49.99 },
  { date: '2023-07-07', sales: 129.99 },
  { date: '2023-07-10', sales: 189.97 },
  { date: '2023-07-12', sales: 99.99 },
  { date: '2023-07-15', sales: 159.98 },
  { date: '2023-07-18', sales: 249.97 },
  { date: '2023-07-20', sales: 59.99 },
  { date: '2023-07-22', sales: 119.98 },
  { date: '2023-07-25', sales: 89.99 },
  { date: '2023-07-27', sales: 169.97 },
  { date: '2023-07-30', sales: 199.99 },
];

const topProductsData = [
  { name: 'Wireless Headphones', sales: 15, revenue: 1499.85 },
  { name: 'Smart Watch', sales: 8, revenue: 1599.92 },
  { name: 'Bluetooth Speaker', sales: 12, revenue: 959.88 },
  { name: 'Laptop Bag', sales: 10, revenue: 499.90 },
  { name: 'Phone Charger', sales: 18, revenue: 359.82 },
];

const salesByCategoryData = [
  { name: 'Electronics', value: 65 },
  { name: 'Accessories', value: 15 },
  { name: 'Home', value: 10 },
  { name: 'Stationery', value: 10 },
];

const inventoryStatusData = [
  { name: 'In Stock', value: 75 },
  { name: 'Low Stock', value: 20 },
  { name: 'Out of Stock', value: 5 },
];

const inventoryValueByCategory = [
  { name: 'Electronics', value: 25000 },
  { name: 'Accessories', value: 8000 },
  { name: 'Home', value: 5000 },
  { name: 'Stationery', value: 2000 },
];

const COLORS = ['#6366F1', '#22C55E', '#F59E0B', '#EC4899', '#14B8A6'];
const STATUS_COLORS = ['#22C55E', '#F59E0B', '#EF4444'];

// Formats a date string (YYYY-MM-DD) to a more readable format
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

// Get the last 30 days of data for sales report
const getLast30DaysData = () => {
  // In a real application, you would filter based on actual dates
  // This is simplified for the prototype
  return salesByDateData.slice(-10);
};

const ReportsPage = () => {
  const [timeRange, setTimeRange] = useState('30days');
  const [reportType, setReportType] = useState('sales');
  
  // Get filtered data based on selected time range
  const getFilteredData = () => {
    switch (timeRange) {
      case '7days':
        return salesByDateData.slice(-7);
      case '30days':
        return salesByDateData.slice(-10); // Using 10 instead of 30 for demo purposes
      case '90days':
        return salesByDateData;
      default:
        return salesByDateData;
    }
  };
  
  // Calculate total revenue for the selected time range
  const calculateTotalRevenue = () => {
    return getFilteredData().reduce((sum, item) => sum + item.sales, 0);
  };
  
  // Calculate total sales count for the selected time range
  const calculateTotalSalesCount = () => {
    return getFilteredData().length;
  };
  
  return (
    <Layout className="animate-fade-in">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h1 className="font-light">Reports</h1>
          <p className="text-muted-foreground">Generate and analyze inventory reports.</p>
        </div>
        
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-3">
            <Select
              value={reportType}
              onValueChange={setReportType}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Report Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sales">Sales Report</SelectItem>
                <SelectItem value="inventory">Inventory Report</SelectItem>
                <SelectItem value="products">Product Performance</SelectItem>
              </SelectContent>
            </Select>
            
            <Select
              value={timeRange}
              onValueChange={setTimeRange}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Time Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7days">Last 7 Days</SelectItem>
                <SelectItem value="30days">Last 30 Days</SelectItem>
                <SelectItem value="90days">Last 90 Days</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export Report
          </Button>
        </div>
        
        {reportType === 'sales' && (
          <div className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <Card className="transition-all hover:smooth-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="rounded-full bg-primary/10 p-3">
                      <FileText className="h-6 w-6 text-primary" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Total Revenue</p>
                      <p className="text-2xl font-medium">${calculateTotalRevenue().toFixed(2)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="transition-all hover:smooth-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="rounded-full bg-blue-500/10 p-3">
                      <Calendar className="h-6 w-6 text-blue-500" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Total Orders</p>
                      <p className="text-2xl font-medium">{calculateTotalSalesCount()}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="transition-all hover:smooth-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="rounded-full bg-green-500/10 p-3">
                      <TrendingUp className="h-6 w-6 text-green-500" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Average Order Value</p>
                      <p className="text-2xl font-medium">
                        ${(calculateTotalRevenue() / calculateTotalSalesCount()).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card className="transition-all hover:smooth-shadow">
              <CardHeader>
                <CardTitle>Sales Trend</CardTitle>
                <CardDescription>Revenue over the selected time period</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={getFilteredData()}
                      margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                      <XAxis 
                        dataKey="date" 
                        stroke="#888888" 
                        fontSize={12} 
                        tickLine={false} 
                        axisLine={false} 
                        tickFormatter={formatDate}
                      />
                      <YAxis 
                        stroke="#888888" 
                        fontSize={12} 
                        tickLine={false} 
                        axisLine={false} 
                        tickFormatter={(value) => `$${value}`} 
                      />
                      <Tooltip 
                        formatter={(value) => [`$${value}`, 'Revenue']}
                        labelFormatter={(label) => formatDate(label)}
                        contentStyle={{ borderRadius: '8px', border: '1px solid #f0f0f0' }}
                      />
                      <Line
                        type="monotone"
                        dataKey="sales"
                        stroke="#6366F1"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6, strokeWidth: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="transition-all hover:smooth-shadow">
                <CardHeader>
                  <CardTitle>Sales by Category</CardTitle>
                  <CardDescription>Distribution across product categories</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={salesByCategoryData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {salesByCategoryData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="transition-all hover:smooth-shadow">
                <CardHeader>
                  <CardTitle>Top Selling Products</CardTitle>
                  <CardDescription>Best performers by sales volume</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={topProductsData}
                        layout="vertical"
                        margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                        <XAxis type="number" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis 
                          dataKey="name" 
                          type="category" 
                          stroke="#888888" 
                          fontSize={12} 
                          tickLine={false} 
                          axisLine={false} 
                          width={100}
                        />
                        <Tooltip 
                          formatter={(value, name) => [name === 'sales' ? `${value} units` : `$${value}`, name === 'sales' ? 'Units Sold' : 'Revenue']}
                          contentStyle={{ borderRadius: '8px', border: '1px solid #f0f0f0' }}
                        />
                        <Bar dataKey="sales" name="Units Sold" fill="#6366F1" radius={[0, 4, 4, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card className="transition-all hover:smooth-shadow">
              <CardHeader>
                <CardTitle>Detailed Sales Report</CardTitle>
                <CardDescription>All transactions for the selected period</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Order Number</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {getLast30DaysData().map((sale, index) => (
                      <TableRow key={index}>
                        <TableCell>{formatDate(sale.date)}</TableCell>
                        <TableCell className="font-medium">{`INV-${String(index + 1).padStart(3, '0')}`}</TableCell>
                        <TableCell>{`Customer ${index + 1}`}</TableCell>
                        <TableCell>${sale.sales.toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        )}
        
        {reportType === 'inventory' && (
          <div className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <Card className="transition-all hover:smooth-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="rounded-full bg-green-500/10 p-3">
                      <BarChart3 className="h-6 w-6 text-green-500" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Total Inventory</p>
                      <p className="text-2xl font-medium">1,256 units</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="transition-all hover:smooth-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="rounded-full bg-primary/10 p-3">
                      <FileText className="h-6 w-6 text-primary" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Inventory Value</p>
                      <p className="text-2xl font-medium">$40,000.00</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="transition-all hover:smooth-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="rounded-full bg-amber-500/10 p-3">
                      <Calendar className="h-6 w-6 text-amber-500" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Low Stock Items</p>
                      <p className="text-2xl font-medium">23 products</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="transition-all hover:smooth-shadow">
                <CardHeader>
                  <CardTitle>Inventory Status</CardTitle>
                  <CardDescription>Distribution of stock status</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={inventoryStatusData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {inventoryStatusData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={STATUS_COLORS[index % STATUS_COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="transition-all hover:smooth-shadow">
                <CardHeader>
                  <CardTitle>Inventory Value by Category</CardTitle>
                  <CardDescription>Value distribution across categories</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={inventoryValueByCategory}
                        margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis 
                          stroke="#888888" 
                          fontSize={12} 
                          tickLine={false} 
                          axisLine={false} 
                          tickFormatter={(value) => `$${value}`} 
                        />
                        <Tooltip 
                          formatter={(value) => [`$${value}`, 'Value']}
                          contentStyle={{ borderRadius: '8px', border: '1px solid #f0f0f0' }}
                        />
                        <Bar dataKey="value" name="Value" fill="#6366F1" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card className="transition-all hover:smooth-shadow">
              <CardHeader>
                <CardTitle>Low Stock Alert</CardTitle>
                <CardDescription>Products that need attention</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product Name</TableHead>
                      <TableHead>SKU</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Current Stock</TableHead>
                      <TableHead>Threshold</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Wireless Headphones</TableCell>
                      <TableCell>WH-001</TableCell>
                      <TableCell>Electronics</TableCell>
                      <TableCell>5</TableCell>
                      <TableCell>10</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-amber-500/10 text-amber-500">
                          Low Stock
                        </Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Smart Watch</TableCell>
                      <TableCell>SW-002</TableCell>
                      <TableCell>Electronics</TableCell>
                      <TableCell>3</TableCell>
                      <TableCell>15</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-red-500/10 text-red-500">
                          Critical
                        </Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Laptop Bag</TableCell>
                      <TableCell>LB-004</TableCell>
                      <TableCell>Accessories</TableCell>
                      <TableCell>8</TableCell>
                      <TableCell>10</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-amber-500/10 text-amber-500">
                          Low Stock
                        </Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Desk Lamp</TableCell>
                      <TableCell>DL-006</TableCell>
                      <TableCell>Home</TableCell>
                      <TableCell>2</TableCell>
                      <TableCell>10</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-red-500/10 text-red-500">
                          Critical
                        </Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Coffee Mug</TableCell>
                      <TableCell>CM-008</TableCell>
                      <TableCell>Home</TableCell>
                      <TableCell>0</TableCell>
                      <TableCell>5</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-red-500/10 text-red-500">
                          Out of Stock
                        </Badge>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        )}
        
        {reportType === 'products' && (
          <div className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <Card className="transition-all hover:smooth-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="rounded-full bg-primary/10 p-3">
                      <BarChart3 className="h-6 w-6 text-primary" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Total Products</p>
                      <p className="text-2xl font-medium">63 active</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="transition-all hover:smooth-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="rounded-full bg-blue-500/10 p-3">
                      <TrendingUp className="h-6 w-6 text-blue-500" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Best Seller</p>
                      <p className="text-2xl font-medium">Wireless Headphones</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="transition-all hover:smooth-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="rounded-full bg-purple-500/10 p-3">
                      <PieChartIcon className="h-6 w-6 text-purple-500" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Product Categories</p>
                      <p className="text-2xl font-medium">4 categories</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card className="transition-all hover:smooth-shadow">
              <CardHeader>
                <CardTitle>Top Performing Products</CardTitle>
                <CardDescription>Products with highest revenue</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={topProductsData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis 
                        stroke="#888888" 
                        fontSize={12} 
                        tickLine={false} 
                        axisLine={false} 
                        tickFormatter={(value) => `$${value}`} 
                      />
                      <Tooltip 
                        formatter={(value) => [`$${value}`, 'Revenue']}
                        contentStyle={{ borderRadius: '8px', border: '1px solid #f0f0f0' }}
                      />
                      <Bar dataKey="revenue" name="Revenue" fill="#6366F1" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card className="transition-all hover:smooth-shadow">
              <CardHeader>
                <CardTitle>Product Performance</CardTitle>
                <CardDescription>Detailed performance metrics by product</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Units Sold</TableHead>
                      <TableHead>Revenue</TableHead>
                      <TableHead>Profit Margin</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Wireless Headphones</TableCell>
                      <TableCell>Electronics</TableCell>
                      <TableCell>15</TableCell>
                      <TableCell>$1,499.85</TableCell>
                      <TableCell>35%</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-green-500/10 text-green-500">
                          High Performer
                        </Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Smart Watch</TableCell>
                      <TableCell>Electronics</TableCell>
                      <TableCell>8</TableCell>
                      <TableCell>$1,599.92</TableCell>
                      <TableCell>40%</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-green-500/10 text-green-500">
                          High Performer
                        </Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Bluetooth Speaker</TableCell>
                      <TableCell>Electronics</TableCell>
                      <TableCell>12</TableCell>
                      <TableCell>$959.88</TableCell>
                      <TableCell>32%</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-blue-500/10 text-blue-500">
                          Average
                        </Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Laptop Bag</TableCell>
                      <TableCell>Accessories</TableCell>
                      <TableCell>10</TableCell>
                      <TableCell>$499.90</TableCell>
                      <TableCell>45%</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-blue-500/10 text-blue-500">
                          Average
                        </Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Phone Charger</TableCell>
                      <TableCell>Electronics</TableCell>
                      <TableCell>18</TableCell>
                      <TableCell>$359.82</TableCell>
                      <TableCell>50%</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-blue-500/10 text-blue-500">
                          Average
                        </Badge>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ReportsPage;
