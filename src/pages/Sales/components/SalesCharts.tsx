
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';

// Chart data
const salesTrendData = [
  { name: 'Jan', value: 18000 },
  { name: 'Feb', value: 28500 },
  { name: 'Mar', value: 22500 },
  { name: 'Apr', value: 33000 },
  { name: 'May', value: 39000 },
  { name: 'Jun', value: 42000 },
  { name: 'Jul', value: 46500 },
];

const salesByProductData = [
  { name: 'Electronics', value: 45 },
  { name: 'Accessories', value: 25 },
  { name: 'Home', value: 15 },
  { name: 'Stationery', value: 15 },
];

const COLORS = ['#6366F1', '#22C55E', '#F59E0B', '#EC4899'];

const SalesCharts: React.FC = () => {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="transition-all hover:smooth-shadow">
        <CardHeader>
          <CardTitle>Sales Trend</CardTitle>
          <CardDescription>Monthly sales for the current year</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={salesTrendData}
                margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `R${value}`} />
                <Tooltip
                  formatter={(value) => [`R${value}`, 'Revenue']}
                  contentStyle={{ borderRadius: '8px', border: '1px solid #f0f0f0' }}
                />
                <Line
                  type="monotone"
                  dataKey="value"
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
                  data={salesByProductData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {salesByProductData.map((entry, index) => (
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
    </div>
  );
};

export default SalesCharts;
