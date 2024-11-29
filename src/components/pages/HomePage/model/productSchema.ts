interface Review {
  review: string;
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
  stock: number;
  description: string;
  reviews: Review[];
  likes: boolean;
}
