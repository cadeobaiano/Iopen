import React from 'react';

interface TrackableButtonProps {
  trackId: string;
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

/**
 * A button component that automatically tracks clicks for analytics
 */
const TrackableButton: React.FC<TrackableButtonProps> = ({
  trackId,
  children,
  className = '',
  onClick,
  type = 'button',
  disabled = false,
  ...props
}) => {
  return (
    <button
      type={type}
      className={className}
      data-track-id={trackId}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default TrackableButton;