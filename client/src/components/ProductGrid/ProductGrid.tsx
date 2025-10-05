import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
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
      <div className={`relative ${className}`}>
        <div className="flex gap-6 px-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="flex-shrink-0 w-72">
              <div className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
                <div className="aspect-square bg-gray-200" />
                <div className="p-6 space-y-4 text-center">
                  <div className="h-5 bg-gray-200 rounded mx-auto w-3/4" />
                  <div className="h-6 bg-gray-200 rounded mx-auto w-1/2" />
                  <div className="flex justify-center gap-2">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <div key={i} className="w-6 h-6 bg-gray-200 rounded-full" />
                    ))}
                  </div>
                  <div className="h-4 bg-gray-200 rounded mx-auto w-1/3" />
                  <div className="flex justify-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div key={i} className="w-4 h-4 bg-gray-200 rounded" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
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
    <div className={`w-full ${className}`}>
      {/* Container with arrows and swiper */}
      <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4 max-w-full mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
        {/* Left Arrow - Hidden on small screens */}
        <button
          onClick={handlePrev}
          disabled={isBeginning}
          className={`
            hidden sm:flex flex-shrink-0 w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16
            rounded-full items-center justify-center
            transition-all duration-300
            ${isBeginning 
              ? 'opacity-30 cursor-not-allowed' 
              : 'hover:scale-105 active:scale-95'
            }
          `}
        >
          <svg className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Swiper Container */}
        <div className="flex-1 overflow-hidden min-w-0">
        <Swiper
          modules={[Navigation, Pagination]}
          direction="horizontal"
          slidesPerView={4}
          spaceBetween={16}
          speed={600}
          allowTouchMove={true}
          grabCursor={true}
          centeredSlides={false}
          watchOverflow={true}
          pagination={{
            clickable: true,
            bulletClass: 'swiper-pagination-bullet',
            bulletActiveClass: 'swiper-pagination-bullet-active',
            horizontalClass: 'swiper-pagination-horizontal'
          }}
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
          }}
          onSlideChange={(swiper) => {
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          }}
          breakpoints={{
            0: {
              slidesPerView: 1,
              spaceBetween: 8,
            },
            480: {
              slidesPerView: 1.5,
              spaceBetween: 10,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 12,
            },
            768: {
              slidesPerView: 2.5,
              spaceBetween: 14,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 16,
            },
            1280: {
              slidesPerView: 4,
              spaceBetween: 18,
            },
            1536: {
              slidesPerView: 5,
              spaceBetween: 20,
            },
          }}
          className="!pb-12"
        >
          {safeProducts.map((product, index) => (
            <SwiperSlide key={`${product.name}-${index}`}>
              <div className="w-full max-w-xs mx-auto">
                <ProductCard product={product} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        </div>

        {/* Right Arrow - Hidden on small screens */}
        <button
          onClick={handleNext}
          disabled={isEnd}
          className={`
            hidden sm:flex flex-shrink-0 w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16
            rounded-full items-center justify-center
            transition-all duration-300
            ${isEnd 
              ? 'opacity-30 cursor-not-allowed' 
              : 'hover:scale-105 active:scale-95'
            }
          `}
        >
          <svg className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ProductGrid;