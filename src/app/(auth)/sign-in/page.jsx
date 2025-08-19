"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import useAuthRedirect from "@/hooks/useAuthRedirect";
import GoogleAuthBtn from "@/components/GoogleAuthBtn";
import useAuth from "@/hooks/useAuth";
import { useRouter, useSearchParams } from "next/navigation";

export default function SignInPage() {
    useAuthRedirect();

    const { login, authLoading, setAuthLoading } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();

    const redirect = searchParams.get("redirect") || "/";

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target.elements.email.value;
        const password = e.target.elements.password.value;

        await login(email, password);
        e.target.reset();
        router.push(redirect);
    };

    const handleAdminLogin = async (e) => {
        try {
            const adminEmail = "admin@gmail.com";
            const adminPassword = "123456";
            await login(adminEmail, adminPassword);
            console.log(adminEmail, adminPassword);
            router.push(redirect);
        } catch (error) {
            setAuthLoading(false);
        }
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
                    <div className="flex gap-2 mt-6">
                        <Button
                            disabled={authLoading}
                            type="submit"
                            className="flex-1"
                        >
                            {authLoading ? "লগ ইন হচ্ছে" : "লগ ইন"}
                        </Button>
                        <Button
                            disabled={authLoading}
                            onClick={handleAdminLogin}
                            className=""
                        >
                            {authLoading ? "লগ ইন হচ্ছে" : "লগ ইন অ্যাডমিন"}
                        </Button>
                    </div>
                </form>

                <GoogleAuthBtn />

                <p className="mt-4 text-sm text-gray-600 text-center">
                    একাউন্ট নেই?{" "}
                    <Link
                        href={`/sign-up?redirect=${redirect}`}
                        className="text-custom-primary font-semibold"
                    >
                        সাইন আপ করুন
                    </Link>
                </p>
            </div>
        </div>
    );
}
