
import React, { useState } from 'react';
import DocumentFilters from '@/components/DocumentFilters';
import DocumentTable from '@/components/DocumentTable';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Receipt, FileText, CreditCard } from 'lucide-react';

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Sample data
  const documents = [
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
      date: '2025-06-26',
      vendor: 'Tech Solutions',
      category: 'Software',
      amount: 1200,
      status: 'Pending',
      type: 'receipt' as const,
    },
    {
      id: '3',
      date: '2025-06-25',
      vendor: 'Office Depot',
      category: 'Supplies',
      amount: 350,
      status: 'Completed',
      type: 'cheque' as const,
    },
  ];

  const filteredDocuments = documents.filter(doc =>
    doc.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = [
    {
      title: 'Total Receipts',
      value: documents.filter(d => d.type === 'receipt').length,
      icon: Receipt,
      color: 'text-blue-600',
    },
    {
      title: 'Total Invoices',
      value: documents.filter(d => d.type === 'invoice').length,
      icon: FileText,
      color: 'text-green-600',
    },
    {
      title: 'Total Cheques',
      value: documents.filter(d => d.type === 'cheque').length,
      icon: CreditCard,
      color: 'text-purple-600',
    },
  ];

  const handleAddDocument = () => {
    console.log('Add document clicked');
  };

  const handleViewDocument = (id: string) => {
    console.log('View document:', id);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <DocumentFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onAddDocument={handleAddDocument}
      />

      {/* Documents Table */}
      <DocumentTable
        documents={filteredDocuments}
        onViewDocument={handleViewDocument}
      />
    </div>
  );
};

export default Dashboard;
