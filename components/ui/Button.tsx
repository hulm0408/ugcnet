import React, { ButtonHTMLAttributes, FC } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const Button: FC<ButtonProps> = ({ children, className = '', ...rest }) => {
  const baseClasses = 'inline-flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed';
  return (
    <button className={`${baseClasses} ${className}`} {...rest}>
      {children}
    </button>
  );
};

export default Button;
