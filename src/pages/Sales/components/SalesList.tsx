
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

export interface Sale {
  id: number;
  orderNumber: string;
  date: string;
  customer: string;
  total: number;
  items: number;
  status: string;
  payment: string;
}

interface SalesListProps {
  sales: Sale[];
  getStatusColor: (status: string) => string;
}

const SalesList: React.FC<SalesListProps> = ({ sales, getStatusColor }) => {
  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[120px]">Order #</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Items</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Payment</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sales.length > 0 ? (
            sales.map((sale) => (
              <TableRow key={sale.id}>
                <TableCell className="font-medium">{sale.orderNumber}</TableCell>
                <TableCell>{new Date(sale.date).toLocaleDateString()}</TableCell>
                <TableCell>{sale.customer}</TableCell>
                <TableCell>{sale.items}</TableCell>
                <TableCell>R{sale.total.toFixed(2)}</TableCell>
                <TableCell>{sale.payment}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={getStatusColor(sale.status)}>
                    {sale.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="h-24 text-center">
                No orders found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default SalesList;
