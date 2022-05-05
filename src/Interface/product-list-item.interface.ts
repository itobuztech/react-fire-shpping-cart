export interface ProductListItem {
  title: string;
  description: string;
  image: string;
  category: string;
  quantity: string;
  actualPrice: number;
  discountedPrice?: number;
}