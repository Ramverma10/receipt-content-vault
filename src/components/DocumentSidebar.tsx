
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
    <div className="w-64 min-h-screen p-4 backdrop-blur-xl bg-white/10 dark:bg-slate-900/30 border-r border-white/20 dark:border-slate-700/50">
      <div className="flex items-center justify-between mb-8 p-4 rounded-2xl bg-white/20 dark:bg-slate-800/30 backdrop-blur-sm border border-white/30 dark:border-slate-700/50">
        <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          DocumentHub
        </h1>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="text-slate-700 dark:text-slate-300 hover:bg-white/20 dark:hover:bg-slate-700/50 backdrop-blur-sm transition-all duration-300 hover:scale-110"
        >
          {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
        </Button>
      </div>
      
      <nav className="space-y-3">
        {menuItems.map((item, index) => (
          <NavLink
            key={item.title}
            to={item.url}
            className={({ isActive }) =>
              `flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 group backdrop-blur-sm border ${
                isActive 
                  ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-blue-400/30 text-blue-600 dark:text-blue-400 shadow-lg transform scale-105' 
                  : 'text-slate-600 dark:text-slate-400 hover:bg-white/20 dark:hover:bg-slate-800/30 hover:border-white/30 dark:hover:border-slate-700/50 border-transparent hover:transform hover:scale-105'
              }`
            }
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <item.icon className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
            <span className="font-medium">{item.title}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default DocumentSidebar;
