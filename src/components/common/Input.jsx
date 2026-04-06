import React, { forwardRef } from 'react';

const Input = forwardRef(({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  required = false,
  disabled = false,
  className = '',
  rightElement,
  ...props
}, ref) => {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block text-sm font-medium mb-2 text-[#EAEAF0]">
          {label}
          {required && <span className="text-[#FF4D4D] ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        <input
          ref={ref}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className={`
            w-full px-4 py-2 rounded-lg bg-[#0D0D26] border 
            ${error ? 'border-[#FF4D4D]' : 'border-[#252560]'}
            text-white placeholder-[#6B6B98] focus:outline-none focus:border-[#6C3BFF]
            disabled:opacity-50 disabled:cursor-not-allowed
            transition-colors duration-200
          `}
          {...props}
        />
        {rightElement && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {rightElement}
          </div>
        )}
      </div>
      {error && (
        <p className="mt-1 text-sm text-[#FF4D4D]">{error}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';
export default Input;
