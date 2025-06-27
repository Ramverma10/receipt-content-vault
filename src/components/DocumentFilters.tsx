
import React from 'react';
import { Button } from '@/components/ui/button';
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
    <div className="p-6 mb-6 rounded-2xl backdrop-blur-xl bg-white/30 dark:bg-slate-800/30 border border-white/40 dark:border-slate-700/50 shadow-xl animate-fade-in">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex flex-col md:flex-row gap-4 items-center flex-1">
          <div className="relative flex-1 max-w-md group">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4 transition-colors group-focus-within:text-blue-500" />
            <input
              type="text"
              placeholder="Search documents..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl backdrop-blur-sm bg-white/50 dark:bg-slate-700/50 border border-white/60 dark:border-slate-600/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400 text-slate-700 dark:text-slate-200 placeholder-slate-400 transition-all duration-300 focus:transform focus:scale-105"
            />
          </div>
          
          <div className="flex gap-3">
            <select className="px-4 py-3 rounded-xl backdrop-blur-sm bg-white/50 dark:bg-slate-700/50 border border-white/60 dark:border-slate-600/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400 text-slate-700 dark:text-slate-200 transition-all duration-300 hover:bg-white/60 dark:hover:bg-slate-700/60">
              <option value="">All Categories</option>
              <option value="office">Office Supplies</option>
              <option value="travel">Travel</option>
              <option value="meals">Meals</option>
            </select>
            
            <select className="px-4 py-3 rounded-xl backdrop-blur-sm bg-white/50 dark:bg-slate-700/50 border border-white/60 dark:border-slate-600/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400 text-slate-700 dark:text-slate-200 transition-all duration-300 hover:bg-white/60 dark:hover:bg-slate-700/60">
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>
        
        <Button 
          onClick={onAddDocument} 
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 backdrop-blur-sm"
        >
          <Plus className="h-4 w-4" />
          Add Document
        </Button>
      </div>
    </div>
  );
};

export default DocumentFilters;
