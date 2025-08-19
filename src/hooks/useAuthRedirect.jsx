"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import useAuth from "./useAuth";

const useAuthRedirect = () => {
    const router = useRouter();
    const { user } = useAuth();
    const searchParams = useSearchParams();
    const redirect = searchParams.get("redirect" || "/");

    useEffect(() => {
        if (user) {
            return router.push(redirect);
        }
    }, [user, router]);
};

export default useAuthRedirect;
