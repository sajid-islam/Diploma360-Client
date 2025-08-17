"use client";
import { useState, useEffect } from "react";
import useAxiosPrivate from "./useAxiosPrivate";

const useIsAdmin = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);
    console.log(isAdmin);
    const AxiosPrivate = useAxiosPrivate();

    useEffect(() => {
        const checkAdmin = async () => {
            try {
                const res = await AxiosPrivate.get("/api/user/is-admin");
                setIsAdmin(res.data.isAdmin);
            } catch (error) {
                console.error("Admin check failed:", error);
                setIsAdmin(false);
            } finally {
                setLoading(false);
            }
        };

        checkAdmin();
    }, []);

    return { isAdmin, loading };
};

export default useIsAdmin;
