"use client";
import useAuth from "@/hooks/useAuth";
import { Button } from "../ui/button";
import NavLinks from "./NavLinks";
import NavbarToggleBtn from "./NavbarToggleBtn";
import UserButton from "../UserButton/UserButton";
import Link from "next/link";

const Navbar = () => {
    const { user } = useAuth();
    return (
        <div className="px-5 h-16 flex items-center justify-between">
            <div>
                <Link href={"/"} className="text-2xl font-semibold">
                    <span>ডিপ্লোমা </span>
                    <span className="text-custom-primary font-extrabold">
                        ৩৬০
                    </span>
                </Link>
            </div>
            <div className="flex items-center gap-4">
                <NavLinks />
                <div>
                    {user ? (
                        <UserButton />
                    ) : (
                        <>
                            {" "}
                            <div className="flex items-center gap-1">
                                <Button size="sm">
                                    {" "}
                                    <Link href="sign-in">লগ ইন</Link>
                                </Button>
                                <Button
                                    size="sm"
                                    className="bg-transparent hover:bg-transparent text-black border-2 border-black px-2 py-1 text-sm hidden md:block "
                                >
                                    <Link href="/sign-up">সাইন আপ</Link>
                                </Button>
                                <div>
                                    <NavbarToggleBtn />
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
