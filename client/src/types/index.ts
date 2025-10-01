export type GoldType = 'yellow' | 'rose' | 'white';

export interface ProductImages {
  yellow: string;
  rose: string;
  white: string;
}

export interface Product {
  name: string;
  popularityScore: number;
  weight: number;
  images: ProductImages;
}

export interface GoldPrice {
  price: number;
  currency: string;
  timestamp: number;
}

export interface ProductWithPrice extends Product {
  currentPrice: number;
  goldPrice: GoldPrice;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface ProductFilters {
  minPrice?: number;
  maxPrice?: number;
  goldType?: GoldType;
  sortBy?: 'name' | 'price' | 'popularity';
  sortOrder?: 'asc' | 'desc';
}