"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import useAuth from "@/hooks/useAuth";
import { sendEmailVerification, updateProfile } from "firebase/auth";
import { useRouter, useSearchParams } from "next/navigation";
import useAuthRedirect from "@/hooks/useAuthRedirect";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import GoogleAuthBtn from "@/components/GoogleAuthBtn";
import { toast } from "sonner";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { useState } from "react";

export default function SignUpPage() {
  useAuthRedirect();

  const AxiosPublic = useAxiosPublic();
  const { createUser, emailVerification, authLoading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";

  const [showPassword, setShowPassword] = useState(false);

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
      await sendEmailVerification(result.user).then(() => console.log("Email verification sent"));

      const userData = {
        name: result.user.displayName,
        photoURL: result.user.photoURL,
        email: result.user.email,
        uid: result.user.uid,
      };

      await AxiosPublic.post("/api/user", userData);

      router.push(redirect);
      e.target.reset();
    } catch (error) {
      console.error("SignUP Error", error);
      if (error.message === "Firebase: Error (auth/email-already-in-use).") {
        toast("An account already exists. Did you mean to log in?", {
          action: {
            label: "Login",
            onClick: () => router.push("/sign-in"),
          },
        });
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-gray-900">সাইন আপ করুন</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">নাম</Label>
            <Input id="name" type="text" placeholder="আপনার নাম লিখুন" className="mt-1" required />
          </div>
          <div>
            <Label htmlFor="email">ইমেইল</Label>
            <Input
              id="email"
              type="email"
              placeholder="আপনার ইমেইল লিখুন"
              className="mt-1"
              required
            />
          </div>
          <div>
            <Label htmlFor="password">পাসওয়ার্ড</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="আপনার পাসওয়ার্ড লিখুন"
                className="mt-1 pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <IoMdEyeOff size={18} /> : <IoMdEye size={18} />}
              </button>
            </div>
          </div>
          <Button disabled={authLoading} type="submit" className="w-full mt-6">
            {authLoading ? "সাইন আপ হচ্ছে" : "সাইন আপ"}
          </Button>
        </form>

        <GoogleAuthBtn />

        <p className="mt-4 text-sm text-gray-600 text-center">
          ইতিমধ্যেই একাউন্ট আছে?{" "}
          <Link href="/sign-in" className="text-custom-primary font-semibold">
            লগ ইন করুন
          </Link>
        </p>
      </div>
    </div>
  );
}
