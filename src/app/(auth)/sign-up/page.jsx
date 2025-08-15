"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import useAuth from "@/hooks/useAuth";
import { updateProfile } from "firebase/auth";
import { useRouter } from "next/navigation";
import useAuthRedirect from "@/hooks/useAuthRedirect";

export default function SignUpPage() {
    useAuthRedirect();

    const { createUser, loading } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target.elements.email.value;
        const password = e.target.elements.password.value;
        const name = e.target.elements.name.value;
        try {
            const result = await createUser(email, password);
            await updateProfile(result.user, {
                displayName: name,
                photoURL: `https://api.dicebear.com/9.x/glass/svg?seed=${result.user.uid}`,
            });

            e.target.reset();
            router.replace("/");
        } catch (error) {
            console.error("SignUP Error", error);
        }
    };

    const handleGoogleLogin = () => {
        // TODO: Add Google login functionality
        console.log("Google login clicked");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-md">
                <h2 className="text-3xl font-bold mb-6 text-gray-900">
                    সাইন আপ করুন
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Label htmlFor="name">নাম</Label>
                        <Input
                            id="name"
                            type="text"
                            placeholder="আপনার নাম লিখুন"
                            className="mt-1"
                        />
                    </div>
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
                    <Button
                        disabled={loading}
                        type="submit"
                        className="w-full mt-6"
                    >
                        {loading ? "সাইন আপ...." : "সাইন আপ"}
                    </Button>
                </form>

                <Button
                    variant="secondary"
                    onClick={handleGoogleLogin}
                    className="w-full mt-4"
                >
                    <FcGoogle size={20} />
                    Google দিয়ে সাইন আপ করুন
                </Button>

                <p className="mt-4 text-sm text-gray-600 text-center">
                    ইতিমধ্যেই একাউন্ট আছে?{" "}
                    <Link
                        href="/sign-in"
                        className="text-custom-primary font-semibold"
                    >
                        লগ ইন করুন
                    </Link>
                </p>
            </div>
        </div>
    );
}
