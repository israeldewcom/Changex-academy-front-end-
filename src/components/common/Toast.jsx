import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';

const Toast = ({ message, type = 'info', onClose, duration = 3000 }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);
  
  const types = {
    success: 'bg-[#00FFB2]/10 border-[#00FFB2] text-[#00FFB2]',
    error: 'bg-[#FF4D4D]/10 border-[#FF4D4D] text-[#FF4D4D]',
    warning: 'bg-[#FFB800]/10 border-[#FFB800] text-[#FFB800]',
    info: 'bg-[#6C3BFF]/10 border-[#6C3BFF] text-[#6C3BFF]',
  };
  
  const icons = {
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'ℹ',
  };
  
  return createPortal(
    <div className="fixed bottom-4 right-4 z-50 animate-slide-up">
      <div className={`flex items-center gap-3 px-4 py-3 rounded-lg border backdrop-blur-sm ${types[type]}`}>
        <span className="text-xl">{icons[type]}</span>
        <p>{message}</p>
      </div>
    </div>,
    document.body
  );
};

export default Toast;
