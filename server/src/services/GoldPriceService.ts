import axios from 'axios';
import { GoldPrice } from '../types';

export class GoldPriceService {
  private static instance: GoldPriceService;
  private cachedPrice: GoldPrice | null = null;
  private cacheTimeout = 5 * 60 * 1000; // 5 minutes cache
  private apiKey = process.env.GOLD_API_KEY;
  private apiUrl = process.env.GOLD_API_URL || 'https://api.metalpriceapi.com/v1/latest';

  private constructor() {}

  public static getInstance(): GoldPriceService {
    if (!GoldPriceService.instance) {
      GoldPriceService.instance = new GoldPriceService();
    }
    return GoldPriceService.instance;
  }

  public async getGoldPrice(): Promise<number> {
    try {
      if (this.cachedPrice && this.isCacheValid()) {
        console.log('Using cached gold price:', this.cachedPrice.price);
        return this.cachedPrice.price;
      }

      if (!this.apiKey || this.apiKey === 'your_metal_price_api_key_here') {
        console.warn('No valid API key found, using mock gold price');
        return this.getMockGoldPrice();
      }

      const response = await axios.get(`${this.apiUrl}`, {
        headers: {
          'x-api-key': this.apiKey
        },
        timeout: 10000
      });

      if (response.data && response.data.status === 'success' && response.data.data && response.data.data.metal_prices && response.data.data.metal_prices.XAU) {
        const goldPricePerGram = response.data.data.metal_prices.XAU.price;
        
        this.cachedPrice = {
          price: goldPricePerGram,
          timestamp: Date.now()
        };

        console.log('Fetched new gold price:', goldPricePerGram);
        return goldPricePerGram;
      } else {
        throw new Error('Invalid response format from gold price API');
      }
    } catch (error) {
      console.error('Error fetching gold price:', error);
      
      if (this.cachedPrice) {
        console.log('Falling back to cached gold price');
        return this.cachedPrice.price;
      }

      console.log('Using fallback mock gold price');
      return this.getMockGoldPrice();
    }
  }

  private isCacheValid(): boolean {
    if (!this.cachedPrice) return false;
    return (Date.now() - this.cachedPrice.timestamp) < this.cacheTimeout;
  }

  private getMockGoldPrice(): number {
    const basePrice = 65;
    const variation = (Math.random() - 0.5) * 2;
    return Math.round((basePrice + variation) * 100) / 100;
  }

  public getCachedPrice(): GoldPrice | null {
    return this.cachedPrice;
  }
}