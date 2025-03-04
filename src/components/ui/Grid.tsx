import React from 'react';

interface GridProps {
  children: React.ReactNode;
  cols?: 1 | 2 | 3 | 4 | 5 | 6 | 12;
  smCols?: 1 | 2 | 3 | 4 | 5 | 6 | 12;
  mdCols?: 1 | 2 | 3 | 4 | 5 | 6 | 12;
  lgCols?: 1 | 2 | 3 | 4 | 5 | 6 | 12;
  gap?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  as?: React.ElementType;
  autoRows?: boolean;
  alignItems?: 'start' | 'center' | 'end' | 'stretch';
  justifyItems?: 'start' | 'center' | 'end' | 'stretch';
}

export const Grid: React.FC<GridProps> = ({
  children,
  cols = 1,
  smCols,
  mdCols,
  lgCols,
  gap = 'md',
  className = '',
  as: Component = 'div',
  autoRows = false,
  alignItems,
  justifyItems
}) => {
  const colsClasses = `grid-cols-${cols}`;
  const smColsClasses = smCols ? `sm:grid-cols-${smCols}` : '';
  const mdColsClasses = mdCols ? `md:grid-cols-${mdCols}` : '';
  const lgColsClasses = lgCols ? `lg:grid-cols-${lgCols}` : '';
  
  const gapClasses = {
    none: 'gap-0',
    xs: 'gap-1 sm:gap-2',
    sm: 'gap-2 sm:gap-4',
    md: 'gap-4 sm:gap-6',
    lg: 'gap-6 sm:gap-8',
    xl: 'gap-8 sm:gap-12'
  };
  
  const autoRowsClass = autoRows ? 'grid-auto-rows-min' : '';
  
  const alignItemsClasses = alignItems ? `items-${alignItems}` : '';
  const justifyItemsClasses = justifyItems ? `justify-items-${justifyItems}` : '';
  
  return (
    <Component 
      className={`grid ${colsClasses} ${smColsClasses} ${mdColsClasses} ${lgColsClasses} ${gapClasses[gap]} ${autoRowsClass} ${alignItemsClasses} ${justifyItemsClasses} ${className}`}
    >
      {children}
    </Component>
  );
};

export default Grid; 