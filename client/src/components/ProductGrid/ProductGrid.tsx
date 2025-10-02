import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Mousewheel } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import type { ProductWithPrice } from '../../types';
import ProductCard from '../ProductCard';

interface ProductGridProps {
  products: ProductWithPrice[];
  loading?: boolean;
  error?: string | null;
  className?: string;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  loading = false,
  error = null,
  className = '',
}) => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  // Loading state
  if (loading) {
    return (
      <div className={className}>
        <div className="relative">
          <div className="flex gap-6 overflow-hidden">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="flex-shrink-0 min-w-[300px] w-1/4">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-pulse">
                  <div className="aspect-square bg-gray-200" />
                  <div className="p-4 space-y-3">
                    <div className="h-6 bg-gray-200 rounded-lg w-3/4" />
                    <div className="h-4 bg-gray-200 rounded w-1/2" />
                    <div className="h-4 bg-gray-200 rounded w-1/3" />
                    <div className="flex gap-2">
                      {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="w-8 h-8 bg-gray-200 rounded-full" />
                      ))}
                    </div>
                    <div className="pt-2 border-t border-gray-100">
                      <div className="flex items-center justify-between">
                        <div className="h-8 bg-gray-200 rounded w-1/2" />
                        <div className="h-4 bg-gray-200 rounded w-1/4" />
                      </div>
                    </div>
                    <div className="h-12 bg-gray-200 rounded-xl mt-4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className={`text-center py-12 ${className}`}>
        <div className="max-w-md mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-xl p-6">
            <svg className="w-12 h-12 text-red-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <h3 className="text-lg font-semibold text-red-900 mb-2">Error Loading Products</h3>
            <p className="text-red-700">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  // Ensure products is an array and handle empty state
  const safeProducts = Array.isArray(products) ? products : [];
  
  if (!safeProducts || safeProducts.length === 0) {
    return (
      <div className={`text-center py-12 ${className}`}>
        <div className="max-w-md mx-auto">
          <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No Products Found</h3>
          <p className="text-gray-600">We couldn't find any products matching your criteria.</p>
        </div>
      </div>
    );
  }

  const handlePrev = () => {
    swiperRef.current?.slidePrev();
  };

  const handleNext = () => {
    swiperRef.current?.slideNext();
  };

  return (
    <div className={`relative ${className}`}>
      {/* Left Arrow */}
      <button
        onClick={handlePrev}
        disabled={isBeginning}
        className={`
          absolute left-0 top-1/2 -translate-y-1/2 z-10
          w-12 h-12 bg-white border-2 border-gray-200 rounded-full
          flex items-center justify-center shadow-lg
          transition-all duration-200 hover:scale-105
          ${isBeginning 
            ? 'opacity-50 cursor-not-allowed' 
            : 'hover:border-gray-400 hover:bg-gray-50 hover:shadow-xl'
          }
        `}
      >
        <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Right Arrow */}
      <button
        onClick={handleNext}
        disabled={isEnd}
        className={`
          absolute right-0 top-1/2 -translate-y-1/2 z-10
          w-12 h-12 bg-white border-2 border-gray-200 rounded-full
          flex items-center justify-center shadow-lg
          transition-all duration-200 hover:scale-105
          ${isEnd 
            ? 'opacity-50 cursor-not-allowed' 
            : 'hover:border-gray-400 hover:bg-gray-50 hover:shadow-xl'
          }
        `}
      >
        <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Horizontal Carousel Container */}
      <div className="mx-16 overflow-x-auto scrollbar-thin">
        <Swiper
          modules={[Navigation, Pagination, Mousewheel]}
          direction="horizontal"
          spaceBetween={24}
          slidesPerView="auto"
          freeMode={false}
          speed={400}
          allowTouchMove={true}
          grabCursor={true}
          watchOverflow={true}
          centeredSlides={false}
          mousewheel={{
            forceToAxis: true,
            sensitivity: 1,
          }}
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
          }}
          onSlideChange={(swiper) => {
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          }}
          breakpoints={{
            320: {
              slidesPerView: 1.2,
              spaceBetween: 16,
            },
            640: {
              slidesPerView: 2.2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 24,
            },
          }}
          className="product-carousel"
        >
          {safeProducts.map((product, index) => (
            <SwiperSlide key={`${product.name}-${index}`} style={{ width: 'auto', height: 'auto' }}>
              <div className="w-[300px] h-full">
                <ProductCard product={product} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>


    </div>
  );
};

export default ProductGrid;