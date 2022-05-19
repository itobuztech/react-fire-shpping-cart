export interface CartItem {
  id: string;
  productId: string;
  Quantity: number;
}

export interface CartItemRow extends CartItem {
  Price: number;
  ProductName: string;
  Total: number;
}
