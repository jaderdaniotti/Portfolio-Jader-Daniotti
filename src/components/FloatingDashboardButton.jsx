import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LayoutDashboard } from 'lucide-react';

const FloatingDashboardButton = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Controlla se l'utente è admin
    const savedUser = localStorage.getItem('admin_user');
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        setIsAdmin(user.role === 'admin');
      } catch (error) {
        setIsAdmin(false);
      }
    }
  }, []);

  return (
    <Link
      to="/admin"
      className="fixed bottom-3 left-3 z-50 bg-scuro-2 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-105 group"
      title={isAdmin ? "Vai al pannello admin" : "Accedi al pannello admin"}
    >
      <LayoutDashboard className="w-6 h-6" />
      
      {/* Tooltip */}
      <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
        
        <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
      </div>
    </Link>
  );
};

export default FloatingDashboardButton;
