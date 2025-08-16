"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import useAuthRedirect from "@/hooks/useAuthRedirect";
import GoogleAuthBtn from "@/components/GoogleAuthBtn";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/router";
import useAxiosPublic from "@/hooks/useAxiosPublic";

export default function SignInPage() {
    useAuthRedirect();

    const AxiosPublic = useAxiosPublic();

    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target.elements.email.value;
        const password = e.target.elements.password.value;

        await login(email, password);
        await AxiosPublic.post("/api/user/jwt", { email });
        e.target.reset();
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

                <GoogleAuthBtn />

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
