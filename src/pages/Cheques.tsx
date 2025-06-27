
import React, { useState } from 'react';
import DocumentFilters from '@/components/DocumentFilters';
import DocumentTable from '@/components/DocumentTable';
import DocumentScanner from '@/components/DocumentScanner';

const Cheques = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showScanner, setShowScanner] = useState(false);

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
    setShowScanner(true);
  };

  const handleDocumentCaptured = (file: File) => {
    console.log('Document captured:', file.name);
    setShowScanner(false);
    // Here you would typically upload the file or process it further
  };

  const handleViewDocument = (id: string) => {
    console.log('View cheque:', id);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
          Cheques
        </h1>
      </div>
      
      <DocumentFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onAddDocument={handleAddDocument}
      />

      <DocumentTable
        documents={filteredCheques}
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

export default Cheques;
