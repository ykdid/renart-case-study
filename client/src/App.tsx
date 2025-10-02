import { useState, useEffect } from 'react';
import { ProductGrid } from './components';
import { useProducts } from './hooks';

function App() {
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'popularity'>('popularity');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  
  const { products, loading, error, goldPrice, updateFilters } = useProducts({
    sortBy,
    sortOrder
  });

  // Update filters when sort options change
  useEffect(() => {
    updateFilters({ sortBy, sortOrder });
  }, [sortBy, sortOrder, updateFilters]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Renart Jewelry Collection
              </h1>
              <p className="mt-1 text-gray-600">
                Discover our premium engagement rings
              </p>
            </div>
            
            {/* Gold Price Display */}
            {goldPrice && (
              <div className="hidden sm:flex items-center gap-2 bg-yellow-50 border border-yellow-200 rounded-lg px-4 py-2">
                <svg className="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <div className="text-sm">
                  <span className="font-medium text-yellow-800">Gold Price:</span>
                  <span className="ml-1 text-yellow-900">
                    ${goldPrice.price.toFixed(2)}/oz
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Controls */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-8">
          {/* Sort Controls */}
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <label htmlFor="sortBy" className="text-sm font-medium text-gray-700">
                Sort by:
              </label>
              <select
                id="sortBy"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'name' | 'price' | 'popularity')}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              >
                <option value="popularity">Popularity</option>
                <option value="price">Price</option>
                <option value="name">Name</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <label htmlFor="sortOrder" className="text-sm font-medium text-gray-700">
                Order:
              </label>
              <select
                id="sortOrder"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              >
                <option value="desc">High to Low</option>
                <option value="asc">Low to High</option>
              </select>
            </div>
          </div>


        </div>

        {/* Products Count */}
        {!loading && !error && products && (
          <div className="mb-6">
            <p className="text-sm text-gray-600">
              Showing {products.length} {products.length === 1 ? 'product' : 'products'}
            </p>
          </div>
        )}

        {/* Product Carousel */}
        <ProductGrid
          products={products}
          loading={loading}
          error={error}
          className="pb-12"
        />
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p>&copy; 2024 Renart Jewelry. All rights reserved.</p>
            {goldPrice && (
              <p className="mt-2 text-sm">
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
