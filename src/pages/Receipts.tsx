
import React, { useState } from 'react';
import DocumentFilters from '@/components/DocumentFilters';
import DocumentTable from '@/components/DocumentTable';

const Receipts = () => {
  const [searchTerm, setSearchTerm] = useState('');

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
    console.log('Add receipt clicked');
  };

  const handleViewDocument = (id: string) => {
    console.log('View receipt:', id);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Receipts</h1>
      
      <DocumentFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onAddDocument={handleAddDocument}
      />

      <DocumentTable
        documents={filteredReceipts}
        onViewDocument={handleViewDocument}
      />
    </div>
  );
};

export default Receipts;
