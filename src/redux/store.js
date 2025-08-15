import { configureStore } from "@reduxjs/toolkit";
import navbarReducer from "./navbar/NavbarSlice";
import authReducer from "./auth/authSlice";

export const store = configureStore({
    reducer: {
        navbar: navbarReducer,
        auth: authReducer,
    },
});
