"use client";

import GoogleAuthBtn from "@/components/GoogleAuthBtn";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useAuth from "@/hooks/useAuth";
import useAuthRedirect from "@/hooks/useAuthRedirect";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

export default function SignInPage() {
  useAuthRedirect();

  const { login, authLoading, setAuthLoading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  const redirect = searchParams.get("redirect") || "/";

  // Normal login
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const email = e.target.elements.email.value;
      const password = e.target.elements.password.value;

      await login(email, password);
      e.target.reset();
      router.push(redirect);
    } catch (error) {
      if (error.message === "Firebase: Error (auth/invalid-credential).") {
        toast.error("Incorrect email or password");
      } else {
        toast.error("Something went wrong");
      }
      setAuthLoading(false);
    }
  };

  // Quick login handler
  const handleQuickLogin = async (email, password) => {
    try {
      await login(email, password);
      router.push(redirect);
    } catch (error) {
      toast.error("Quick login failed");
      setAuthLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-gray-900">সাইন ইন করুন</h2>

        {/* Email / Password Login */}
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

          {/* Login Button*/}
          <Button disabled={authLoading} type="submit" className="w-full mt-4">
            {authLoading ? "লগ ইন হচ্ছে..." : "লগ ইন"}
          </Button>
        </form>

        {/* Quick Login Buttons*/}
        <div className="flex gap-2 mt-4">
          <Button
            variant="outline"
            disabled={authLoading}
            className="flex-1"
            onClick={() => handleQuickLogin("admin@gmail.com", "123456")}
          >
            Admin
          </Button>

          <Button
            variant="outline"
            disabled={authLoading}
            className="flex-1"
            onClick={() => handleQuickLogin("organizer@gmail.com", "123456")}
          >
            Organizer
          </Button>

          <Button
            variant="outline"
            disabled={authLoading}
            className="flex-1"
            onClick={() => handleQuickLogin("student@gmail.com", "123456")}
          >
            Student
          </Button>
        </div>

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
