"use client";
import { useState, useEffect } from "react";
import useAxiosPrivate from "./useAxiosPrivate";
import useAuth from "./useAuth";

const useIsAdmin = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading] = useAuth();
    console.log(isAdmin);
    const AxiosPrivate = useAxiosPrivate();

    useEffect(() => {
        const checkAdmin = async () => {
            try {
                if (!loading) {
                    const res = await AxiosPrivate.get("/api/user/is-admin");
                    const data = await res.data;
                    setIsAdmin(data.isAdmin);
                }
            } catch (error) {
                console.error("Admin check failed:", error);
                setIsAdmin(false);
            }
        };

        checkAdmin();
    }, []);

    return { isAdmin };
};

export default useIsAdmin;
