
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Import components
import SalesStats from './components/SalesStats';
import SalesList from './components/SalesList';
import SalesFilter from './components/SalesFilter';
import SalesCharts from './components/SalesCharts';
import NewSaleDialog from './components/NewSaleDialog';

// Import data and utils
import { initialSales, Sale } from './data';
import { getStatusColor } from './utils';

const SalesPage: React.FC = () => {
  const [sales, setSales] = useState<Sale[]>(initialSales);
  const [search, setSearch] = useState('');
  const [currentView, setCurrentView] = useState('all');
  const [selectedTab, setSelectedTab] = useState('transactions');
  const [dialogOpen, setDialogOpen] = useState(false);
  
  const [newSale, setNewSale] = useState({
    customer: '',
    products: [{ product: '', quantity: 1 }],
    payment: 'Credit Card'
  });
  
  // Calculate summary statistics
  const totalSales = sales.reduce((sum, sale) => sum + sale.total, 0);
  const completedSales = sales.filter(sale => sale.status === 'Completed').length;
  const averageOrderValue = totalSales / sales.length;
  const totalItems = sales.reduce((sum, sale) => sum + sale.items, 0);
  
  // Filtering logic
  const filteredSales = sales.filter(sale => {
    const matchesSearch = sale.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
                         sale.customer.toLowerCase().includes(search.toLowerCase());
    let matchesStatus = true;
    
    if (currentView === 'completed') {
      matchesStatus = sale.status === 'Completed';
    } else if (currentView === 'pending') {
      matchesStatus = sale.status === 'Pending';
    } else if (currentView === 'cancelled') {
      matchesStatus = sale.status === 'Cancelled';
    }
    
    return matchesSearch && matchesStatus;
  });
  
  // Handle adding a new sale
  const handleAddSale = () => {
    const lastId = sales.length > 0 ? sales[sales.length - 1].id + 1 : 1;
    const newOrderNumber = `INV-${String(lastId).padStart(3, '0')}`;
    
    const today = new Date();
    const formattedDate = today.toISOString().slice(0, 10);
    
    const newSaleRecord = {
      id: lastId,
      orderNumber: newOrderNumber,
      date: formattedDate,
      customer: newSale.customer,
      total: 99.99,
      items: 1,
      status: 'Completed',
      payment: newSale.payment
    };
    
    setSales([...sales, newSaleRecord]);
    
    setNewSale({
      customer: '',
      products: [{ product: '', quantity: 1 }],
      payment: 'Credit Card'
    });

    setDialogOpen(false);
  };
  
  // Handle adding a product to the new sale
  const handleAddProduct = () => {
    setNewSale({
      ...newSale,
      products: [...newSale.products, { product: '', quantity: 1 }]
    });
  };
  
  // Handle updating product selection in the new sale form
  const handleProductChange = (index: number, productId: string) => {
    const updatedProducts = [...newSale.products];
    updatedProducts[index].product = productId;
    setNewSale({ ...newSale, products: updatedProducts });
  };
  
  // Handle updating product quantity in the new sale form
  const handleQuantityChange = (index: number, quantity: string) => {
    const updatedProducts = [...newSale.products];
    updatedProducts[index].quantity = parseInt(quantity) || 1;
    setNewSale({ ...newSale, products: updatedProducts });
  };
  
  return (
    <Layout className="animate-fade-in">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h1 className="font-light">Sales</h1>
          <p className="text-muted-foreground">Manage your sales and transactions.</p>
        </div>
        
        <Tabs
          defaultValue="transactions"
          value={selectedTab}
          onValueChange={setSelectedTab}
          className="space-y-6"
        >
          <TabsList>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="transactions" className="space-y-6">
            <SalesStats 
              totalSales={totalSales}
              completedSales={completedSales}
              averageOrderValue={averageOrderValue}
              totalItems={totalItems}
            />
            
            <SalesFilter
              search={search}
              setSearch={setSearch}
              currentView={currentView}
              setCurrentView={setCurrentView}
              onNewSaleClick={() => setDialogOpen(true)}
            />
            
            <SalesList 
              sales={filteredSales} 
              getStatusColor={getStatusColor} 
            />
            
            <NewSaleDialog
              open={dialogOpen}
              onOpenChange={setDialogOpen}
              newSale={newSale}
              setNewSale={setNewSale}
              handleAddSale={handleAddSale}
              handleAddProduct={handleAddProduct}
              handleProductChange={handleProductChange}
              handleQuantityChange={handleQuantityChange}
            />
          </TabsContent>
          
          <TabsContent value="analytics" className="space-y-6">
            <SalesCharts />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default SalesPage;
