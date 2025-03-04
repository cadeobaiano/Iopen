import React from 'react';
import theme from '../../styles/theme';

interface SectionHeaderProps {
  title: string;
  description?: string;
  className?: string;
  icon?: React.ReactNode;
  variant?: 'default' | 'primary' | 'secondary' | 'danger' | 'success' | 'warning';
  align?: 'left' | 'center' | 'right';
  withBorder?: boolean;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ 
  title, 
  description,
  className = '',
  icon,
  variant = 'primary',
  align = 'left',
  withBorder = true
}) => {
  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  };
  
  const titleColorClasses = {
    default: 'text-gray-800',
    primary: 'text-sky-800',
    secondary: 'text-sky-700',
    danger: 'text-red-700',
    success: 'text-green-700',
    warning: 'text-orange-700'
  };
  
  const borderClasses = withBorder ? {
    default: 'border-b border-gray-200',
    primary: 'border-b border-sky-100',
    secondary: 'border-b border-sky-100',
    danger: 'border-b border-red-100',
    success: 'border-b border-green-100',
    warning: 'border-b border-orange-100'
  }[variant] : '';
  
  return (
    <div className={`mb-6 sm:mb-8 ${alignClasses[align]} ${className}`}>
      <h2 className={`text-xl sm:text-2xl font-bold mb-2 ${titleColorClasses[variant]} ${borderClasses} pb-2 flex items-center ${align === 'center' ? 'justify-center' : ''}`}>
        {icon && <span className="mr-2">{icon}</span>}
        {title}
      </h2>
      {description && (
        <p className="text-sm sm:text-base text-gray-600">
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionHeader; 