interface Review {
  review: string;
  rating: number;
}

export interface Product {
  id: number;
  name: string;
  rating: number;
  originalprice: number;
  discountprice: number;
  url: string;
  category: string;
  minamount: number;
  deadline: string;
  now: number;
  currentStock: number;
  initstock: number;
  description: string;
  reviews: Review[];
  likes: boolean;
  available: boolean;
}
