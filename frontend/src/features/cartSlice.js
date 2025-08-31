


import { createSlice } from "@reduxjs/toolkit";

// ✅ Load from localStorage if available
const storedCart = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const initialState = {
  items: storedCart,
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.items.find((x) => x._id === item._id);

      if (existingItem) {
        state.items = state.items.map((x) =>
          x._id === existingItem._id
            ? { ...x, quantity: x.quantity + 1 }
            : x
        );
      } else {
        state.items.push({ ...item, quantity: 1 });
      }

      // ✅ Save to localStorage
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((x) => x._id !== action.payload);

      // ✅ Save to localStorage
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      state.items = state.items.map((item) =>
        item._id === id ? { ...item, quantity } : item
      );

      // ✅ Save to localStorage
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem("cartItems"); // ✅ clear storage too
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
