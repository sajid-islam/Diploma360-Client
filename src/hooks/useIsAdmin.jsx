"use client";
import { useState, useEffect } from "react";
import useAxiosPrivate from "./useAxiosPrivate";
import useAuth from "./useAuth";

const useIsAdmin = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    const { loading, user } = useAuth();
    const AxiosPrivate = useAxiosPrivate();

    useEffect(() => {
        if (loading || !user) return; // wait until user is ready

        const checkAdmin = async () => {
            try {
                const res = await AxiosPrivate.get("/api/user/is-admin");
                setIsAdmin(res.data.isAdmin);
            } catch (error) {
                if (error.response?.status === 401) {
                    console.warn("Token not available, please login again");
                }
                console.error("Admin check failed:", error);
                setIsAdmin(false);
            }
        };

        checkAdmin();
    }, [loading, user, AxiosPrivate]); // ✅ include necessary deps

    return { isAdmin };
};

export default useIsAdmin;
