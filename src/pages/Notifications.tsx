
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertTriangle, Truck, ShoppingCart, X, Clock, CheckCircle2 } from 'lucide-react';

// Sample notifications data
const initialNotifications = [
  {
    id: 1,
    type: 'low_stock',
    title: 'Low Stock Alert',
    description: 'Wireless Headphones stock is below the minimum threshold.',
    status: 'unread',
    date: '2023-07-30T10:15:00Z',
    product: {
      name: 'Wireless Headphones',
      sku: 'WH-001',
      currentStock: 5,
      minThreshold: 10
    }
  },
  {
    id: 2,
    type: 'low_stock',
    title: 'Low Stock Alert',
    description: 'Smart Watch stock is below the minimum threshold.',
    status: 'unread',
    date: '2023-07-29T14:30:00Z',
    product: {
      name: 'Smart Watch',
      sku: 'SW-002',
      currentStock: 3,
      minThreshold: 15
    }
  },
  {
    id: 3,
    type: 'order',
    title: 'New Order Received',
    description: 'Order #INV-010 has been placed by Thomas Anderson.',
    status: 'unread',
    date: '2023-07-28T09:45:00Z',
    order: {
      id: 'INV-010',
      customer: 'Thomas Anderson',
      amount: 59.99
    }
  },
  {
    id: 4,
    type: 'shipment',
    title: 'Shipment Arrived',
    description: 'New shipment from TechGadgets Inc. has arrived.',
    status: 'read',
    date: '2023-07-27T11:20:00Z',
    shipment: {
      supplier: 'TechGadgets Inc.',
      trackingNumber: 'TRK-12345',
      items: 25
    }
  },
  {
    id: 5,
    type: 'low_stock',
    title: 'Low Stock Alert',
    description: 'Laptop Bag stock is below the minimum threshold.',
    status: 'read',
    date: '2023-07-26T16:10:00Z',
    product: {
      name: 'Laptop Bag',
      sku: 'LB-004',
      currentStock: 2,
      minThreshold: 10
    }
  },
  {
    id: 6,
    type: 'order',
    title: 'New Order Received',
    description: 'Order #INV-009 has been placed by Jessica Wilson.',
    status: 'read',
    date: '2023-07-25T13:30:00Z',
    order: {
      id: 'INV-009',
      customer: 'Jessica Wilson',
      amount: 249.97
    }
  },
  {
    id: 7,
    type: 'shipment',
    title: 'Shipment Delayed',
    description: 'Shipment from AudioMax Ltd. has been delayed.',
    status: 'read',
    date: '2023-07-24T10:00:00Z',
    shipment: {
      supplier: 'AudioMax Ltd.',
      trackingNumber: 'TRK-67890',
      items: 10
    }
  },
  {
    id: 8,
    type: 'low_stock',
    title: 'Out of Stock Alert',
    description: 'Coffee Mug is now out of stock.',
    status: 'read',
    date: '2023-07-23T09:15:00Z',
    product: {
      name: 'Coffee Mug',
      sku: 'CM-008',
      currentStock: 0,
      minThreshold: 5
    }
  }
];

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [currentTab, setCurrentTab] = useState('all');
  
  // Filter notifications based on the current tab
  const filteredNotifications = notifications.filter(notification => {
    if (currentTab === 'all') return true;
    if (currentTab === 'unread') return notification.status === 'unread';
    return notification.type === currentTab;
  });
  
  // Count unread notifications
  const unreadCount = notifications.filter(notification => notification.status === 'unread').length;
  
  // Mark notification as read
  const markAsRead = (id: number) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, status: 'read' } : notification
    ));
  };
  
  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, status: 'read' })));
  };
  
  // Delete notification
  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };
  
  // Format date to relative time (e.g., "2 days ago")
  const formatRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) {
      return `${diffInSeconds} seconds ago`;
    }
    
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
      return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
    }
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    }
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
  };
  
  // Render notification icon based on type
  const renderNotificationIcon = (type: string) => {
    switch (type) {
      case 'low_stock':
        return (
          <div className="rounded-full bg-red-500/10 p-3">
            <AlertTriangle className="h-6 w-6 text-red-500" />
          </div>
        );
      case 'order':
        return (
          <div className="rounded-full bg-green-500/10 p-3">
            <ShoppingCart className="h-6 w-6 text-green-500" />
          </div>
        );
      case 'shipment':
        return (
          <div className="rounded-full bg-blue-500/10 p-3">
            <Truck className="h-6 w-6 text-blue-500" />
          </div>
        );
      default:
        return (
          <div className="rounded-full bg-gray-500/10 p-3">
            <Clock className="h-6 w-6 text-gray-500" />
          </div>
        );
    }
  };
  
  return (
    <Layout className="animate-fade-in">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h1 className="font-light">Notifications</h1>
          <p className="text-muted-foreground">Stay updated about your inventory system.</p>
        </div>
        
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="all" className="relative">
                All
                {unreadCount > 0 && (
                  <Badge className="ml-2 bg-primary text-primary-foreground">{unreadCount}</Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="unread">Unread</TabsTrigger>
              <TabsTrigger value="low_stock">Stock Alerts</TabsTrigger>
              <TabsTrigger value="order">Orders</TabsTrigger>
              <TabsTrigger value="shipment">Shipments</TabsTrigger>
            </TabsList>
            
            <div className="flex justify-end mb-4">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={markAllAsRead}
                disabled={unreadCount === 0}
              >
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Mark all as read
              </Button>
            </div>
            
            <TabsContent value={currentTab} className="space-y-4">
              {filteredNotifications.length > 0 ? (
                filteredNotifications.map((notification) => (
                  <Card 
                    key={notification.id} 
                    className={`transition-all hover:smooth-shadow
                      ${notification.status === 'unread' ? 'border-l-4 border-l-primary' : ''}
                    `}
                  >
                    <CardContent className="p-5">
                      <div className="flex items-start gap-4">
                        {renderNotificationIcon(notification.type)}
                        
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-1">
                            <div>
                              <h3 className="font-medium">{notification.title}</h3>
                              <p className="text-sm text-muted-foreground">{notification.description}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-6 w-6"
                                onClick={() => deleteNotification(notification.id)}
                              >
                                <X className="h-4 w-4" />
                                <span className="sr-only">Dismiss</span>
                              </Button>
                            </div>
                          </div>
                          
                          {notification.type === 'low_stock' && notification.product && (
                            <div className="mt-3 bg-muted p-3 rounded-md">
                              <div className="flex justify-between items-center">
                                <div>
                                  <p className="font-medium">{notification.product.name}</p>
                                  <p className="text-sm text-muted-foreground">SKU: {notification.product.sku}</p>
                                </div>
                                <div className="text-right">
                                  <p className={
                                    notification.product.currentStock === 0 
                                      ? 'font-bold text-red-500' 
                                      : 'font-bold text-amber-500'
                                  }>
                                    {notification.product.currentStock} / {notification.product.minThreshold}
                                  </p>
                                  <Badge className={
                                    notification.product.currentStock === 0 
                                      ? 'bg-red-500/10 text-red-500' 
                                      : 'bg-amber-500/10 text-amber-500'
                                  }>
                                    {notification.product.currentStock === 0 ? 'Out of Stock' : 'Low Stock'}
                                  </Badge>
                                </div>
                              </div>
                              
                              <div className="mt-3 flex justify-end gap-2">
                                <Button variant="outline" size="sm">View Product</Button>
                                <Button size="sm">Order More</Button>
                              </div>
                            </div>
                          )}
                          
                          {notification.type === 'order' && notification.order && (
                            <div className="mt-3 bg-muted p-3 rounded-md">
                              <div className="flex justify-between items-center">
                                <div>
                                  <p className="font-medium">Order {notification.order.id}</p>
                                  <p className="text-sm text-muted-foreground">Customer: {notification.order.customer}</p>
                                </div>
                                <div className="text-right">
                                  <p className="font-bold">${notification.order.amount.toFixed(2)}</p>
                                  <Badge className="bg-green-500/10 text-green-500">New Order</Badge>
                                </div>
                              </div>
                              
                              <div className="mt-3 flex justify-end gap-2">
                                <Button variant="outline" size="sm">View Details</Button>
                                <Button size="sm">Process Order</Button>
                              </div>
                            </div>
                          )}
                          
                          {notification.type === 'shipment' && notification.shipment && (
                            <div className="mt-3 bg-muted p-3 rounded-md">
                              <div className="flex justify-between items-center">
                                <div>
                                  <p className="font-medium">Shipment from {notification.shipment.supplier}</p>
                                  <p className="text-sm text-muted-foreground">
                                    Tracking: {notification.shipment.trackingNumber}
                                  </p>
                                </div>
                                <div className="text-right">
                                  <p className="font-bold">{notification.shipment.items} items</p>
                                  <Badge className="bg-blue-500/10 text-blue-500">
                                    {notification.title.includes('Arrived') ? 'Arrived' : 'Delayed'}
                                  </Badge>
                                </div>
                              </div>
                              
                              <div className="mt-3 flex justify-end gap-2">
                                <Button variant="outline" size="sm">Track Shipment</Button>
                                <Button size="sm">Update Inventory</Button>
                              </div>
                            </div>
                          )}
                          
                          <div className="mt-2 flex items-center justify-between">
                            <p className="text-xs text-muted-foreground">
                              {formatRelativeTime(notification.date)}
                            </p>
                            
                            {notification.status === 'unread' && (
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-6 text-xs"
                                onClick={() => markAsRead(notification.id)}
                              >
                                Mark as read
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <CheckCircle2 className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="font-medium text-lg mb-2">All caught up!</h3>
                  <p className="text-muted-foreground">
                    {currentTab === 'all' 
                      ? 'You don\'t have any notifications at the moment.'
                      : currentTab === 'unread'
                        ? 'You don\'t have any unread notifications.'
                        : `You don\'t have any ${
                            currentTab === 'low_stock'
                              ? 'stock alerts'
                              : currentTab === 'order'
                                ? 'order notifications'
                                : 'shipment notifications'
                          } at the moment.`
                    }
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default NotificationsPage;
