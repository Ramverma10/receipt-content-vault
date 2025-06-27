
import React, { useState } from 'react';
import DocumentFilters from '@/components/DocumentFilters';
import DocumentTable from '@/components/DocumentTable';

const Invoices = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const invoices = [
    {
      id: '1',
      date: '2025-06-27',
      vendor: 'Max Enterprises',
      category: 'Office Supplies',
      amount: 52510,
      status: 'Active',
      type: 'invoice' as const,
    },
    {
      id: '2',
      date: '2025-06-25',
      vendor: 'Tech Solutions',
      category: 'Software',
      amount: 2400,
      status: 'Pending',
      type: 'invoice' as const,
    },
  ];

  const filteredInvoices = invoices.filter(invoice =>
    invoice.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    invoice.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddDocument = () => {
    console.log('Add invoice clicked');
  };

  const handleViewDocument = (id: string) => {
    console.log('View invoice:', id);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Invoices</h1>
      
      <DocumentFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onAddDocument={handleAddDocument}
      />

      <DocumentTable
        documents={filteredInvoices}
        onViewDocument={handleViewDocument}
      />
    </div>
  );
};

export default Invoices;
