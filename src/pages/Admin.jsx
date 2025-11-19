import React, { useState, useEffect } from 'react';
import Login from '../components/Login';
import AdminPanel from '../components/AdminPanel';
import GlobalLoader from '../components/GlobalLoader';

const Admin = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Controlla se c'è un utente salvato nel localStorage
    const savedUser = localStorage.getItem('admin_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Errore nel parsing dell\'utente salvato:', error);
        localStorage.removeItem('admin_user');
      }
    }
    setLoading(false);
  }, []);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <GlobalLoader/>
      </div>
    );
  }

  return (
    <div>
      {user ? (
        <AdminPanel user={user} onLogout={handleLogout} />
      ) : (
        <Login onLoginSuccess={handleLoginSuccess} />
      )}
    </div>
  );
};

export default Admin;
