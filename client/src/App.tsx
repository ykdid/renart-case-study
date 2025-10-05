import { useState, useEffect } from 'react';
import { ProductGrid } from './components';
import { useProducts } from './hooks';

function App() {
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'popularity'>('popularity');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  const { products, loading, error, goldPrice, updateFilters } = useProducts({
    sortBy,
    sortOrder,
    search: searchQuery
  });

  // Update filters when sort options or search change
  useEffect(() => {
    updateFilters({ sortBy, sortOrder, search: searchQuery });
  }, [sortBy, sortOrder, searchQuery, updateFilters]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-slate-50 via-white to-slate-50 shadow-lg border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-10">
          <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between py-3 sm:py-4 md:py-5 gap-3 sm:gap-4">
            <div className="flex-1 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 w-full xl:w-auto">
              <img 
                src="https://cdn.prod.website-files.com/68234acd8fb1ab421a72b174/6835a18d5509df5179891345_Renart_Social_Primary.png" 
                alt="Renart Logo" 
                className="h-8 sm:h-10 md:h-12 w-auto flex-shrink-0"
              />
              <div className="min-w-0">
                <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-extrabold bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent leading-tight">
                  Renart Jewelry Collection
                </h1>
              </div>
            </div>
            
            {/* Search Bar */}
            <div className="w-full sm:flex-1 sm:max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg order-2 xl:order-none">
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                  <svg className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 group-focus-within:text-gray-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search jewelry..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2 sm:py-2.5 md:py-3 text-sm border border-gray-200 rounded-lg sm:rounded-xl leading-5 bg-white/80 backdrop-blur-sm placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-gray-900/20 focus:border-gray-400 shadow-sm hover:shadow-md transition-all duration-200"
                />
              </div>
            </div>
            
            {/* Gold Price Display */}
            {goldPrice && (
              <div className="flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200/60 rounded-lg sm:rounded-xl px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3 shadow-sm hover:shadow-md transition-all duration-200 order-3 xl:order-none">
                <div className="flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-amber-100 rounded-full flex-shrink-0">
                  <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                </div>
                <div className="text-xs sm:text-sm min-w-0">
                  <div className="font-semibold text-amber-900 hidden sm:block">Live Gold Price</div>
                  <div className="font-semibold text-amber-900 sm:hidden">Gold</div>
                  <div className="text-amber-800 font-mono truncate">
                    ${goldPrice.price.toFixed(2)}/g
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Controls */}
      <div className="max-w-full mx-auto px-3 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-3 sm:py-4 md:py-5">
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 items-start lg:items-center justify-between mb-4 sm:mb-5 md:mb-6">
          {/* Sort Controls */}
          <div className="flex flex-row flex-wrap gap-2 sm:gap-3 md:gap-4 w-full lg:w-auto">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <label htmlFor="sortBy" className="text-xs sm:text-sm font-semibold text-gray-700 whitespace-nowrap">
                Sort:
              </label>
              <select
                id="sortBy"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'name' | 'price' | 'popularity')}
                className="border border-gray-200 rounded-lg sm:rounded-xl px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 md:py-2.5 text-xs sm:text-sm bg-white/90 backdrop-blur-sm shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-gray-900/20 focus:border-gray-400 transition-all duration-200"
              >
                <option value="popularity">Popularity</option>
                <option value="price">Price</option>
                <option value="name">Name</option>
              </select>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <label htmlFor="sortOrder" className="text-xs sm:text-sm font-semibold text-gray-700 whitespace-nowrap">
                Order:
              </label>
              <select
                id="sortOrder"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
                className="border border-gray-200 rounded-lg sm:rounded-xl px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 md:py-2.5 text-xs sm:text-sm bg-white/90 backdrop-blur-sm shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-gray-900/20 focus:border-gray-400 transition-all duration-200"
              >
                <option value="desc">High to Low</option>
                <option value="asc">Low to High</option>
              </select>
            </div>
          </div>
        </div>

        {/* Products Count */}
        {!loading && !error && products && (
          <div className="mb-4 sm:mb-5 md:mb-6">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
              <p className="text-sm font-medium text-gray-700">
                {products.length === 0 ? 'No products found' : 
                 `Showing ${products.length} ${products.length === 1 ? 'product' : 'products'}`}
                {searchQuery && ` for "${searchQuery}"`}
              </p>
            </div>
          </div>
        )}

        {/* Product List Title */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h2 className="avenir-book-45 text-gray-900">Product List</h2>
        </div>

        {/* Product Carousel */}
        <ProductGrid
          products={products}
          loading={loading}
          error={error}
          className="pb-4 sm:pb-6 md:pb-8"
        />
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8">
          <div className="text-center text-gray-600 space-y-2">
            <p className="text-xs sm:text-sm">&copy; 2025 Renart Jewelry. All rights reserved by Yusuf Kaya.</p>
            {goldPrice && (
              <p className="text-xs sm:text-sm text-gray-500">
                Prices updated in real-time based on current gold market rates
              </p>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
