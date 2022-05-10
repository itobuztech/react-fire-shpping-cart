import { createSlice, configureStore } from '@reduxjs/toolkit';
import { ICart } from 'Interface/cart.interface';

const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItem: [] as ICart[]
  },
  reducers: {
    addToCart: (state, { payload }: { payload: ICart }) => {
      state.cartItem = state.cartItem.map((cart) => {

        if (cart.id !== payload.id) {
          return cart;
        }
        return {
          ...cart,
          added: true,
        };

      }
     );
    },

  }
});

export default CartSlice;
export const cartSliceAction = CartSlice.actions;
