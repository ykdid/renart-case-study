import React, { useState } from 'react';
import type { ProductWithPrice, GoldType } from '../../types';

interface ProductCardProps {
  product: ProductWithPrice;
  className?: string;
}

const goldTypeOptions: Array<{ type: GoldType; label: string; color: string }> = [
  { type: 'yellow', label: 'Yellow Gold', color: '#E6CA97' },
  { type: 'white', label: 'White Gold', color: '#D9D9D9' },
  { type: 'rose', label: 'Rose Gold', color: '#E1A4A9' }
];

export const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  className = '' 
}) => {
  const [selectedColor, setSelectedColor] = useState<GoldType>('yellow');
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const formatPrice = (price: number) => {
    return `$${Math.round(price)}.00 USD`;
  };

  const getRatingStars = (score: number) => {
    const rating = score * 5;
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    return {
      stars: Array.from({ length: 5 }, (_, i) => {
        if (i < fullStars) return 'full';
        if (i === fullStars && hasHalfStar) return 'half';
        return 'empty';
      }),
      rating: rating.toFixed(1)
    };
  };

  const currentImage = product.images[selectedColor];
  const selectedGoldOption = goldTypeOptions.find(option => option.type === selectedColor);

  const ratingData = getRatingStars(product.popularityScore);

  return (
    <div className={`
      hover:shadow-[0_8px_15px_-3px_rgba(0,0,0,0.1)]
      transition-shadow duration-300
      w-full max-w-sm mx-auto
      ${className}
    `}>
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden">
        {!imageError ? (
          <img
            src={currentImage}
            alt={product.name}
            className={`
              w-full h-full object-cover cursor-default
              transition-opacity duration-300
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
              <svg className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
              </svg>
              <p className="text-xs sm:text-sm">Image not available</p>
            </div>
          </div>
        )}
        
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse" />
        )}
      </div>

      {/* Card Content */}
      <div className="p-3 sm:p-4 md:p-5 lg:p-6 space-y-2 sm:space-y-3 md:space-y-4">
        {/* Product Title */}
        <h3 className="text-sm sm:text-base md:montserrat-medium-15 text-black leading-tight font-medium line-clamp-2 cursor-pointer">
          {product.name}
        </h3>
        
        {/* Price */}
        <div className="text-sm sm:text-base md:montserrat-regular-15 text-black font-semibold">
          {formatPrice(product.currentPrice)}
        </div>
        
        {/* Metal Color Options */}
        <div className="flex gap-1.5 sm:gap-2">
          {goldTypeOptions.map((option) => (
            <button
              key={option.type}
              onClick={() => setSelectedColor(option.type)}
              className={`
                w-5 h-5 sm:w-6 sm:h-6 rounded-full transition-all duration-200
                ${
                  selectedColor === option.type 
                    ? 'ring-1 ring-gray-400 ring-offset-1 scale-110' 
                    : 'hover:scale-105'
                }
              `}
              style={{ backgroundColor: option.color }}
              title={option.label}
            />
          ))}
        </div>
        
        {/* Selected Metal Name */}
        <div className="text-xs sm:text-sm md:avenir-book-14 text-gray-500">
          {selectedGoldOption?.label}
        </div>
        
        {/* Star Rating */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className="flex items-center">
            {ratingData.stars.map((star, i) => (
              <span key={i} className="text-sm sm:text-base md:text-lg">
                {star === 'full' && <span style={{ color: '#FFB800' }}>★</span>}
                {star === 'half' && <span style={{ color: '#FFB800' }}>☆</span>}
                {star === 'empty' && <span className="text-gray-300">☆</span>}
              </span>
            ))}
          </div>
          <span className="text-xs sm:text-sm md:avenir-book-12 font-normal text-black">
            {ratingData.rating}/5
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;