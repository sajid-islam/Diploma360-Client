const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
    isOpen: false,
};
const NavbarSlice = createSlice({
    name: "navbar",
    initialState,
    reducers: {
        openNavbar: (state) => {
            state.isOpen = true;
        },
        closeNavbar: (state) => {
            state.isOpen = false;
        },
        toggleNavbar: (state) => {
            state.isOpen = !state.isOpen;
        },
    },
});

export const { openNavbar, closeNavbar, toggleNavbar } = NavbarSlice.actions;
export default NavbarSlice.reducer;
