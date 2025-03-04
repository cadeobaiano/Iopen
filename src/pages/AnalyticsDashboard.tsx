import React, { useState, useEffect } from 'react';
import { supabase } from '../services/supabase';
import { useAuth } from '../contexts/AuthContext';
import { ArrowLeft, BarChart2, TrendingUp, UserCheck, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

// Interfaces para os tipos de dados de analytics
interface PageViewData {
  page: string;
  count: number;
  avg_time?: number;
}

interface ClickData {
  button_id: string;
  count: number;
}

interface EventData {
  event_name: string;
  category: string;
  count: number;
}

interface DateRange {
  start: Date;
  end: Date;
}

const AnalyticsDashboard: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [pageViews, setPageViews] = useState<PageViewData[]>([]);
  const [clicks, setClicks] = useState<ClickData[]>([]);
  const [events, setEvents] = useState<EventData[]>([]);
  const [totalVisitors, setTotalVisitors] = useState(0);
  const [activeTab, setActiveTab] = useState<'pageviews' | 'clicks' | 'events'>('pageviews');
  const [dateRange, setDateRange] = useState<DateRange>({
    start: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 dias atrás
    end: new Date()
  });

  // Carregar dados quando o componente for montado
  useEffect(() => {
    if (isAuthenticated) {
      fetchAnalyticsData();
    }
  }, [isAuthenticated, dateRange]);

  const fetchAnalyticsData = async () => {
    setIsLoading(true);
    try {
      // Formatar datas para a consulta
      const startDate = dateRange.start.toISOString();
      const endDate = dateRange.end.toISOString();

      // Buscar visualizações de página
      const { data: pageViewData, error: pageViewError } = await supabase
        .from('page_view_analytics')
        .select('page, created_at, time_on_page')
        .gte('created_at', startDate)
        .lte('created_at', endDate);

      if (pageViewError) throw pageViewError;

      // Processar dados de visualização de página
      const pageViewMap = new Map<string, { count: number, totalTime: number }>();
      pageViewData?.forEach(view => {
        const page = view.page;
        const currentData = pageViewMap.get(page) || { count: 0, totalTime: 0 };
        pageViewMap.set(page, {
          count: currentData.count + 1,
          totalTime: currentData.totalTime + (view.time_on_page || 0)
        });
      });

      const processedPageViews: PageViewData[] = Array.from(pageViewMap.entries()).map(([page, data]) => ({
        page,
        count: data.count,
        avg_time: data.count > 0 ? Math.round(data.totalTime / data.count) : 0
      })).sort((a, b) => b.count - a.count);

      setPageViews(processedPageViews);

      // Buscar cliques em botões
      const { data: clickData, error: clickError } = await supabase
        .from('click_analytics')
        .select('button_id, created_at')
        .gte('created_at', startDate)
        .lte('created_at', endDate);

      if (clickError) throw clickError;

      // Processar dados de cliques
      const clickMap = new Map<string, number>();
      clickData?.forEach(click => {
        const buttonId = click.button_id;
        clickMap.set(buttonId, (clickMap.get(buttonId) || 0) + 1);
      });

      const processedClicks: ClickData[] = Array.from(clickMap.entries()).map(([button_id, count]) => ({
        button_id,
        count
      })).sort((a, b) => b.count - a.count);

      setClicks(processedClicks);

      // Buscar eventos
      const { data: eventData, error: eventError } = await supabase
        .from('event_analytics')
        .select('event_name, category, created_at')
        .gte('created_at', startDate)
        .lte('created_at', endDate);

      if (eventError) throw eventError;

      // Processar dados de eventos
      const eventMap = new Map<string, { category: string, count: number }>();
      eventData?.forEach(event => {
        const eventName = event.event_name;
        const currentData = eventMap.get(eventName) || { category: event.category, count: 0 };
        eventMap.set(eventName, {
          category: event.category,
          count: currentData.count + 1
        });
      });

      const processedEvents: EventData[] = Array.from(eventMap.entries()).map(([event_name, data]) => ({
        event_name,
        category: data.category,
        count: data.count
      })).sort((a, b) => b.count - a.count);

      setEvents(processedEvents);

      // Calcular número total de visitantes únicos por session_id
      const { data: sessionData, error: sessionError } = await supabase
        .from('page_view_analytics')
        .select('session_id')
        .gte('created_at', startDate)
        .lte('created_at', endDate);

      if (sessionError) throw sessionError;

      const uniqueSessions = new Set(sessionData?.map(session => session.session_id));
      setTotalVisitors(uniqueSessions.size);

    } catch (error) {
      console.error('Erro ao buscar dados de analytics:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDateRangeChange = (period: 'day' | 'week' | 'month' | 'year') => {
    const end = new Date();
    let start: Date;

    switch (period) {
      case 'day':
        start = new Date(end);
        start.setDate(end.getDate() - 1);
        break;
      case 'week':
        start = new Date(end);
        start.setDate(end.getDate() - 7);
        break;
      case 'month':
        start = new Date(end);
        start.setMonth(end.getMonth() - 1);
        break;
      case 'year':
        start = new Date(end);
        start.setFullYear(end.getFullYear() - 1);
        break;
      default:
        start = new Date(end);
        start.setDate(end.getDate() - 7);
    }

    setDateRange({ start, end });
  };

  // Formatar data para exibição
  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  // Formatar segundos para tempo legível
  const formatTime = (seconds: number): string => {
    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center p-8 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Acesso Restrito</h1>
          <p className="text-gray-600 mb-6">Você precisa estar autenticado para acessar o painel de analytics.</p>
          <Link to="/login" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
            Fazer Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Link to="/" className="mr-4 text-gray-600 hover:text-gray-900">
                <ArrowLeft size={20} />
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Painel de Analytics</h1>
            </div>
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => handleDateRangeChange('day')}
                className={`px-3 py-1 text-sm rounded-md ${
                  dateRange.start.getTime() > Date.now() - 2 * 24 * 60 * 60 * 1000
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                1 Dia
              </button>
              <button 
                onClick={() => handleDateRangeChange('week')}
                className={`px-3 py-1 text-sm rounded-md ${
                  dateRange.start.getTime() > Date.now() - 8 * 24 * 60 * 60 * 1000 && 
                  dateRange.start.getTime() <= Date.now() - 2 * 24 * 60 * 60 * 1000
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                7 Dias
              </button>
              <button 
                onClick={() => handleDateRangeChange('month')}
                className={`px-3 py-1 text-sm rounded-md ${
                  dateRange.start.getTime() > Date.now() - 31 * 24 * 60 * 60 * 1000 &&
                  dateRange.start.getTime() <= Date.now() - 8 * 24 * 60 * 60 * 1000
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                30 Dias
              </button>
            </div>
          </div>
          <div className="mt-2 text-sm text-gray-600">
            Período: {formatDate(dateRange.start)} até {formatDate(dateRange.end)}
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <>
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-blue-100 text-blue-800 mr-4">
                    <BarChart2 size={24} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total de Páginas Vistas</p>
                    <p className="text-2xl font-semibold">{pageViews.reduce((sum, item) => sum + item.count, 0)}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-green-100 text-green-800 mr-4">
                    <UserCheck size={24} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Visitantes Únicos</p>
                    <p className="text-2xl font-semibold">{totalVisitors}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-yellow-100 text-yellow-800 mr-4">
                    <TrendingUp size={24} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total de Cliques</p>
                    <p className="text-2xl font-semibold">{clicks.reduce((sum, item) => sum + item.count, 0)}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-purple-100 text-purple-800 mr-4">
                    <Clock size={24} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Eventos Totais</p>
                    <p className="text-2xl font-semibold">{events.reduce((sum, item) => sum + item.count, 0)}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Tabs */}
            <div className="mb-6 border-b border-gray-200">
              <nav className="flex -mb-px">
                <button
                  onClick={() => setActiveTab('pageviews')}
                  className={`mr-8 py-4 text-sm font-medium ${
                    activeTab === 'pageviews'
                      ? 'border-b-2 border-blue-500 text-blue-600'
                      : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Visualizações de Página
                </button>
                <button
                  onClick={() => setActiveTab('clicks')}
                  className={`mr-8 py-4 text-sm font-medium ${
                    activeTab === 'clicks'
                      ? 'border-b-2 border-blue-500 text-blue-600'
                      : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Cliques
                </button>
                <button
                  onClick={() => setActiveTab('events')}
                  className={`py-4 text-sm font-medium ${
                    activeTab === 'events'
                      ? 'border-b-2 border-blue-500 text-blue-600'
                      : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Eventos
                </button>
              </nav>
            </div>
            
            {/* Tab Content */}
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              {activeTab === 'pageviews' && (
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Visualizações por Página</h3>
                  
                  {pageViews.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">Nenhum dado de visualização disponível para o período selecionado.</p>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Página
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Visualizações
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Tempo Médio
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {pageViews.map((view, index) => (
                            <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {view.page}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {view.count}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {view.avg_time ? formatTime(view.avg_time) : 'N/A'}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}
              
              {activeTab === 'clicks' && (
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Cliques por Botão</h3>
                  
                  {clicks.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">Nenhum dado de clique disponível para o período selecionado.</p>
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
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {clicks.map((click, index) => (
                            <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {click.button_id}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {click.count}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}
              
              {activeTab === 'events' && (
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Eventos por Tipo</h3>
                  
                  {events.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">Nenhum dado de evento disponível para o período selecionado.</p>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Nome do Evento
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Categoria
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Ocorrências
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {events.map((event, index) => (
                            <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {event.event_name}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {event.category}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {event.count}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default AnalyticsDashboard; 