import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  fluid?: boolean;
  as?: React.ElementType;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export const Container: React.FC<ContainerProps> = ({ 
  children, 
  className = '',
  fluid = false,
  as: Component = 'div',
  maxWidth = 'xl',
  padding = 'md'
}) => {
  const maxWidthClasses = {
    xs: 'max-w-xs',
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-7xl',
    full: 'max-w-full'
  };
  
  const paddingClasses = {
    none: 'px-0',
    sm: 'px-3 sm:px-4',
    md: 'px-3 sm:px-8 lg:px-16',
    lg: 'px-4 sm:px-12 lg:px-24'
  };
  
  const containerClasses = fluid 
    ? 'w-full' 
    : `${maxWidthClasses[maxWidth]} mx-auto`;
  
  return (
    <Component className={`${containerClasses} ${paddingClasses[padding]} ${className}`}>
      {children}
    </Component>
  );
};

export default Container; 