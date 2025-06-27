
import React, { useState } from 'react';
import { Camera, Upload } from 'lucide-react';
import DocumentFilters from '@/components/DocumentFilters';
import DocumentTable from '@/components/DocumentTable';
import DocumentScanner from '@/components/DocumentScanner';
import { Button } from '@/components/ui/button';

const Receipts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showScanner, setShowScanner] = useState(false);

  const receipts = [
    {
      id: '1',
      date: '2025-06-27',
      vendor: 'Coffee Shop',
      category: 'Meals',
      amount: 15.50,
      status: 'Active',
      type: 'receipt' as const,
    },
    {
      id: '2',
      date: '2025-06-26',
      vendor: 'Gas Station',
      category: 'Travel',
      amount: 45.00,
      status: 'Active',
      type: 'receipt' as const,
    },
  ];

  const filteredReceipts = receipts.filter(receipt =>
    receipt.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    receipt.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddDocument = () => {
    setShowScanner(true);
  };

  const handleDocumentCaptured = (file: File) => {
    console.log('Document captured:', file.name);
    setShowScanner(false);
    // Here you would typically upload the file or process it further
  };

  const handleViewDocument = (id: string) => {
    console.log('View receipt:', id);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
          Receipts
        </h1>
        
        {/* Quick Action Buttons */}
        <div className="flex gap-3">
          <Button
            onClick={() => setShowScanner(true)}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white border-0 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <Camera className="h-4 w-4" />
            Scan Document
          </Button>
          
          <Button
            onClick={() => document.getElementById('file-upload-receipts')?.click()}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <Upload className="h-4 w-4" />
            Upload Document
          </Button>
          
          <input
            id="file-upload-receipts"
            type="file"
            accept="image/*,.pdf"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                handleDocumentCaptured(file);
              }
            }}
            className="hidden"
          />
        </div>
      </div>
      
      <DocumentFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onAddDocument={handleAddDocument}
      />

      <DocumentTable
        documents={filteredReceipts}
        onViewDocument={handleViewDocument}
      />

      <DocumentScanner
        isOpen={showScanner}
        onClose={() => setShowScanner(false)}
        onDocumentCaptured={handleDocumentCaptured}
      />
    </div>
  );
};

export default Receipts;
