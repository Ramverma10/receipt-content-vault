
import React from 'react';
import { Outlet } from 'react-router-dom';
import DocumentSidebar from './DocumentSidebar';

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <DocumentSidebar />
      <main className="flex-1 p-6 overflow-auto">
        <div className="animate-fade-in">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
