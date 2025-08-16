"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useAuth from "./useAuth";

const useAuthRedirect = () => {
    const router = useRouter();
    const { user } = useAuth();

    useEffect(() => {
        if (user) {
            return router.replace("/");
        }
    }, [user, router]);
};

export default useAuthRedirect;
