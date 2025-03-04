import React, { useState } from 'react';
import AnalyticsButton from './AnalyticsButton';
import AnalyticsLink from './AnalyticsLink';
import { useAnalytics } from '../hooks/useAnalytics';
import withAnalytics from '../hocs/withAnalytics';

// Exemplo de um componente personalizado
const CustomButton = ({ onClick, children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button 
    onClick={onClick} 
    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
    {...props}
  >
    {children}
  </button>
);

// Aplicando o HOC withAnalytics ao componente personalizado
const TrackedCustomButton = withAnalytics(CustomButton, {
  trackId: 'custom-button',
  component: 'AnalyticsExample',
  action: 'custom-click',
  trackMetadata: { custom: true }
});

/**
 * Componente de exemplo para demonstrar o uso do sistema de analytics
 */
const AnalyticsExample: React.FC = () => {
  const { trackButtonClick } = useAnalytics();
  const [clickCount, setClickCount] = useState(0);

  // Handler de clique manual
  const handleManualClick = () => {
    setClickCount(prev => prev + 1);
    trackButtonClick(
      'manual-track-button',
      'AnalyticsExample',
      'manual-click',
      { count: clickCount + 1 }
    );
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Exemplo de Rastreamento de Cliques</h2>
      
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold mb-2">1. Botão com Rastreamento Automático</h3>
          <AnalyticsButton
            trackId="example-button-1"
            component="AnalyticsExample"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            onClick={() => setClickCount(prev => prev + 1)}
          >
            Botão Rastreado ({clickCount} cliques)
          </AnalyticsButton>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">2. Link com Rastreamento Automático</h3>
          <AnalyticsLink
            to="/dashboard"
            trackId="example-link-1"
            component="AnalyticsExample"
            className="text-blue-600 hover:underline"
          >
            Ir para Dashboard
          </AnalyticsLink>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">3. Link Externo com Rastreamento</h3>
          <AnalyticsLink
            to="https://example.com"
            external
            trackId="example-external-link"
            component="AnalyticsExample"
            action="external-navigation"
            className="text-green-600 hover:underline"
          >
            Visitar Site Externo
          </AnalyticsLink>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">4. Rastreamento Manual</h3>
          <button
            onClick={handleManualClick}
            className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
          >
            Rastreamento Manual ({clickCount} cliques)
          </button>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">5. Componente com HOC de Rastreamento</h3>
          <TrackedCustomButton onClick={() => setClickCount(prev => prev + 1)}>
            Componente com HOC ({clickCount} cliques)
          </TrackedCustomButton>
        </div>
      </div>

      <div className="mt-6 p-4 bg-gray-100 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Como usar:</h3>
        <ol className="list-decimal pl-5 space-y-2">
          <li>Use <code className="bg-gray-200 px-1 rounded">AnalyticsButton</code> para botões com rastreamento automático</li>
          <li>Use <code className="bg-gray-200 px-1 rounded">AnalyticsLink</code> para links com rastreamento automático</li>
          <li>Use <code className="bg-gray-200 px-1 rounded">useAnalytics().trackButtonClick()</code> para rastreamento manual</li>
          <li>Use <code className="bg-gray-200 px-1 rounded">withAnalytics</code> para adicionar rastreamento a componentes existentes</li>
          <li>Adicione atributos <code className="bg-gray-200 px-1 rounded">data-track-id</code>, <code className="bg-gray-200 px-1 rounded">data-track-component</code> e <code className="bg-gray-200 px-1 rounded">data-track-action</code> a elementos HTML para rastreamento automático</li>
        </ol>
      </div>
    </div>
  );
};

export default AnalyticsExample;
