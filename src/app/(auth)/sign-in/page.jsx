"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import useAuthRedirect from "@/hooks/useAuthRedirect";

export default function SignInPage() {
    useAuthRedirect();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Empty submit handler for now
    };

    const handleGoogleLogin = () => {
        // TODO: Add Google login functionality
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-md">
                <h2 className="text-3xl font-bold mb-6 text-gray-900">
                    সাইন ইন করুন
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Label htmlFor="email">ইমেইল</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="আপনার ইমেইল লিখুন"
                            className="mt-1"
                        />
                    </div>
                    <div>
                        <Label htmlFor="password">পাসওয়ার্ড</Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="আপনার পাসওয়ার্ড লিখুন"
                            className="mt-1"
                        />
                    </div>
                    <Button type="submit" className="w-full mt-6 ">
                        লগ ইন
                    </Button>
                </form>

                <Button
                    variant="secondary"
                    onClick={handleGoogleLogin}
                    className="w-full mt-4"
                >
                    <FcGoogle size={20} />
                    Google দিয়ে লগইন করুন
                </Button>

                <p className="mt-4 text-sm text-gray-600 text-center">
                    একাউন্ট নেই?{" "}
                    <Link
                        href="/sign-up"
                        className="text-custom-primary font-semibold"
                    >
                        সাইন আপ করুন
                    </Link>
                </p>
            </div>
        </div>
    );
}
