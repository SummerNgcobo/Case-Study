
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Search, Plus, Download } from 'lucide-react';

interface SalesFilterProps {
  search: string;
  setSearch: (value: string) => void;
  currentView: string;
  setCurrentView: (value: string) => void;
  onNewSaleClick: () => void;
}

const SalesFilter: React.FC<SalesFilterProps> = ({
  search,
  setSearch,
  currentView,
  setCurrentView,
  onNewSaleClick
}) => {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex gap-3 sm:w-full max-w-md">
        <div className="relative w-full">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search orders..."
            className="w-full pl-8 bg-background"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        
        <Select
          value={currentView}
          onValueChange={setCurrentView}
        >
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="All Orders" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Orders</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex gap-3">
        <Button variant="outline" className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Export
        </Button>
        
        <Button className="flex items-center gap-2" onClick={onNewSaleClick}>
          <Plus className="h-4 w-4" />
          New Sale
        </Button>
      </div>
    </div>
  );
};

export default SalesFilter;
