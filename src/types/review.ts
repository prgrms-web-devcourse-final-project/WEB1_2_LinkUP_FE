export interface ReviewType {
  userId: number;
  rating: number;
  reviews: {
    reviewerId: number;
    nickname: string;
    reviewContent: string;
  }[];
}
