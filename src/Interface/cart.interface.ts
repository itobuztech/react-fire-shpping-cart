export interface CartInterface {
  id: string,
  quantity: number;
  title: string;
  productImage?: string;
  discountedPrice: number;
  total: number;
}