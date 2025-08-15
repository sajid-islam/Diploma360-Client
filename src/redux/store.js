import { configureStore } from "@reduxjs/toolkit";
import navbarReducer from "./navbar/NavbarSlice";

export const store = configureStore({
    reducer: {
        navbar: navbarReducer,
    },
});
