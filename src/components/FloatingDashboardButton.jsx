import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard } from 'lucide-react';

const FloatingDashboardButton = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const location = useLocation();

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

  // Nasconde il pulsante sulla rotta /admin
  if (location.pathname === '/admin') {
    return null;
  }

  return (
    <Link
      to="/admin"
      className="fixed bottom-3 left-3 z-50 bg-scuro-2 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-105 group"
      title={isAdmin ? "Vai al pannello admin" : "Accedi al pannello admin"}
    >
      <LayoutDashboard className="w-6 h-6" />

    </Link>
  );
};

export default FloatingDashboardButton;
