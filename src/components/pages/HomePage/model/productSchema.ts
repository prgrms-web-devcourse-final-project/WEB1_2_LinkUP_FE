interface Review {
  content: string;
  rating: number;
  using: boolean;
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

export interface AllProducts {
  productPostId: number;
  name: string;
  rating: number;
  originalprice: number;
  discountprice: number;
  url: string;
  category: string;
  minamount: number;
  deadline: string;
  available: boolean;
}

export interface WishProducts {
  productPostId: number;
  productName: string;
  productPrice: number;
  productImage: string;
  addedAt: string;
}
