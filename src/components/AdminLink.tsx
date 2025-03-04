import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ChartBar } from 'lucide-react';

/**
 * Componente que renderiza um link para o painel administrativo (analytics dashboard)
 * apenas para usuários autenticados
 */
const AdminLink: React.FC = () => {
  const { isAuthenticated, user } = useAuth();

  // Não renderiza o componente se o usuário não estiver autenticado
  if (!isAuthenticated) {
    return null;
  }

  return (
    <Link
      to="/analytics-dashboard"
      data-track-id="admin-dashboard-link"
      className="flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-md text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors"
      title="Painel de Analytics"
    >
      <ChartBar size={16} />
      <span className="sm:inline">Analytics</span>
    </Link>
  );
};

export default AdminLink; 