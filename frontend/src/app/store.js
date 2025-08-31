


import { configureStore } from "@reduxjs/toolkit";
import authReducer, { getUserProfile } from "../features/authSlice";
import productsReducer from "../features/productsSlice";
import cartReducer from "../features/cartSlice";
import adminReducer from "../features/adminSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    cart: cartReducer,
    admin: adminReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, 
    }),
});


const token = localStorage.getItem("userToken");
if (token) {
  store.dispatch(getUserProfile());
}

export default store;

