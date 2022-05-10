export interface ProductListItem {
  id:number;
  categoryName: any;
  title: string;
  description: string;
  image: string;
  category: string;
  quantity: string;
  actualPrice: number;
  discountedPrice?: number;
}