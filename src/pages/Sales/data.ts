
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

// Sample sales data
export const initialSales: Sale[] = [
  { 
    id: 1, 
    orderNumber: 'INV-001', 
    date: '2023-07-01', 
    customer: 'John Smith', 
    total: 2249.70,
    items: 2,
    status: 'Completed',
    payment: 'Credit Card'
  },
  { 
    id: 2, 
    orderNumber: 'INV-002', 
    date: '2023-07-02', 
    customer: 'Jane Doe', 
    total: 1199.85,
    items: 1,
    status: 'Completed',
    payment: 'PayPal'
  },
  { 
    id: 3, 
    orderNumber: 'INV-003', 
    date: '2023-07-03', 
    customer: 'Robert Johnson', 
    total: 3449.55,
    items: 3,
    status: 'Completed',
    payment: 'Credit Card'
  },
  { 
    id: 4, 
    orderNumber: 'INV-004', 
    date: '2023-07-05', 
    customer: 'Emma Wilson', 
    total: 749.85,
    items: 1,
    status: 'Completed',
    payment: 'Cash'
  },
  { 
    id: 5, 
    orderNumber: 'INV-005', 
    date: '2023-07-07', 
    customer: 'Michael Brown', 
    total: 1949.85,
    items: 1,
    status: 'Pending',
    payment: 'Credit Card'
  },
  { 
    id: 6, 
    orderNumber: 'INV-006', 
    date: '2023-07-10', 
    customer: 'Sarah Davis', 
    total: 2849.55,
    items: 2,
    status: 'Completed',
    payment: 'PayPal'
  },
  { 
    id: 7, 
    orderNumber: 'INV-007', 
    date: '2023-07-12', 
    customer: 'David Miller', 
    total: 1499.85,
    items: 1,
    status: 'Pending',
    payment: 'Credit Card'
  },
  { 
    id: 8, 
    orderNumber: 'INV-008', 
    date: '2023-07-15', 
    customer: 'Emily Jones', 
    total: 2399.70,
    items: 2,
    status: 'Cancelled',
    payment: 'PayPal'
  },
  { 
    id: 9, 
    orderNumber: 'INV-009', 
    date: '2023-07-18', 
    customer: 'Jessica Wilson', 
    total: 3749.55,
    items: 3,
    status: 'Completed',
    payment: 'Credit Card'
  },
  { 
    id: 10, 
    orderNumber: 'INV-010', 
    date: '2023-07-20', 
    customer: 'Thomas Anderson', 
    total: 899.85,
    items: 1,
    status: 'Completed',
    payment: 'Cash'
  },
];
