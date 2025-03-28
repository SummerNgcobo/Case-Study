
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';

// Sample products for new sale creation
const productOptions = [
  { id: 1, name: 'Wireless Headphones', price: 1499.85, sku: 'WH-001' },
  { id: 2, name: 'Smart Watch', price: 2999.85, sku: 'SW-002' },
  { id: 3, name: 'Bluetooth Speaker', price: 1199.85, sku: 'BS-003' },
  { id: 4, name: 'Laptop Bag', price: 749.85, sku: 'LB-004' },
  { id: 5, name: 'Phone Charger', price: 299.85, sku: 'PC-005' },
];

// Sample customers
const customerOptions = [
  { id: 1, name: 'John Smith', email: 'john.smith@example.com' },
  { id: 2, name: 'Jane Doe', email: 'jane.doe@example.com' },
  { id: 3, name: 'Robert Johnson', email: 'robert.johnson@example.com' },
  { id: 4, name: 'Emma Wilson', email: 'emma.wilson@example.com' },
  { id: 5, name: 'Michael Brown', email: 'michael.brown@example.com' },
];

// Payment methods
const paymentMethods = ['Credit Card', 'PayPal', 'Cash', 'Bank Transfer'];

interface NewSaleFormData {
  customer: string;
  products: { product: string; quantity: number }[];
  payment: string;
}

interface NewSaleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  newSale: NewSaleFormData;
  setNewSale: (newSale: NewSaleFormData) => void;
  handleAddSale: () => void;
  handleAddProduct: () => void;
  handleProductChange: (index: number, productId: string) => void;
  handleQuantityChange: (index: number, quantity: string) => void;
}

const NewSaleDialog: React.FC<NewSaleDialogProps> = ({
  open,
  onOpenChange,
  newSale,
  setNewSale,
  handleAddSale,
  handleAddProduct,
  handleProductChange,
  handleQuantityChange
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create New Sale</DialogTitle>
          <DialogDescription>
            Enter the details for the new sale.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="customer" className="text-right">
              Customer
            </Label>
            <Select
              onValueChange={(value) => setNewSale({...newSale, customer: value})}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select customer" />
              </SelectTrigger>
              <SelectContent>
                {customerOptions.map(customer => (
                  <SelectItem key={customer.id} value={customer.name}>
                    {customer.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-4 items-start gap-4">
            <Label className="text-right mt-2">
              Products
            </Label>
            <div className="col-span-3 space-y-3">
              {newSale.products.map((item, index) => (
                <div key={index} className="flex gap-2">
                  <Select
                    onValueChange={(value) => handleProductChange(index, value)}
                  >
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="Select product" />
                    </SelectTrigger>
                    <SelectContent>
                      {productOptions.map(product => (
                        <SelectItem key={product.id} value={product.name}>
                          {product.name} - R{product.price}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input
                    type="number"
                    placeholder="Qty"
                    className="w-20"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(index, e.target.value)}
                  />
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleAddProduct}
              >
                Add Product
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="payment" className="text-right">
              Payment Method
            </Label>
            <Select
              defaultValue={newSale.payment}
              onValueChange={(value) => setNewSale({...newSale, payment: value})}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {paymentMethods.map(method => (
                  <SelectItem key={method} value={method}>
                    {method}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button onClick={handleAddSale}>Create Sale</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewSaleDialog;
