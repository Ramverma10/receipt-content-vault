
import React from 'react';
import { Outlet } from 'react-router-dom';
import DocumentSidebar from './DocumentSidebar';

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <DocumentSidebar />
      <main className="flex-1 p-6 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
