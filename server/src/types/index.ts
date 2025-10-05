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
  sortBy?: string;
  sortOrder?: string;
  search?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}