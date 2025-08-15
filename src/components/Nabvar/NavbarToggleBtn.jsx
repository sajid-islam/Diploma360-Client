"use client";
import { toggleNavbar } from "@/redux/navbar/NavbarSlice";
import { CiMenuFries } from "react-icons/ci";
import { useDispatch } from "react-redux";

const NavbarToggleBtn = () => {
    const dispatch = useDispatch();
    return (
        <button className="md:hidden" onClick={() => dispatch(toggleNavbar())}>
            <CiMenuFries size={20} />
        </button>
    );
};

export default NavbarToggleBtn;
