import { configureStore } from "@reduxjs/toolkit";
import authReducer, { getUserProfile } from "../features/authSlice";
import productsReducer from "../features/productsSlice";
import cartReducer from "../features/cartSlice";
import adminReducer from "../features/adminSlice"; // ✅ add admin slice

const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    cart: cartReducer,
    admin: adminReducer, // ✅ now admin exists
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Initialize auth state by fetching user profile if token exists
const userToken = localStorage.getItem("userToken");
if (userToken) {
  store.dispatch(getUserProfile());
}

export default store;
