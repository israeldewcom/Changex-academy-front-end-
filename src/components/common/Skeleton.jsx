import React from 'react';

const Skeleton = ({ variant = 'text', width = '100%', height = '20px', className = '' }) => {
  const variants = {
    text: 'h-4',
    title: 'h-8',
    avatar: 'rounded-full',
    card: 'rounded-xl',
    button: 'rounded-lg',
  };
  
  return (
    <div
      className={`bg-[#14143A] animate-pulse rounded ${variants[variant]} ${className}`}
      style={{ width, height }}
    />
  );
};

export const SkeletonCard = () => (
  <div className="bg-[#14143A] rounded-xl p-4 space-y-3">
    <Skeleton variant="card" height="160px" />
    <Skeleton width="80%" />
    <Skeleton width="60%" />
    <Skeleton width="40%" />
  </div>
);

export const SkeletonText = ({ lines = 3 }) => (
  <div className="space-y-2">
    {[...Array(lines)].map((_, i) => (
      <Skeleton key={i} width={`${Math.random() * 30 + 70}%`} />
    ))}
  </div>
);

export default Skeleton;
