"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { toggleNavbar } from "@/redux/navbar/NavbarSlice";

const NavLinks = () => {
    const pathname = usePathname();
    const isOpen = useSelector((state) => state.navbar.isOpen);
    const dispatch = useDispatch();

    const links = [
        { id: 1, title: "হোম", path: "/" },
        { id: 2, title: "ইভেন্ট", path: "/events" },
        { id: 3, title: "আমার ইভেন্টস", path: "/my-bookings" },
    ];

    return (
        <div className="relative md:static">
            {/* Desktop Links */}
            <ul className="hidden md:flex gap-2">
                {links.map((link) => (
                    <li key={link.id}>
                        <Link
                            className={`px-2 py-1 rounded hover:bg-custom-neutral transition duration-200 ${
                                pathname === link.path && "bg-custom-neutral"
                            }`}
                            href={link.path}
                        >
                            {link.title}
                        </Link>
                    </li>
                ))}
            </ul>

            {/* Mobile Sidebar + Backdrop */}
            <div>
                {/* Backdrop */}
                <div
                    className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
                        isOpen
                            ? "opacity-100 pointer-events-auto"
                            : "opacity-0 pointer-events-none"
                    }`}
                    onClick={() => dispatch(toggleNavbar())}
                ></div>

                {/* Sidebar */}
                <ul
                    className={`flex flex-col gap-2 md:hidden bg-white shadow-md fixed w-60 h-screen top-0 pt-5 rounded-tl-lg rounded-bl-lg z-50 transform transition-transform duration-300 ${
                        isOpen
                            ? "translate-x-0 right-0"
                            : "translate-x-full right-0"
                    }`}
                >
                    {links.map((link) => (
                        <li key={link.id} className="mx-4">
                            <Link
                                href={link.path}
                                onClick={() => dispatch(toggleNavbar())}
                            >
                                <p
                                    className={`w-full px-2 py-1 rounded hover:bg-custom-neutral transition duration-200 ${
                                        pathname === link.path &&
                                        "bg-custom-neutral"
                                    }`}
                                >
                                    {link.title}
                                </p>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default NavLinks;
