import React from 'react';
import { Link, LinkProps } from 'react-router-dom';

interface TrackableLinkProps extends LinkProps {
  trackId: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * A Link component that automatically tracks clicks for analytics
 */
const TrackableLink: React.FC<TrackableLinkProps> = ({
  trackId,
  children,
  className = '',
  ...props
}) => {
  return (
    <Link
      className={className}
      data-track-id={trackId}
      {...props}
    >
      {children}
    </Link>
  );
};

export default TrackableLink;