import axios from 'axios';
import type { GoldPrice, ProductWithPrice, ProductFilters } from '../types';

// API Base URL configuration for dev and prod
const API_BASE_URL = import.meta.env.PROD 
  ? 'https://renart-backend-tp1s.onrender.com/api'
  : 'http://localhost:3001/api';

class ApiService {
  private axiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: API_BASE_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  async getProducts(filters?: ProductFilters): Promise<ProductWithPrice[]> {
    try {
      const params = new URLSearchParams();
      
      if (filters?.minPrice !== undefined) {
        params.append('minPrice', filters.minPrice.toString());
      }
      if (filters?.maxPrice !== undefined) {
        params.append('maxPrice', filters.maxPrice.toString());
      }
      if (filters?.sortBy) {
        params.append('sortBy', filters.sortBy);
      }
      if (filters?.sortOrder) {
        params.append('sortOrder', filters.sortOrder);
      }
      if (filters?.search) {
        params.append('search', filters.search);
      }

      const response = await this.axiosInstance.get(`/products?${params.toString()}`);
      if (response.data.success && Array.isArray(response.data.data)) {
        return response.data.data;
      } else {
        throw new Error('Invalid response format from products API');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      throw new Error('Failed to fetch products');
    }
  }

  async getGoldPrice(): Promise<GoldPrice> {
    try {
      const response = await this.axiosInstance.get('/gold-price');
      if (response.data.success && response.data.data) {
        return {
          price: response.data.data.price,
          currency: response.data.data.currency,
          timestamp: response.data.data.timestamp
        };
      } else {
        throw new Error('Invalid response format from gold price API');
      }
    } catch (error) {
      console.error('Error fetching gold price:', error);
      throw new Error('Failed to fetch gold price');
    }
  }

  async getProduct(name: string): Promise<ProductWithPrice | null> {
    try {
      const products = await this.getProducts();
      return products.find(product => product.name === name) || null;
    } catch (error) {
      console.error('Error fetching product:', error);
      throw new Error('Failed to fetch product');
    }
  }
}

export const apiService = new ApiService();
export default apiService;
