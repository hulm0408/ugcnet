import React, { ReactNode, ButtonHTMLAttributes, FC } from 'react';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
  'aria-label'?: string;
}

const IconButton: FC<IconButtonProps> = ({ children, className = '', 'aria-label': ariaLabel, ...rest }) => {
  const baseClasses = 'inline-flex items-center justify-center p-2 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed hover:bg-slate-100';
  return (
    <button className={`${baseClasses} ${className}`} aria-label={ariaLabel} {...rest}>
      {children}
    </button>
  );
};

export default IconButton;
