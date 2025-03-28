
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
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
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Search, Plus, MoreHorizontal, MapPin, Phone, Mail, Star } from 'lucide-react';

// Sample suppliers data
const initialSuppliers = [
  {
    id: 1,
    name: 'TechGadgets Inc.',
    contact: 'John Anderson',
    email: 'john@techgadgets.com',
    phone: '+1 (555) 123-4567',
    address: '123 Tech Lane, San Francisco, CA 94102',
    category: 'Electronics',
    status: 'Active',
    rating: 5,
    products: 15
  },
  {
    id: 2,
    name: 'SmartTech Co.',
    contact: 'Emma Roberts',
    email: 'emma@smarttech.co',
    phone: '+1 (555) 234-5678',
    address: '456 Innovation Dr, Boston, MA 02108',
    category: 'Electronics',
    status: 'Active',
    rating: 4,
    products: 12
  },
  {
    id: 3,
    name: 'AudioMax Ltd.',
    contact: 'Michael Lee',
    email: 'michael@audiomax.com',
    phone: '+1 (555) 345-6789',
    address: '789 Sound Ave, Nashville, TN 37203',
    category: 'Electronics',
    status: 'Active',
    rating: 4,
    products: 8
  },
  {
    id: 4,
    name: 'BagMasters Inc.',
    contact: 'Sarah Johnson',
    email: 'sarah@bagmasters.com',
    phone: '+1 (555) 456-7890',
    address: '321 Fashion St, New York, NY 10001',
    category: 'Accessories',
    status: 'Active',
    rating: 3,
    products: 9
  },
  {
    id: 5,
    name: 'PowerUp Inc.',
    contact: 'David Chen',
    email: 'david@powerup.com',
    phone: '+1 (555) 567-8901',
    address: '654 Energy Blvd, Chicago, IL 60601',
    category: 'Electronics',
    status: 'Inactive',
    rating: 4,
    products: 6
  },
  {
    id: 6,
    name: 'LightWorks Co.',
    contact: 'Jennifer Kim',
    email: 'jennifer@lightworks.com',
    phone: '+1 (555) 678-9012',
    address: '987 Bright St, Seattle, WA 98101',
    category: 'Home',
    status: 'Active',
    rating: 5,
    products: 11
  },
  {
    id: 7,
    name: 'PaperCraft Ltd.',
    contact: 'Robert Williams',
    email: 'robert@papercraft.com',
    phone: '+1 (555) 789-0123',
    address: '741 Creative Ln, Portland, OR 97201',
    category: 'Stationery',
    status: 'Active',
    rating: 4,
    products: 14
  },
  {
    id: 8,
    name: 'HomeGoods Inc.',
    contact: 'Alexandra Garcia',
    email: 'alex@homegoods.com',
    phone: '+1 (555) 890-1234',
    address: '852 Cozy Rd, Austin, TX 78701',
    category: 'Home',
    status: 'Active',
    rating: 4,
    products: 18
  },
  {
    id: 9,
    name: 'DataStore Ltd.',
    contact: 'Thomas Brown',
    email: 'thomas@datastore.com',
    phone: '+1 (555) 901-2345',
    address: '369 Memory Way, San Jose, CA 95113',
    category: 'Electronics',
    status: 'Active',
    rating: 3,
    products: 5
  }
];

// Supplier categories
const supplierCategories = [
  'Electronics',
  'Accessories',
  'Home',
  'Stationery',
  'Other'
];

const SuppliersPage = () => {
  const [suppliers, setSuppliers] = useState(initialSuppliers);
  const [search, setSearch] = useState('');
  const [selectedSupplier, setSelectedSupplier] = useState<number | null>(null);
  const [newSupplier, setNewSupplier] = useState({
    name: '',
    contact: '',
    email: '',
    phone: '',
    address: '',
    category: '',
    notes: ''
  });
  
  // Filtering logic
  const filteredSuppliers = suppliers.filter(supplier => {
    return supplier.name.toLowerCase().includes(search.toLowerCase()) ||
           supplier.contact.toLowerCase().includes(search.toLowerCase()) ||
           supplier.category.toLowerCase().includes(search.toLowerCase());
  });
  
  // Get supplier details by ID
  const getSupplierDetails = (id: number) => {
    return suppliers.find(supplier => supplier.id === id);
  };
  
  // Handle adding a new supplier
  const handleAddSupplier = () => {
    const lastId = suppliers.length > 0 ? suppliers[suppliers.length - 1].id + 1 : 1;
    
    const supplier = {
      id: lastId,
      name: newSupplier.name,
      contact: newSupplier.contact,
      email: newSupplier.email,
      phone: newSupplier.phone,
      address: newSupplier.address,
      category: newSupplier.category,
      status: 'Active',
      rating: 0,
      products: 0
    };
    
    setSuppliers([...suppliers, supplier]);
    
    // Reset the form
    setNewSupplier({
      name: '',
      contact: '',
      email: '',
      phone: '',
      address: '',
      category: '',
      notes: ''
    });
  };
  
  // Handle deleting a supplier
  const handleDeleteSupplier = (id: number) => {
    setSuppliers(suppliers.filter(supplier => supplier.id !== id));
    if (selectedSupplier === id) {
      setSelectedSupplier(null);
    }
  };
  
  // Function to render rating stars
  const renderRating = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${index < rating ? 'text-amber-500 fill-amber-500' : 'text-gray-300'}`}
      />
    ));
  };
  
  return (
    <Layout className="animate-fade-in">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h1 className="font-light">Suppliers</h1>
          <p className="text-muted-foreground">Manage your product suppliers.</p>
        </div>
        
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative sm:w-full max-w-md">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search suppliers..."
              className="w-full pl-8 bg-background"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Supplier
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Add New Supplier</DialogTitle>
                <DialogDescription>
                  Enter the details for the new supplier.
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="supplier-name" className="text-right">
                    Company Name
                  </Label>
                  <Input
                    id="supplier-name"
                    className="col-span-3"
                    value={newSupplier.name}
                    onChange={(e) => setNewSupplier({...newSupplier, name: e.target.value})}
                  />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="supplier-contact" className="text-right">
                    Contact Person
                  </Label>
                  <Input
                    id="supplier-contact"
                    className="col-span-3"
                    value={newSupplier.contact}
                    onChange={(e) => setNewSupplier({...newSupplier, contact: e.target.value})}
                  />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="supplier-email" className="text-right">
                    Email
                  </Label>
                  <Input
                    id="supplier-email"
                    type="email"
                    className="col-span-3"
                    value={newSupplier.email}
                    onChange={(e) => setNewSupplier({...newSupplier, email: e.target.value})}
                  />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="supplier-phone" className="text-right">
                    Phone
                  </Label>
                  <Input
                    id="supplier-phone"
                    className="col-span-3"
                    value={newSupplier.phone}
                    onChange={(e) => setNewSupplier({...newSupplier, phone: e.target.value})}
                  />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="supplier-address" className="text-right">
                    Address
                  </Label>
                  <Input
                    id="supplier-address"
                    className="col-span-3"
                    value={newSupplier.address}
                    onChange={(e) => setNewSupplier({...newSupplier, address: e.target.value})}
                  />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="supplier-category" className="text-right">
                    Category
                  </Label>
                  <Input
                    id="supplier-category"
                    className="col-span-3"
                    placeholder="e.g. Electronics, Furniture, etc."
                    value={newSupplier.category}
                    onChange={(e) => setNewSupplier({...newSupplier, category: e.target.value})}
                    list="categories"
                  />
                  <datalist id="categories">
                    {supplierCategories.map((category) => (
                      <option key={category} value={category} />
                    ))}
                  </datalist>
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="supplier-notes" className="text-right">
                    Notes
                  </Label>
                  <Textarea
                    id="supplier-notes"
                    className="col-span-3"
                    placeholder="Additional information about the supplier..."
                    value={newSupplier.notes}
                    onChange={(e) => setNewSupplier({...newSupplier, notes: e.target.value})}
                  />
                </div>
              </div>
              
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button onClick={handleAddSupplier}>Save</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        
        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <div className="rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="min-w-[180px]">Name</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSuppliers.length > 0 ? (
                    filteredSuppliers.map((supplier) => (
                      <TableRow 
                        key={supplier.id} 
                        className={selectedSupplier === supplier.id ? "bg-accent" : ""}
                        onClick={() => setSelectedSupplier(supplier.id)}
                      >
                        <TableCell className="font-medium">{supplier.name}</TableCell>
                        <TableCell>{supplier.contact}</TableCell>
                        <TableCell>{supplier.category}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            {renderRating(supplier.rating)}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant="outline" 
                            className={supplier.status === 'Active' 
                              ? 'bg-green-500/10 text-green-500'
                              : 'bg-gray-500/10 text-gray-500'
                            }
                          >
                            {supplier.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Open menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem onClick={() => setSelectedSupplier(supplier.id)}>
                                View details
                              </DropdownMenuItem>
                              <DropdownMenuItem>Edit</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem 
                                className="text-red-500 focus:text-red-500"
                                onClick={() => handleDeleteSupplier(supplier.id)}
                              >
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="h-24 text-center">
                        No suppliers found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
          
          <div>
            {selectedSupplier ? (
              (() => {
                const supplier = getSupplierDetails(selectedSupplier);
                if (!supplier) return null;
                
                return (
                  <Card className="sticky top-24 transition-all hover:smooth-shadow">
                    <CardContent className="p-6">
                      <div className="flex flex-col gap-6">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-xl font-medium">{supplier.name}</h3>
                            <p className="text-muted-foreground">{supplier.category}</p>
                          </div>
                          <Badge 
                            variant="outline" 
                            className={supplier.status === 'Active' 
                              ? 'bg-green-500/10 text-green-500'
                              : 'bg-gray-500/10 text-gray-500'
                            }
                          >
                            {supplier.status}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center gap-1">
                          {renderRating(supplier.rating)}
                          <span className="text-sm text-muted-foreground ml-2">({supplier.rating}/5)</span>
                        </div>
                        
                        <div className="space-y-4">
                          <div className="flex items-start gap-3">
                            <div className="rounded-full bg-blue-500/10 p-2 mt-0.5">
                              <Mail className="h-4 w-4 text-blue-500" />
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Email</p>
                              <p>{supplier.email}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start gap-3">
                            <div className="rounded-full bg-green-500/10 p-2 mt-0.5">
                              <Phone className="h-4 w-4 text-green-500" />
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Phone</p>
                              <p>{supplier.phone}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start gap-3">
                            <div className="rounded-full bg-purple-500/10 p-2 mt-0.5">
                              <MapPin className="h-4 w-4 text-purple-500" />
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Address</p>
                              <p>{supplier.address}</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="pt-4 border-t">
                          <div className="flex justify-between items-center mb-2">
                            <p className="font-medium">Contact Person</p>
                          </div>
                          <p>{supplier.contact}</p>
                        </div>
                        
                        <div className="pt-4 border-t">
                          <div className="flex justify-between items-center mb-2">
                            <p className="font-medium">Products</p>
                            <span className="text-sm bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                              {supplier.products} items
                            </span>
                          </div>
                          <Button variant="outline" className="w-full">View Products</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })()
            ) : (
              <div className="h-full flex items-center justify-center border rounded-lg p-8 text-center bg-muted/30">
                <div>
                  <p className="text-muted-foreground">
                    Select a supplier to view details
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SuppliersPage;
