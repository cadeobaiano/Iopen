import React from 'react';
import theme from '../../styles/theme';

interface ProgressBarProps {
  value: number;
  max: number;
  color?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning';
  height?: 'xs' | 'sm' | 'md' | 'lg';
  animated?: boolean;
  label?: string;
  percentage?: boolean;
  className?: string;
  showValue?: boolean;
  valuePrefix?: string;
  valueSuffix?: string;
  gradient?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max,
  color = 'primary',
  height = 'md',
  animated = true,
  label,
  percentage = false,
  className = '',
  showValue = false,
  valuePrefix = '',
  valueSuffix = '',
  gradient = false
}) => {
  const percent = Math.min(100, Math.max(0, (value / max) * 100));
  
  const heightClasses = {
    xs: 'h-1',
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4'
  };
  
  const colorClasses = {
    primary: gradient 
      ? 'bg-gradient-to-r from-cyan-400 to-sky-600' 
      : 'bg-cyan-500',
    secondary: gradient 
      ? 'bg-gradient-to-r from-sky-400 to-blue-600' 
      : 'bg-sky-500',
    danger: gradient 
      ? 'bg-gradient-to-r from-red-400 to-red-600' 
      : 'bg-red-500',
    success: gradient 
      ? 'bg-gradient-to-r from-green-400 to-green-600' 
      : 'bg-green-500',
    warning: gradient 
      ? 'bg-gradient-to-r from-orange-400 to-orange-600' 
      : 'bg-orange-500'
  };
  
  const animationClass = animated ? 'animate-widthIn' : '';
  
  const displayValue = showValue 
    ? `${valuePrefix}${value}${valueSuffix}` 
    : percentage 
      ? `${percent.toFixed(1)}%` 
      : '';
  
  return (
    <div className={`w-full ${className}`}>
      {(label || percentage || showValue) && (
        <div className="flex justify-between mb-1">
          {label && <span className="text-sm text-gray-700">{label}</span>}
          {(percentage || showValue) && (
            <span className="text-sm font-bold">{displayValue}</span>
          )}
        </div>
      )}
      <div className={`w-full bg-gray-200 rounded-full overflow-hidden shadow-inner ${heightClasses[height]}`}>
        <div 
          className={`${colorClasses[color]} ${heightClasses[height]} rounded-full ${animationClass}`} 
          style={{ width: `${percent}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar; 