import React from 'react';

interface ProductCardSkeletonProps {
  className?: string;
}

export const ProductCardSkeleton: React.FC<ProductCardSkeletonProps> = ({ 
  className = '' 
}) => {
  return (
    <div className={`
      bg-white rounded-2xl shadow-sm border border-gray-100
      overflow-hidden animate-pulse
      ${className}
    `}>
      {/* Image Skeleton */}
      <div className="aspect-square bg-gray-200" />
      
      {/* Content Skeleton */}
      <div className="p-4 space-y-3">
        {/* Title */}
        <div className="h-6 bg-gray-200 rounded-lg w-3/4" />
        
        {/* Weight */}
        <div className="h-4 bg-gray-200 rounded w-1/2" />
        
        {/* Color Picker Label */}
        <div className="h-4 bg-gray-200 rounded w-1/3" />
        
        {/* Color Options */}
        <div className="flex gap-2">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="w-8 h-8 bg-gray-200 rounded-full" />
          ))}
        </div>
        
        {/* Price */}
        <div className="pt-2 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <div className="h-8 bg-gray-200 rounded w-1/2" />
            <div className="h-4 bg-gray-200 rounded w-1/4" />
          </div>
        </div>
        
        {/* Button */}
        <div className="h-12 bg-gray-200 rounded-xl mt-4" />
      </div>
    </div>
  );
};

interface ProductGridSkeletonProps {
  count?: number;
  className?: string;
}

export const ProductGridSkeleton: React.FC<ProductGridSkeletonProps> = ({
  count = 6,
  className = ''
}) => {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
      {Array.from({ length: count }, (_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
};

export default ProductCardSkeleton;