import React from 'react';

interface ProductCardSkeletonProps {
  className?: string;
}

export const ProductCardSkeleton: React.FC<ProductCardSkeletonProps> = ({ 
  className = '' 
}) => {
  return (
    <div className={`
      w-full max-w-sm mx-auto animate-pulse
      ${className}
    `}>
      {/* Image Skeleton */}
      <div className="relative aspect-square bg-gray-200 overflow-hidden" />
      
      {/* Content Skeleton */}
      <div className="p-3 sm:p-4 md:p-5 lg:p-6 space-y-2 sm:space-y-3 md:space-y-4">
        {/* Title */}
        <div className="h-4 sm:h-5 md:h-6 bg-gray-200 rounded w-3/4" />
        
        {/* Price */}
        <div className="h-4 sm:h-5 md:h-6 bg-gray-200 rounded w-1/2" />
        
        {/* Color Options */}
        <div className="flex gap-1.5 sm:gap-2">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="w-5 h-5 sm:w-6 sm:h-6 bg-gray-200 rounded-full" />
          ))}
        </div>
        
        {/* Selected Metal Name */}
        <div className="h-3 sm:h-4 bg-gray-200 rounded w-1/3" />
        
        {/* Star Rating */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-3 h-3 sm:w-4 sm:h-4 bg-gray-200 rounded" />
            ))}
          </div>
          <div className="h-3 sm:h-4 bg-gray-200 rounded w-8" />
        </div>
      </div>
    </div>
  );
};

interface ProductGridSkeletonProps {
  count?: number;
  className?: string;
}

export const ProductGridSkeleton: React.FC<ProductGridSkeletonProps> = ({
  count = 4,
  className = ''
}) => {
  return (
    <div className={`w-full ${className}`}>
      {/* Container with arrows and skeleton cards */}
      <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4 max-w-full mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
        {/* Left Arrow Skeleton */}
        <div className="hidden sm:flex flex-shrink-0 w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full bg-gray-200 animate-pulse" />
        
        {/* Skeleton Cards Container */}
        <div className="flex-1 min-w-0 overflow-hidden">
          <div className="flex gap-4">
            {Array.from({ length: count }, (_, i) => (
              <div key={i} className="flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
                <ProductCardSkeleton />
              </div>
            ))}
          </div>
        </div>
        
        {/* Right Arrow Skeleton */}
        <div className="hidden sm:flex flex-shrink-0 w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full bg-gray-200 animate-pulse" />
      </div>
    </div>
  );
};

export default ProductCardSkeleton;