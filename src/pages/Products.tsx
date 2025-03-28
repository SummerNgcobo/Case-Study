
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
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
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, Filter, MoreHorizontal, ArrowUpDown } from 'lucide-react';

// Sample product data
const initialProducts = [
  { 
    id: 1, 
    name: 'Wireless Headphones', 
    category: 'Electronics', 
    price: 99.99, 
    stock: 45,
    status: 'In Stock',
    sku: 'WH-001',
    supplier: 'TechGadgets Inc.'
  },
  { 
    id: 2, 
    name: 'Smart Watch', 
    category: 'Electronics', 
    price: 199.99, 
    stock: 28,
    status: 'In Stock',
    sku: 'SW-002',
    supplier: 'SmartTech Co.'
  },
  { 
    id: 3, 
    name: 'Bluetooth Speaker', 
    category: 'Electronics', 
    price: 79.99, 
    stock: 32,
    status: 'In Stock',
    sku: 'BS-003',
    supplier: 'AudioMax Ltd.'
  },
  { 
    id: 4, 
    name: 'Laptop Bag', 
    category: 'Accessories', 
    price: 49.99, 
    stock: 18,
    status: 'Low Stock',
    sku: 'LB-004',
    supplier: 'BagMasters Inc.'
  },
  { 
    id: 5, 
    name: 'Phone Charger', 
    category: 'Electronics', 
    price: 19.99, 
    stock: 50,
    status: 'In Stock',
    sku: 'PC-005',
    supplier: 'PowerUp Inc.'
  },
  { 
    id: 6, 
    name: 'Desk Lamp', 
    category: 'Home', 
    price: 39.99, 
    stock: 5,
    status: 'Low Stock',
    sku: 'DL-006',
    supplier: 'LightWorks Co.'
  },
  { 
    id: 7, 
    name: 'Notebook Set', 
    category: 'Stationery', 
    price: 12.99, 
    stock: 65,
    status: 'In Stock',
    sku: 'NS-007',
    supplier: 'PaperCraft Ltd.'
  },
  { 
    id: 8, 
    name: 'Coffee Mug', 
    category: 'Home', 
    price: 9.99, 
    stock: 0,
    status: 'Out of Stock',
    sku: 'CM-008',
    supplier: 'HomeGoods Inc.'
  },
  { 
    id: 9, 
    name: 'Wireless Mouse', 
    category: 'Electronics', 
    price: 29.99, 
    stock: 37,
    status: 'In Stock',
    sku: 'WM-009',
    supplier: 'TechGadgets Inc.'
  },
  { 
    id: 10, 
    name: 'Portable SSD', 
    category: 'Electronics', 
    price: 129.99, 
    stock: 12,
    status: 'Low Stock',
    sku: 'PS-010',
    supplier: 'DataStore Ltd.'
  },
];

const Categories = [
  'All Categories',
  'Electronics',
  'Accessories',
  'Home',
  'Stationery'
];

const ProductsPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState(initialProducts);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: '',
    price: '',
    stock: '',
    sku: '',
    supplier: ''
  });
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: 'ascending' | 'descending';
  } | null>(null);
  
  // Filtering and searching logic
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase()) ||
                         product.sku.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'All Categories' || product.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  // Sorting logic
  const sortedProducts = React.useMemo(() => {
    const sortableProducts = [...filteredProducts];
    if (sortConfig !== null) {
      sortableProducts.sort((a, b) => {
        if (a[sortConfig.key as keyof typeof a] < b[sortConfig.key as keyof typeof b]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key as keyof typeof a] > b[sortConfig.key as keyof typeof b]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableProducts;
  }, [filteredProducts, sortConfig]);
  
  const requestSort = (key: string) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };
  
  const handleAddProduct = () => {
    const productId = products.length + 1;
    const status = Number(newProduct.stock) <= 10 ? 'Low Stock' : 
                 Number(newProduct.stock) === 0 ? 'Out of Stock' : 'In Stock';
    
    const product = {
      id: productId,
      name: newProduct.name,
      category: newProduct.category,
      price: Number(newProduct.price),
      stock: Number(newProduct.stock),
      status,
      sku: newProduct.sku,
      supplier: newProduct.supplier
    };
    
    setProducts([...products, product]);
    setNewProduct({
      name: '',
      category: '',
      price: '',
      stock: '',
      sku: '',
      supplier: ''
    });
  };
  
  const handleDeleteProduct = (id: number) => {
    setProducts(products.filter(product => product.id !== id));
  };
  
  // Function to get the status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Stock':
        return 'bg-green-500/10 text-green-500';
      case 'Low Stock':
        return 'bg-amber-500/10 text-amber-500';
      case 'Out of Stock':
        return 'bg-red-500/10 text-red-500';
      default:
        return 'bg-gray-500/10 text-gray-500';
    }
  };
  
  return (
    <Layout className="animate-fade-in">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h1 className="font-light">Products</h1>
          <p className="text-muted-foreground">Manage your inventory products.</p>
        </div>
        
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-3 sm:w-full max-w-md">
            <div className="relative w-full">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search products..."
                className="w-full pl-8 bg-background"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Category</DropdownMenuLabel>
                {Categories.map((category) => (
                  <DropdownMenuItem 
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={category === selectedCategory ? "bg-accent" : ""}
                  >
                    {category}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          <div className="flex gap-3">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Add Product
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Product</DialogTitle>
                  <DialogDescription>
                    Enter the details for the new product.
                  </DialogDescription>
                </DialogHeader>
                
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="product-name" className="text-right">
                      Name
                    </Label>
                    <Input
                      id="product-name"
                      className="col-span-3"
                      value={newProduct.name}
                      onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                    />
                  </div>
                  
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="product-category" className="text-right">
                      Category
                    </Label>
                    <Select
                      onValueChange={(value) => setNewProduct({...newProduct, category: value})}
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {Categories.filter(cat => cat !== 'All Categories').map(category => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="product-price" className="text-right">
                      Price (R)
                    </Label>
                    <Input
                      id="product-price"
                      type="number"
                      className="col-span-3"
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                    />
                  </div>
                  
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="product-stock" className="text-right">
                      Stock
                    </Label>
                    <Input
                      id="product-stock"
                      type="number"
                      className="col-span-3"
                      value={newProduct.stock}
                      onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})}
                    />
                  </div>
                  
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="product-sku" className="text-right">
                      SKU
                    </Label>
                    <Input
                      id="product-sku"
                      className="col-span-3"
                      value={newProduct.sku}
                      onChange={(e) => setNewProduct({...newProduct, sku: e.target.value})}
                    />
                  </div>
                  
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="product-supplier" className="text-right">
                      Supplier
                    </Label>
                    <Input
                      id="product-supplier"
                      className="col-span-3"
                      value={newProduct.supplier}
                      onChange={(e) => setNewProduct({...newProduct, supplier: e.target.value})}
                    />
                  </div>
                </div>
                
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <DialogClose asChild>
                    <Button onClick={handleAddProduct}>Save</Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        
        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">
                  <div 
                    className="flex items-center gap-1 cursor-pointer" 
                    onClick={() => requestSort('sku')}
                  >
                    SKU
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </TableHead>
                <TableHead className="min-w-[150px]">
                  <div 
                    className="flex items-center gap-1 cursor-pointer" 
                    onClick={() => requestSort('name')}
                  >
                    Name
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </TableHead>
                <TableHead>Category</TableHead>
                <TableHead>
                  <div 
                    className="flex items-center gap-1 cursor-pointer" 
                    onClick={() => requestSort('price')}
                  >
                    Price
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </TableHead>
                <TableHead>
                  <div 
                    className="flex items-center gap-1 cursor-pointer" 
                    onClick={() => requestSort('stock')}
                  >
                    Stock
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Supplier</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedProducts.length > 0 ? (
                sortedProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">{product.sku}</TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>R{product.price.toFixed(2)}</TableCell>
                    <TableCell>{product.stock}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getStatusColor(product.status)}>
                        {product.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{product.supplier}</TableCell>
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
                          <DropdownMenuItem 
                            onClick={() => navigate(`/products/${product.id}`)}
                          >
                            View details
                          </DropdownMenuItem>
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            className="text-red-500 focus:text-red-500"
                            onClick={() => handleDeleteProduct(product.id)}
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
                  <TableCell colSpan={8} className="h-24 text-center">
                    No products found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </Layout>
  );
};

export default ProductsPage;
