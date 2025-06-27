
import React, { useState } from 'react';
import { Camera, Upload } from 'lucide-react';
import DocumentFilters from '@/components/DocumentFilters';
import DocumentTable from '@/components/DocumentTable';
import DocumentScanner from '@/components/DocumentScanner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Receipt, FileText, CreditCard, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showScanner, setShowScanner] = useState(false);

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
      gradient: 'from-blue-500 to-cyan-500',
      iconColor: 'text-blue-500',
    },
    {
      title: 'Total Invoices',
      value: documents.filter(d => d.type === 'invoice').length,
      icon: FileText,
      gradient: 'from-green-500 to-emerald-500',
      iconColor: 'text-green-500',
    },
    {
      title: 'Total Cheques',
      value: documents.filter(d => d.type === 'cheque').length,
      icon: CreditCard,
      gradient: 'from-purple-500 to-pink-500',
      iconColor: 'text-purple-500',
    },
  ];

  const handleAddDocument = () => {
    setShowScanner(true);
  };

  const handleDocumentCaptured = (file: File) => {
    console.log('Document captured:', file.name);
    setShowScanner(false);
    // Here you would typically upload the file or process it further
  };

  const handleViewDocument = (id: string) => {
    console.log('View document:', id);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div className="animate-fade-in">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 via-blue-600 to-purple-600 bg-clip-text text-transparent dark:from-slate-200 dark:via-blue-400 dark:to-purple-400">
            Dashboard
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">Welcome back! Here's what's happening with your documents.</p>
        </div>
        
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
            onClick={() => document.getElementById('file-upload-dashboard')?.click()}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <Upload className="h-4 w-4" />
            Upload Document
          </Button>
          
          <input
            id="file-upload-dashboard"
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

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <Card 
            key={index}
            className="backdrop-blur-xl bg-white/30 dark:bg-slate-800/30 border border-white/40 dark:border-slate-700/50 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 animate-fade-in"
            style={{ animationDelay: `${index * 150}ms` }}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-700 dark:text-slate-300">{stat.title}</CardTitle>
              <div className={`p-2 rounded-xl bg-gradient-to-r ${stat.gradient} shadow-lg`}>
                <stat.icon className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <div className="text-3xl font-bold text-slate-800 dark:text-slate-200">{stat.value}</div>
                <TrendingUp className="h-4 w-4 text-green-500" />
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                +2.5% from last month
              </p>
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

      <DocumentScanner
        isOpen={showScanner}
        onClose={() => setShowScanner(false)}
        onDocumentCaptured={handleDocumentCaptured}
      />
    </div>
  );
};

export default Dashboard;
