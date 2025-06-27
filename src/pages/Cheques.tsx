
import React, { useState } from 'react';
import DocumentFilters from '@/components/DocumentFilters';
import DocumentTable from '@/components/DocumentTable';

const Cheques = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const cheques = [
    {
      id: '1',
      date: '2025-06-25',
      vendor: 'Office Depot',
      category: 'Supplies',
      amount: 350,
      status: 'Completed',
      type: 'cheque' as const,
    },
    {
      id: '2',
      date: '2025-06-24',
      vendor: 'Bank Payment',
      category: 'Banking',
      amount: 1000,
      status: 'Pending',
      type: 'cheque' as const,
    },
  ];

  const filteredCheques = cheques.filter(cheque =>
    cheque.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cheque.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddDocument = () => {
    console.log('Add cheque clicked');
  };

  const handleViewDocument = (id: string) => {
    console.log('View cheque:', id);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Cheques</h1>
      
      <DocumentFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onAddDocument={handleAddDocument}
      />

      <DocumentTable
        documents={filteredCheques}
        onViewDocument={handleViewDocument}
      />
    </div>
  );
};

export default Cheques;
