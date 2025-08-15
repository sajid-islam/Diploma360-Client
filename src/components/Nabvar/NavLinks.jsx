"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";

const NavLinks = () => {
    const pathname = usePathname();
    const isOpen = useSelector((state) => state.navbar.isOpen);
    console.log(isOpen);
    const links = [
        { id: 1, title: "হোম", path: "/" },
        { id: 2, title: "ইভেন্ট", path: "/events" },
        { id: 3, title: "আমার ইভেন্টস", path: "/my-bookings" },
    ];
    return (
        <ul className="flex gap-2">
            {links.map((link) => (
                <li key={link.id} className="">
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
    );
};

export default NavLinks;
