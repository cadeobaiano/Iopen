import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import TrackableLink from './TrackableLink';

// Format currency in Brazilian Real
const formatCurrency = (value: number): string => {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
};

// Calculate investment results based on the refined calculation logic
const calculateInvestmentResults = (totalInvestment: number, years: number): { 
  traditionalValue: number, 
  iopenValue: number,
  differenceValue: number, 
  differencePercentage: number 
} => {
  // Fixed parameters
  const affectedProportion = 0.8540;      // Proportion of portfolio affected by performance difference
  const iopenReturnRate = 0.1022;         // Annual effective rate for Iopen (10.22%)
  const traditionalReturnRate = 0.0618;   // Annual effective rate for traditional funds (6.18%)
  
  // Calculate accumulation factors
  const iopenFactor = Math.pow(1 + iopenReturnRate, years);
  const traditionalFactor = Math.pow(1 + traditionalReturnRate, years);
  
  // Calculate final values
  const iopenValue = totalInvestment * (affectedProportion * iopenFactor + (1 - affectedProportion));
  const traditionalValue = totalInvestment * (affectedProportion * traditionalFactor + (1 - affectedProportion));
  
  // Calculate difference
  const differenceValue = iopenValue - traditionalValue;
  const differencePercentage = (differenceValue / totalInvestment) * 100;
  
  return { 
    traditionalValue, 
    iopenValue, 
    differenceValue, 
    differencePercentage 
  };
};

const FinancialCalculator: React.FC = () => {
  const [investmentAmount, setInvestmentAmount] = useState<number>(10000);
  const [sliderValue, setSliderValue] = useState<number>(10000);
  const [results, setResults] = useState<{
    [key: number]: { 
      traditionalValue: number, 
      iopenValue: number, 
      differenceValue: number, 
      differencePercentage: number 
    }
  }>({
    1: { traditionalValue: 0, iopenValue: 0, differenceValue: 0, differencePercentage: 0 },
    5: { traditionalValue: 0, iopenValue: 0, differenceValue: 0, differencePercentage: 0 },
    10: { traditionalValue: 0, iopenValue: 0, differenceValue: 0, differencePercentage: 0 }
  });
  
  const sliderRef = useRef<HTMLInputElement>(null);
  const minSliderValue = 10000;  // Começando com 10.000 (base 0)
  const maxSliderValue = 1000000;
  const stepSize = 10000; // Step size of 10,000

  // Calculate results for all periods whenever investment amount changes
  useEffect(() => {
    const periods = [1, 5, 10];
    const newResults: {
      [key: number]: { 
        traditionalValue: number, 
        iopenValue: number, 
        differenceValue: number, 
        differencePercentage: number 
      }
    } = {};
    
    periods.forEach(period => {
      const result = calculateInvestmentResults(investmentAmount, period);
      newResults[period] = result;
    });
    
    setResults(newResults);
  }, [investmentAmount]);

  // Update slider background gradient
  useEffect(() => {
    if (sliderRef.current) {
      const percentage = ((sliderValue - minSliderValue) / (maxSliderValue - minSliderValue)) * 100;
      sliderRef.current.style.background = `linear-gradient(to right, #06b6d4 0%, #06b6d4 ${percentage}%, #E5E7EB ${percentage}%, #E5E7EB 100%)`;
    }
  }, [sliderValue]);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setSliderValue(value);
    setInvestmentAmount(value);
  };

  // Generate tick marks for the slider
  const generateTickMarks = () => {
    const tickMarks = [];
    const numTicks = 10; // Number of visible tick marks (excluding min and max)
    const tickInterval = (maxSliderValue - minSliderValue) / (numTicks + 1);
    
    for (let i = 1; i <= numTicks; i++) {
      const tickValue = minSliderValue + (tickInterval * i);
      const percentage = ((tickValue - minSliderValue) / (maxSliderValue - minSliderValue)) * 100;
      
      tickMarks.push(
        <div 
          key={i} 
          className="absolute h-3 w-1 bg-gray-300" 
          style={{ 
            left: `${percentage}%`, 
            top: '50%', 
            transform: 'translateY(-50%)',
          }}
        />
      );
    }
    
    return tickMarks;
  };

  // Format the slider value labels
  const formatSliderLabel = (value: number): string => {
    if (value >= 1000000) {
      return `R$ ${(value / 1000000).toLocaleString('pt-BR')} milhões`;
    } else if (value >= 1000) {
      return `R$ ${(value / 1000).toLocaleString('pt-BR')} mil`;
    }
    return `R$ ${value.toLocaleString('pt-BR')}`;
  };

  const [focusedYear, setFocusedYear] = useState<number | null>(null);

  return (
    <section className="bg-white py-6 sm:py-12 md:py-16 px-3 sm:px-6 md:px-8 w-full overflow-x-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="mb-4 sm:mb-10 text-center">
          <h2 className="text-xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-4 bg-gradient-to-r from-cyan-600 to-blue-700 bg-clip-text text-transparent inline-block">
            Simulador de Investimentos
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
            Veja o quanto a Iopen pode fazer a diferença na sua vida financeira
          </p>
          <div className="mt-2 sm:mt-3 inline-block bg-orange-50 text-orange-800 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm border border-orange-200">
            <span className="font-medium">Mais de 40% de rendimento adicional</span> em comparação a métodos tradicionais
          </div>
        </div>

        <div className="bg-white p-3 sm:p-6 md:p-8 rounded-xl shadow-xl max-w-5xl mx-auto border border-gray-200">
          {/* Título explicativo */}
          <div className="bg-gradient-to-r from-cyan-600 to-blue-700 text-white p-3 sm:p-4 -mt-3 sm:-mt-4 -mx-3 sm:-mx-6 md:-mx-8 mb-4 sm:mb-6 rounded-t-xl">
            <p className="text-center font-medium text-sm sm:text-base">
              Descubra quanto dinheiro você está <span className="font-bold underline">perdendo</span> com investimentos tradicionais
            </p>
          </div>
          
          {/* Slider Section */}
          <div className="mb-4 sm:mb-10 md:mb-12">
            <div className="text-center mb-2 sm:mb-5">
              <span className="text-xl sm:text-2xl md:text-4xl font-bold text-gradient-primary bg-gradient-to-r from-cyan-600 to-blue-700 bg-clip-text text-transparent">
                {formatCurrency(investmentAmount)}
              </span>
            </div>
            
            <div className="relative mb-3 sm:mb-6 px-2">
              <input
                ref={sliderRef}
                type="range"
                min={minSliderValue}
                max={maxSliderValue}
                step={stepSize}
                value={sliderValue}
                onChange={handleSliderChange}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer touch-highlight-none"
                style={{
                  height: '8px',
                  borderRadius: '4px',
                  outline: 'none',
                  WebkitAppearance: 'none',
                  appearance: 'none',
                }}
                data-track-id="investment-slider"
              />
              {/* Tick marks container */}
              <div className="absolute w-full h-8 top-0 pointer-events-none">
                {generateTickMarks()}
              </div>
              <style>{`
                input[type=range]::-webkit-slider-thumb {
                  -webkit-appearance: none;
                  appearance: none;
                  width: 24px;
                  height: 24px;
                  border-radius: 50%;
                  background: linear-gradient(135deg, #0891b2, #1e40af);
                  cursor: pointer;
                  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
                  border: 2px solid white;
                  touch-action: manipulation;
                }
                
                input[type=range]::-moz-range-thumb {
                  width: 24px;
                  height: 24px;
                  border-radius: 50%;
                  background: linear-gradient(135deg, #0891b2, #1e40af);
                  cursor: pointer;
                  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
                  border: 2px solid white;
                  touch-action: manipulation;
                }
              `}</style>
            </div>
            
            <div className="flex justify-between text-xs sm:text-sm text-gray-500 mb-4 sm:mb-6 px-2">
              <span>{formatSliderLabel(minSliderValue)}</span>
              <span>{formatSliderLabel(maxSliderValue)}</span>
            </div>
            
            <div className="text-center mb-4 sm:mb-6">
              <p className="text-gray-600 text-sm sm:text-base mb-1 sm:mb-2">Selecione o valor aproximado do seu patrimônio investido</p>
            </div>
            
            {/* Resultados */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              {/* 1 Ano */}
              <div 
                className={`rounded-xl p-3 sm:p-6 ${
                  focusedYear === 1 
                    ? 'transform scale-105 transition-transform duration-300 shadow-lg border-2 border-cyan-500' 
                    : 'border border-gray-200 shadow'
                }`}
                onMouseEnter={() => setFocusedYear(1)}
                onMouseLeave={() => setFocusedYear(null)}
                data-track-id="investment-result-1year"
              >
                <div className="text-center mb-3 sm:mb-4">
                  <p className="text-gray-500 font-medium text-sm sm:text-base mb-1">Em 1 ano</p>
                  <div className="text-gradient-primary bg-gradient-to-r from-cyan-600 to-blue-700 bg-clip-text text-transparent font-bold text-xl sm:text-2xl mb-1">
                    {formatCurrency(results[1].iopenValue)}
                  </div>
                  <div className="flex items-center justify-center gap-2 text-xs sm:text-sm mt-1">
                    <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full text-xs">
                      Iopen
                    </span>
                    <span className="text-gray-400">vs</span>
                    <span className="bg-red-50 text-red-600 px-2 py-0.5 rounded-full text-xs">
                      <span className="font-medium">Tradicional:</span> {formatCurrency(results[1].traditionalValue)}
                    </span>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-green-50 to-cyan-50 p-3 rounded-lg border-l-4 border-green-500">
                  <div className="flex items-center justify-between">
                    <p className="text-xs sm:text-sm text-gray-600">Diferença</p>
                    <p className="font-bold text-sm sm:text-base text-green-600">
                      +{formatCurrency(results[1].differenceValue)}
                    </p>
                  </div>
                  <div className="mt-1 w-full bg-gray-200 rounded-full h-1.5">
                    <div 
                      className="h-1.5 rounded-full bg-gradient-to-r from-green-400 to-cyan-500"
                      style={{ width: `${Math.min(100, results[1].differencePercentage * 2)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              
              {/* 5 Anos */}
              <div 
                className={`rounded-xl p-3 sm:p-6 ${
                  focusedYear === 5 
                    ? 'transform scale-105 transition-transform duration-300 shadow-lg border-2 border-cyan-500' 
                    : 'border border-gray-200 shadow'
                }`}
                onMouseEnter={() => setFocusedYear(5)}
                onMouseLeave={() => setFocusedYear(null)}
                data-track-id="investment-result-5years"
              >
                <div className="text-center mb-3 sm:mb-4">
                  <p className="text-gray-500 font-medium text-sm sm:text-base mb-1">Em 5 anos</p>
                  <div className="text-gradient-primary bg-gradient-to-r from-cyan-600 to-blue-700 bg-clip-text text-transparent font-bold text-xl sm:text-2xl mb-1">
                    {formatCurrency(results[5].iopenValue)}
                  </div>
                  <div className="flex items-center justify-center gap-2 text-xs sm:text-sm mt-1">
                    <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full text-xs">
                      Iopen
                    </span>
                    <span className="text-gray-400">vs</span>
                    <span className="bg-red-50 text-red-600 px-2 py-0.5 rounded-full text-xs">
                      <span className="font-medium">Tradicional:</span> {formatCurrency(results[5].traditionalValue)}
                    </span>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-green-50 to-cyan-50 p-3 rounded-lg border-l-4 border-green-500">
                  <div className="flex items-center justify-between">
                    <p className="text-xs sm:text-sm text-gray-600">Diferença</p>
                    <p className="font-bold text-sm sm:text-base text-green-600">
                      +{formatCurrency(results[5].differenceValue)}
                    </p>
                  </div>
                  <div className="mt-1 w-full bg-gray-200 rounded-full h-1.5">
                    <div 
                      className="h-1.5 rounded-full bg-gradient-to-r from-green-400 to-cyan-500"
                      style={{ width: `${Math.min(100, results[5].differencePercentage * 0.5)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              
              {/* 10 Anos */}
              <div 
                className={`rounded-xl p-3 sm:p-6 ${
                  focusedYear === 10 
                    ? 'transform scale-105 transition-transform duration-300 shadow-lg border-2 border-cyan-500' 
                    : 'border border-gray-200 shadow'
                }`}
                onMouseEnter={() => setFocusedYear(10)}
                onMouseLeave={() => setFocusedYear(null)}
                data-track-id="investment-result-10years"
              >
                <div className="text-center mb-3 sm:mb-4">
                  <p className="text-gray-500 font-medium text-sm sm:text-base mb-1">Em 10 anos</p>
                  <div className="text-gradient-primary bg-gradient-to-r from-cyan-600 to-blue-700 bg-clip-text text-transparent font-bold text-xl sm:text-2xl mb-1">
                    {formatCurrency(results[10].iopenValue)}
                  </div>
                  <div className="flex items-center justify-center gap-2 text-xs sm:text-sm mt-1">
                    <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full text-xs">
                      Iopen
                    </span>
                    <span className="text-gray-400">vs</span>
                    <span className="bg-red-50 text-red-600 px-2 py-0.5 rounded-full text-xs">
                      <span className="font-medium">Tradicional:</span> {formatCurrency(results[10].traditionalValue)}
                    </span>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-green-50 to-cyan-50 p-3 rounded-lg border-l-4 border-green-500">
                  <div className="flex items-center justify-between">
                    <p className="text-xs sm:text-sm text-gray-600">Diferença</p>
                    <p className="font-bold text-sm sm:text-base text-green-600">
                      +{formatCurrency(results[10].differenceValue)}
                    </p>
                  </div>
                  <div className="mt-1 w-full bg-gray-200 rounded-full h-1.5">
                    <div 
                      className="h-1.5 rounded-full bg-gradient-to-r from-green-400 to-cyan-500"
                      style={{ width: `${Math.min(100, results[10].differencePercentage * 0.25)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 sm:mt-8 mb-3 sm:mb-4">
              <div className="flex flex-col md:flex-row items-center md:justify-between border border-blue-100 p-3 sm:p-4 rounded-lg bg-blue-50">
                <div className="mb-3 md:mb-0 md:mr-4 text-center md:text-left">
                  <p className="text-blue-800 font-medium text-sm sm:text-base">
                    O impacto das taxas aumenta com o tempo de investimento
                  </p>
                  <p className="text-xs sm:text-sm text-blue-700 mt-1">
                    Investimentos de longo prazo merecem uma estratégia eficiente
                  </p>
                </div>
                <TrackableLink 
                  to="/login-triagem" 
                  trackId="calculator-info-investir"
                  className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-2 sm:py-3 px-6 sm:px-8 rounded-lg transition duration-300 shadow-md hover:shadow-lg text-sm whitespace-nowrap min-touch-target"
                >
                  Saiba mais
                </TrackableLink>
              </div>
            </div>

            <div className="mt-4 sm:mt-6 text-xs sm:text-sm text-gray-500 italic bg-gray-50 p-3 sm:p-4 rounded-lg border border-gray-100">
              <strong>Disclaimer:</strong> Esta simulação foi desenvolvida com base na alocação média dos investidores divulgada pela ANBIMA. Embora forneça uma análise eficaz em termos gerais, somente uma avaliação personalizada do seu portfólio permitirá inferências mais precisas e detalhadas.
            </div>

            <div className="mt-6 sm:mt-10 text-center">
              <TrackableLink 
                to="/login-triagem" 
                trackId="calculator-cta-investir"
                className="inline-block bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold py-3 px-6 sm:px-10 rounded-lg transition duration-300 shadow-md hover:shadow-lg w-full sm:w-auto min-touch-target touch-highlight-none"
              >
                Torne-se um investidor hoje
              </TrackableLink>
              <p className="mt-3 text-xs text-gray-500">
                Mais de 5.000 clientes já aproveitam nossos serviços
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinancialCalculator;