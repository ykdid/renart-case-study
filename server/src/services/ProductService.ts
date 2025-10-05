import * as fs from 'fs';
import * as path from 'path';
import { Product, ProductWithPrice, FilterParams, GoldPrice } from '../types';
import { GoldPriceService } from './GoldPriceService';

export class ProductService {
  private goldPriceService: GoldPriceService;
  private productsPath: string;

  constructor() {
    this.goldPriceService = GoldPriceService.getInstance();
    this.productsPath = path.resolve(__dirname, '../../products.json');
  }

  private loadProducts(): Product[] {
    try {
      const data = fs.readFileSync(this.productsPath, 'utf8');
      const products = JSON.parse(data);
      
      if (!Array.isArray(products)) {
        throw new Error('Products data must be an array');
      }

      return products;
    } catch (error) {
      console.error('Error loading products:', error);
      throw new Error('Failed to load products data');
    }
  }

  private calculatePrice(product: Product, goldPrice: number): number {
    const price = (product.popularityScore + 1) * product.weight * goldPrice;
    return Math.round(price * 100) / 100;
  }

  private calculateStarRating(popularityScore: number): number {
    const rating = popularityScore * 5;
    return Math.round(rating * 10) / 10;
  }

  private applyFilters(products: ProductWithPrice[], filters: FilterParams): ProductWithPrice[] {
    return products.filter(product => {
      if (filters.minPrice !== undefined && product.currentPrice < filters.minPrice) {
        return false;
      }
      if (filters.maxPrice !== undefined && product.currentPrice > filters.maxPrice) {
        return false;
      }

      if (filters.minPopularity !== undefined && product.popularityScore < filters.minPopularity) {
        return false;
      }
      if (filters.maxPopularity !== undefined && product.popularityScore > filters.maxPopularity) {
        return false;
      }

      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        if (!product.name.toLowerCase().includes(searchTerm)) {
          return false;
        }
      }

      return true;
    });
  }

  private applySorting(products: ProductWithPrice[], sortBy: string = 'popularity', sortOrder: string = 'desc'): ProductWithPrice[] {
    return products.sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'price':
          comparison = a.currentPrice - b.currentPrice;
          break;
        case 'popularity':
        default:
          comparison = a.popularityScore - b.popularityScore;
          break;
      }
      
      return sortOrder === 'asc' ? comparison : -comparison;
    });
  }

  public async getProducts(filters: FilterParams = {}): Promise<ProductWithPrice[]> {
    try {
      const products = this.loadProducts();
      const goldPrice = await this.goldPriceService.getGoldPrice();

      const goldPriceData = this.goldPriceService.getCachedPrice();

      const productsWithPrice: ProductWithPrice[] = products.map(product => ({
        ...product,
        currentPrice: this.calculatePrice(product, goldPrice),
        goldPrice: {
          price: goldPrice,
          currency: 'USD',
          timestamp: goldPriceData?.timestamp || Date.now()
        }
      }));

      const filteredProducts = this.applyFilters(productsWithPrice, filters);
      return this.applySorting(filteredProducts, filters.sortBy, filters.sortOrder);
    } catch (error) {
      console.error('Error getting products:', error);
      throw error;
    }
  }

  public async getProductById(index: number): Promise<ProductWithPrice | null> {
    try {
      const products = await this.getProducts();
      return products[index] || null;
    } catch (error) {
      console.error('Error getting product by ID:', error);
      throw error;
    }
  }

  public async getCurrentGoldPrice(): Promise<GoldPrice> {
    try {
      const price = await this.goldPriceService.getGoldPrice();
      return {
        price,
        timestamp: Date.now()
      };
    } catch (error) {
      console.error('Error getting current gold price:', error);
      throw error;
    }
  }

  public getProductStats(): Promise<{
    totalProducts: number;
    avgPrice: number;
    minPrice: number;
    maxPrice: number;
    avgPopularity: number;
  }> {
    return this.getProducts().then(products => {
      if (products.length === 0) {
        return {
          totalProducts: 0,
          avgPrice: 0,
          minPrice: 0,
          maxPrice: 0,
          avgPopularity: 0
        };
      }

      const prices = products.map(p => p.currentPrice);
      const popularityScores = products.map(p => p.popularityScore);

      return {
        totalProducts: products.length,
        avgPrice: Math.round((prices.reduce((a, b) => a + b, 0) / prices.length) * 100) / 100,
        minPrice: Math.min(...prices),
        maxPrice: Math.max(...prices),
        avgPopularity: Math.round((popularityScores.reduce((a, b) => a + b, 0) / popularityScores.length) * 100) / 100
      };
    });
  }
}