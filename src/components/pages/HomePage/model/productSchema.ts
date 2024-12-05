interface Review {
  review: string;
  rating : number;
}

export interface Product {
  id: number;
  name: string;
  rating: number;
  originalPrice: number;
  discountPrice: number;
  url: string;
  category: string;
  minamount: number;
  deadline: string;
  now: number;
  currentStock: number;
  description: string;
  reviews: Review[];
  available: boolean;
}
