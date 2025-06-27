
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Search, Filter, Plus } from 'lucide-react';

interface DocumentFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onAddDocument: () => void;
}

const DocumentFilters: React.FC<DocumentFiltersProps> = ({
  searchTerm,
  onSearchChange,
  onAddDocument
}) => {
  return (
    <Card className="p-4 mb-6">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex flex-col md:flex-row gap-4 items-center flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search documents..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:border-slate-600 dark:text-white"
            />
          </div>
          
          <div className="flex gap-2">
            <select className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:border-slate-600 dark:text-white">
              <option value="">All Categories</option>
              <option value="office">Office Supplies</option>
              <option value="travel">Travel</option>
              <option value="meals">Meals</option>
            </select>
            
            <select className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:border-slate-600 dark:text-white">
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>
        
        <Button onClick={onAddDocument} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Document
        </Button>
      </div>
    </Card>
  );
};

export default DocumentFilters;
