"use client";

import { FaUser, FaSignOutAlt, FaTachometerAlt } from "react-icons/fa";
import { useState } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";

export default function UserButton() {
    const [open, setOpen] = useState(false);
    const { user, logout } = useAuth();
    const router = useRouter();

    const handleLogout = () => {
        logout();
    };

    return (
        <div className="relative">
            {/* Avatar */}
            <button
                onClick={() => setOpen(!open)}
                className="flex items-center justify-center w-10 h-10 rounded-full overflow-hidden border-2 border-[#ffcd33] focus:outline-none"
            >
                <img
                    src={
                        user.photoURL
                            ? user.photoURL
                            : "https://api.dicebear.com/9.x/glass/svg?seed=Wyatt"
                    }
                    alt={user.name}
                    className="w-full h-full object-cover"
                />
            </button>

            {/* Dropdown Menu */}
            {open && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 z-50">
                    <div className="px-4 py-2 text-sm font-semibold text-gray-700 border-b">
                        {user.name}
                    </div>
                    <button
                        onClick={() => router.push("/profile")}
                        className="flex items-center w-full px-4 py-2 text-sm hover:bg-gray-100"
                    >
                        <FaUser className="mr-2" /> প্রোফাইল
                    </button>
                    <button
                        onClick={() => router.push("/dashboard")}
                        className="flex items-center w-full px-4 py-2 text-sm hover:bg-gray-100"
                    >
                        <FaTachometerAlt className="mr-2" /> ড্যাশবোর্ড
                    </button>
                    <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                        <FaSignOutAlt className="mr-2" /> লগ আউট
                    </button>
                </div>
            )}
        </div>
    );
}
