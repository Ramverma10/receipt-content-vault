
import React, { useState } from 'react';
import DocumentFilters from '@/components/DocumentFilters';
import DocumentTable from '@/components/DocumentTable';
import DocumentScanner from '@/components/DocumentScanner';

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
