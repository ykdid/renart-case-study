import { useState, useEffect, useCallback } from 'react';
import type { ProductWithPrice, ProductFilters, GoldPrice } from '../types';
import apiService from '../services/api';

interface UseProductsResult {
  products: ProductWithPrice[];
  loading: boolean;
  error: string | null;
  goldPrice: GoldPrice | null;
  refreshProducts: () => Promise<void>;
  updateFilters: (filters: ProductFilters) => void;
  filters: ProductFilters;
}

export const useProducts = (initialFilters: ProductFilters = {}): UseProductsResult => {
  const [products, setProducts] = useState<ProductWithPrice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [goldPrice, setGoldPrice] = useState<GoldPrice | null>(null);
  const [filters, setFilters] = useState<ProductFilters>(initialFilters);

  const fetchProducts = useCallback(async (currentFilters: ProductFilters = {}) => {
    try {
      setLoading(true);
      setError(null);
      
      const [productsData, goldPriceData] = await Promise.all([
        apiService.getProducts(currentFilters),
        apiService.getGoldPrice()
      ]);
      
      setProducts(productsData);
      setGoldPrice(goldPriceData);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const refreshProducts = useCallback(async () => {
    await fetchProducts(filters);
  }, [fetchProducts, filters]);

  const updateFilters = useCallback((newFilters: ProductFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchProducts(filters);
  }, [fetchProducts, filters]);

  // Auto-refresh gold prices every 60 seconds
  useEffect(() => {
    if (!goldPrice) return;

    const interval = setInterval(async () => {
      try {
        const newGoldPrice = await apiService.getGoldPrice();
        setGoldPrice(newGoldPrice);
        
        // Update product prices if gold price changed significantly
        if (Math.abs(newGoldPrice.price - goldPrice.price) > 1) {
          await refreshProducts();
        }
      } catch (err) {
        console.error('Error updating gold price:', err);
      }
    }, 60000); // 60 seconds

    return () => clearInterval(interval);
  }, [goldPrice, refreshProducts]);

  return {
    products,
    loading,
    error,
    goldPrice,
    refreshProducts,
    updateFilters,
    filters
  };
};

export default useProducts;