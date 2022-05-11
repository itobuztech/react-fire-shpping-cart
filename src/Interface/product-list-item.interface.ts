export interface ProductListItem {
  title: string;
  description: string;
  productImage: string;
  category: string;
  quantity: number;
  actualPrice: number;
  discountedPrice?: number;
  id: string;
}