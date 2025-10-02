export interface Product {
  name: string;
  popularityScore: number;
  weight: number;
  images: {
    yellow: string;
    rose: string;
    white: string;
  };
}

export interface ProductWithPrice extends Product {
  currentPrice: number;
  goldPrice: GoldPrice;
}

export interface GoldPrice {
  price: number;
  timestamp: number;
}

export interface FilterParams {
  minPrice?: number;
  maxPrice?: number;
  minPopularity?: number;
  maxPopularity?: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}