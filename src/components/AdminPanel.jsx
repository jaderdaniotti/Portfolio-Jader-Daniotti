import React from 'react';
import TabbedDashboard from './TabbedDashboard';

const AdminPanel = ({ onLogout }) => {
  return <TabbedDashboard onLogout={onLogout} />;
};

export default AdminPanel;