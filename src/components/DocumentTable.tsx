
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Eye, MoreHorizontal, Download } from 'lucide-react';

interface Document {
  id: string;
  date: string;
  vendor: string;
  category: string;
  amount: number;
  status: string;
  type: 'receipt' | 'invoice' | 'cheque';
}

interface DocumentTableProps {
  documents: Document[];
  onViewDocument: (id: string) => void;
}

const DocumentTable: React.FC<DocumentTableProps> = ({ documents, onViewDocument }) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
      case 'completed':
        return 'bg-gradient-to-r from-green-400/20 to-emerald-500/20 text-green-700 dark:text-green-400 border-green-400/30';
      case 'pending':
        return 'bg-gradient-to-r from-yellow-400/20 to-orange-500/20 text-yellow-700 dark:text-yellow-400 border-yellow-400/30';
      default:
        return 'bg-gradient-to-r from-gray-400/20 to-slate-500/20 text-gray-700 dark:text-gray-400 border-gray-400/30';
    }
  };

  return (
    <div className="rounded-2xl backdrop-blur-xl bg-white/30 dark:bg-slate-800/30 border border-white/40 dark:border-slate-700/50 shadow-xl overflow-hidden animate-fade-in">
      <Table>
        <TableHeader>
          <TableRow className="border-white/20 dark:border-slate-700/50 hover:bg-white/10 dark:hover:bg-slate-700/20">
            <TableHead className="text-slate-700 dark:text-slate-300 font-semibold">Date</TableHead>
            <TableHead className="text-slate-700 dark:text-slate-300 font-semibold">Vendor</TableHead>
            <TableHead className="text-slate-700 dark:text-slate-300 font-semibold">Category</TableHead>
            <TableHead className="text-slate-700 dark:text-slate-300 font-semibold">Amount</TableHead>
            <TableHead className="text-slate-700 dark:text-slate-300 font-semibold">Status</TableHead>
            <TableHead className="text-slate-700 dark:text-slate-300 font-semibold">Type</TableHead>
            <TableHead className="w-[100px] text-slate-700 dark:text-slate-300 font-semibold">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {documents.map((doc, index) => (
            <TableRow 
              key={doc.id} 
              className="border-white/20 dark:border-slate-700/50 hover:bg-white/20 dark:hover:bg-slate-700/20 transition-all duration-300 hover:transform hover:scale-[1.02]"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <TableCell className="font-medium text-slate-700 dark:text-slate-300">{doc.date}</TableCell>
              <TableCell className="text-slate-600 dark:text-slate-400">{doc.vendor}</TableCell>
              <TableCell className="text-slate-600 dark:text-slate-400">{doc.category}</TableCell>
              <TableCell className="font-semibold text-slate-700 dark:text-slate-300">${doc.amount.toLocaleString()}</TableCell>
              <TableCell>
                <span className={`px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm border ${getStatusColor(doc.status)} transition-all duration-300 hover:scale-105`}>
                  {doc.status}
                </span>
              </TableCell>
              <TableCell className="capitalize text-slate-600 dark:text-slate-400 font-medium">{doc.type}</TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onViewDocument(doc.id)}
                    className="hover:bg-blue-500/20 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 hover:scale-110 backdrop-blur-sm"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="hover:bg-green-500/20 hover:text-green-600 dark:hover:text-green-400 transition-all duration-300 hover:scale-110 backdrop-blur-sm"
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="hover:bg-purple-500/20 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-300 hover:scale-110 backdrop-blur-sm"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default DocumentTable;
