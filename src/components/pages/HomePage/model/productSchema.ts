interface Comment {
  comment: string;
}

export interface Product {
  id: string;
  name: string;
  stars: number;
  originalPrice: number;
  discountedPrice: number;
  image: string;
  category: string;
  // description: string;
  comments: Comment[];
  likes: boolean;
}
