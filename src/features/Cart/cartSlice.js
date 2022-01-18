import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: [],
  },
  reducers: {
    addToCart(state, action) {
      const newItem = action.payload;
      const index = state.cartItems.findIndex(
        (x) => x.productId === newItem.productId
      );
      if (index >= 0) {
        state.cartItems[index].quantity += newItem.quantity;
      } else {
        state.cartItems.push(newItem);
      }
    },

    setQuantity(state, action) {
      const { productId, quantity } = action.payload;
      const index = state.cartItems.findIndex((x) => x.productId === productId);
      if (index >= 0) {
        state.cartItems[index].quantity = quantity;
      }
    },

    removeFromCart(state, action) {
      const idNeedToRemove = action.payload;
      state.cartItems = state.cartItems.filter(
        (x) => x.productId !== idNeedToRemove
      );
    },

    resetCart(state) {
      state.cartItems = [];
    },
  },
});

const { actions, reducer } = cartSlice;
export const { addToCart, setQuantity, removeFromCart, resetCart } = actions;
export default reducer;
