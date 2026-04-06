import React from 'react';
import { Link } from 'react-router-dom';
import Loader from './Loader';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  disabled = false,
  onClick,
  to,
  type = 'button',
  className = '',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#07071A] disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-[#6C3BFF] hover:bg-[#5025E0] text-white focus:ring-[#6C3BFF]',
    secondary: 'bg-[#14143A] hover:bg-[#1A1A45] text-white border border-[#252560] focus:ring-[#6C3BFF]',
    outline: 'border-2 border-[#6C3BFF] text-[#6C3BFF] hover:bg-[#6C3BFF]/10 focus:ring-[#6C3BFF]',
    ghost: 'text-[#A0A0C8] hover:text-white hover:bg-[#14143A] focus:ring-[#6C3BFF]',
    danger: 'bg-[#FF4D4D] hover:bg-[#CC0000] text-white focus:ring-[#FF4D4D]',
    success: 'bg-[#00FFB2] hover:bg-[#00CC90] text-[#07071A] focus:ring-[#00FFB2]',
    accent: 'bg-[#00D4FF] hover:bg-[#00B8E0] text-[#07071A] focus:ring-[#00D4FF]',
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
    xl: 'px-8 py-4 text-xl',
  };
  
  const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`;
  
  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    );
  }
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={classes}
      {...props}
    >
      {loading && <Loader size="sm" className="mr-2" />}
      {children}
    </button>
  );
};

export default Button;
