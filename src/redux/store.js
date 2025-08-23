import { configureStore } from "@reduxjs/toolkit";
import navbarReducer from "./navbar/NavbarSlice";
import { eventApi } from "./event/eventSlice";
import { paymentApi } from "./payment/paymentSlice";

export const store = configureStore({
  reducer: {
    navbar: navbarReducer,
    [eventApi.reducerPath]: eventApi.reducer,
    [paymentApi.reducerPath]: paymentApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(eventApi.middleware),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(paymentApi.middleware),
});
