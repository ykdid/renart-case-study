import React, { useState } from 'react';
import type { ProductWithPrice, GoldType } from '../../types';
import ColorPicker from '../ColorPicker';

interface ProductCardProps {
  product: ProductWithPrice;
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  className = '' 
}) => {
  const [selectedColor, setSelectedColor] = useState<GoldType>('yellow');
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getPopularityStars = (score: number) => {
    const stars = Math.round(score * 5);
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={`text-sm ${
          i < stars ? 'text-yellow-400' : 'text-gray-300'
        }`}
      >
        ★
      </span>
    ));
  };

  const currentImage = product.images[selectedColor];

  return (
    <div className={`
      bg-white rounded-2xl shadow-sm border border-gray-100
      hover:shadow-xl hover:border-gray-200
      transition-all duration-300 ease-out
      overflow-hidden group
      ${className}
    `}>
      {/* Image Container */}
      <div className="relative aspect-square bg-gray-50 overflow-hidden">
        {!imageError ? (
          <img
            src={currentImage}
            alt={product.name}
            className={`
              w-full h-full object-cover
              transition-all duration-500 ease-out
              group-hover:scale-105
              ${imageLoaded ? 'opacity-100' : 'opacity-0'}
            `}
            onLoad={() => setImageLoaded(true)}
            onError={() => {
              setImageError(true);
              setImageLoaded(true);
            }}
          />
        ) : (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
            <div className="text-gray-400 text-center">
              <svg className="w-12 h-12 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
              </svg>
              <p className="text-sm">Image not available</p>
            </div>
          </div>
        )}
        
        {/* Loading skeleton */}
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse" />
        )}
        
        {/* Popularity badge */}
        <div className="absolute top-3 left-3">
          <div className="flex items-center gap-1 px-2 py-1 bg-white/90 backdrop-blur-sm rounded-full">
            {getPopularityStars(product.popularityScore)}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Product Name */}
        <h3 className="font-semibold text-gray-900 text-lg leading-tight">
          {product.name}
        </h3>
        
        {/* Weight */}
        <p className="text-sm text-gray-600">
          Weight: <span className="font-medium">{product.weight}g</span>
        </p>
        
        {/* Color Picker */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-700">Gold Type:</p>
          <ColorPicker 
            selectedColor={selectedColor}
            onColorChange={setSelectedColor}
          />
        </div>
        
        {/* Price */}
        <div className="pt-2 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-gray-900">
              {formatPrice(product.currentPrice)}
            </span>
            <span className="text-sm text-gray-500">
              Gold: {formatPrice(product.goldPrice.price)}/oz
            </span>
          </div>
        </div>

        {/* Action Button */}
        <button className="
          w-full py-3 px-4 mt-4
          bg-gray-900 hover:bg-gray-800 
          text-white font-medium rounded-xl
          transition-colors duration-200
          focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2
        ">
          View Details
        </button>
      </div>
    </div>
  );
};

export default ProductCard;