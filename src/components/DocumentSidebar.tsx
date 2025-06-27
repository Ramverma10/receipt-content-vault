
import React from 'react';
import { Receipt, FileText, CreditCard, Home, Settings, Moon, Sun } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';

const DocumentSidebar = () => {
  const { theme, toggleTheme } = useTheme();

  const menuItems = [
    { title: 'Dashboard', url: '/', icon: Home },
    { title: 'Receipts', url: '/receipts', icon: Receipt },
    { title: 'Invoices', url: '/invoices', icon: FileText },
    { title: 'Cheques', url: '/cheques', icon: CreditCard },
    { title: 'Settings', url: '/settings', icon: Settings },
  ];

  return (
    <div className="w-64 bg-slate-900 dark:bg-slate-800 text-white min-h-screen p-4">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-xl font-bold">DocumentHub</h1>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="text-white hover:bg-slate-700"
        >
          {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
        </Button>
      </div>
      
      <nav className="space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.title}
            to={item.url}
            className={({ isActive }) =>
              `flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                isActive 
                  ? 'bg-blue-600 text-white' 
                  : 'text-slate-300 hover:bg-slate-700 hover:text-white'
              }`
            }
          >
            <item.icon className="h-5 w-5" />
            <span>{item.title}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default DocumentSidebar;
