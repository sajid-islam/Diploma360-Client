"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLinks = () => {
    const pathname = usePathname();
    console.log(pathname);
    const links = [
        { id: 1, title: "হোম", path: "/" },
        { id: 2, title: "ইভেন্ট", path: "/events" },
        { id: 3, title: "আমার ইভেন্টস", path: "/my-bookings" },
    ];
    return (
        <>
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
        </>
    );
};

export default NavLinks;
