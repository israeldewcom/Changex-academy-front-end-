import React from 'react';

const Card = ({ children, className = '', hover = false, padding = true }) => {
  const baseStyles = 'bg-[#14143A] rounded-xl border border-[#252560]';
  const hoverStyles = hover ? 'transition-all duration-300 hover:border-[#6C3BFF] hover:shadow-glow' : '';
  const paddingStyles = padding ? 'p-6' : '';
  
  return (
    <div className={`${baseStyles} ${hoverStyles} ${paddingStyles} ${className}`}>
      {children}
    </div>
  );
};

export default Card;
