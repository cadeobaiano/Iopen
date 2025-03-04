import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AnalyticsExample from '../components/AnalyticsExample';
import AnalyticsButton from '../components/AnalyticsButton';

interface ClickAnalytics {
  id: string;
  button_id: string;
  page: string;
  component?: string;
  action: string;
  created_at: string;
  user_id?: string;
  metadata?: Record<string, any>;
}

const DashboardPage: React.FC = () => {
  const [clickData, setClickData] = useState<ClickAnalytics[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showExample, setShowExample] = useState(false);

  // Buscar dados de analytics
  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('click_analytics')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(50);

        if (error) {
          throw error;
        }

        setClickData(data || []);
      } catch (err) {
        console.error('Erro ao buscar dados de analytics:', err);
        setError('Não foi possível carregar os dados de analytics');
      } finally {
        setLoading(false);
      }
    };

    fetchAnalyticsData();
  }, []);

  // Agrupar cliques por botão
  const clicksByButton = clickData.reduce((acc, click) => {
    const buttonId = click.button_id;
    if (!acc[buttonId]) {
      acc[buttonId] = [];
    }
    acc[buttonId].push(click);
    return acc;
  }, {} as Record<string, ClickAnalytics[]>);

  // Calcular estatísticas
  const buttonStats = Object.entries(clicksByButton).map(([buttonId, clicks]) => ({
    buttonId,
    count: clicks.length,
    lastClicked: new Date(clicks[0].created_at).toLocaleString(),
    pages: [...new Set(clicks.map(c => c.page))],
    users: [...new Set(clicks.filter(c => c.user_id).map(c => c.user_id))]
  }));

  // Ordenar por contagem (mais clicados primeiro)
  buttonStats.sort((a, b) => b.count - a.count);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Dashboard de Analytics</h1>
          <AnalyticsButton
            trackId="toggle-example"
            component="DashboardPage"
            action="toggle-example"
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            onClick={() => setShowExample(!showExample)}
          >
            {showExample ? 'Ocultar Exemplo' : 'Mostrar Exemplo'}
          </AnalyticsButton>
        </div>

        {showExample && (
          <div className="mb-8">
            <AnalyticsExample />
          </div>
        )}

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4">Estatísticas de Cliques por Botão</h2>
          
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
          ) : error ? (
            <div className="text-red-500 p-4 bg-red-50 rounded-md">{error}</div>
          ) : buttonStats.length === 0 ? (
            <div className="text-gray-500 p-4 bg-gray-50 rounded-md">
              Nenhum dado de clique registrado ainda. Use os componentes de exemplo para gerar dados.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID do Botão
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Cliques
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Último Clique
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Páginas
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Usuários Únicos
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {buttonStats.map((stat) => (
                    <tr key={stat.buttonId} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {stat.buttonId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {stat.count}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {stat.lastClicked}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {stat.pages.join(', ')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {stat.users.length}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DashboardPage;
