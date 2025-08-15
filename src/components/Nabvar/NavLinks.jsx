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
        <ul className="flex gap-2">
            {links.map((link) => (
                <li key={link.id} className="">
                    <Link
                        className={`px-1 ${
                            pathname === link.path &&
                            "border-b border-yellow-500 font-semibold text-yellow-500"
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
