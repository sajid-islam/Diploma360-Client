import { configureStore } from "@reduxjs/toolkit";
import navbarReducer from "./navbar/NavbarSlice";
import { eventApi } from "./event/eventSlice";

export const store = configureStore({
  reducer: {
    navbar: navbarReducer,
    [eventApi.reducerPath]: eventApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(eventApi.middleware),
});
