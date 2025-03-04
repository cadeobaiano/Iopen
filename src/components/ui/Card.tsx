import React from 'react';
import theme from '../../styles/theme';

interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'secondary' | 'danger' | 'success' | 'warning';
  hover?: boolean;
  className?: string;
  onClick?: () => void;
  bordered?: boolean;
  shadow?: 'none' | 'sm' | 'md' | 'lg';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  borderLeft?: boolean;
  borderLeftWidth?: 'sm' | 'md' | 'lg';
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  variant = 'default',
  hover = true,
  className = '',
  onClick,
  bordered = true,
  shadow = 'md',
  padding = 'md',
  borderLeft = false,
  borderLeftWidth = 'md'
}) => {
  const baseClasses = "rounded-xl";
  
  const hoverClasses = hover 
    ? "transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1" 
    : "";
  
  const shadowClasses = {
    none: "",
    sm: "shadow-sm",
    md: "shadow-md",
    lg: "shadow-lg"
  };
  
  const paddingClasses = {
    none: "p-0",
    sm: "p-2 sm:p-3",
    md: "p-4 sm:p-6",
    lg: "p-6 sm:p-8"
  };
  
  const borderClasses = bordered ? "border" : "";
  
  const borderLeftClasses = borderLeft 
    ? {
        sm: "border-l-2",
        md: "border-l-4",
        lg: "border-l-8"
      }[borderLeftWidth]
    : "";
  
  const variantClasses = {
    default: "bg-white border-gray-100",
    primary: `bg-${theme.colors.primary.light} border-${theme.colors.primary.light}`,
    secondary: `bg-${theme.colors.secondary.light} border-${theme.colors.secondary.light}`,
    danger: `bg-${theme.colors.danger.light} border-${theme.colors.danger.light}`,
    success: `bg-${theme.colors.success.light} border-${theme.colors.success.light}`,
    warning: `bg-${theme.colors.warning.light} border-${theme.colors.warning.light}`
  };
  
  const borderLeftColorClasses = {
    default: "border-l-gray-300",
    primary: `border-l-${theme.colors.primary.medium}`,
    secondary: `border-l-${theme.colors.secondary.medium}`,
    danger: `border-l-${theme.colors.danger.medium}`,
    success: `border-l-${theme.colors.success.medium}`,
    warning: `border-l-${theme.colors.warning.medium}`
  };
  
  const cursorClass = onClick ? "cursor-pointer" : "";
  
  return (
    <div 
      className={`
        ${baseClasses} 
        ${variantClasses[variant]} 
        ${borderClasses} 
        ${shadowClasses[shadow]} 
        ${paddingClasses[padding]} 
        ${hoverClasses} 
        ${borderLeftClasses} 
        ${borderLeft ? borderLeftColorClasses[variant] : ''} 
        ${cursorClass} 
        ${className}
      `}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Card; 