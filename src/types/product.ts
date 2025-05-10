
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  onSale?: boolean;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  reviewList?: {
    userName: string;
    rating: number;
    date: string;
    comment: string;
  }[];
  details: string[];
  specifications?: Record<string, string>;
  quantity?: number;
}
