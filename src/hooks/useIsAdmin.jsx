"use client";
import { useState, useEffect } from "react";
import useAxiosPrivate from "./useAxiosPrivate";
import useAuth from "./useAuth";

const useIsAdmin = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const { loading, user } = useAuth();

  const AxiosPrivate = useAxiosPrivate();

  useEffect(() => {
    if (loading || !user) return;
    const checkAdmin = async () => {
      try {
        const res = await AxiosPrivate.get("/api/user/is-admin");

        setIsAdmin(res.data.isAdmin);
      } catch (error) {
        console.error("Admin check failed:", error);
        setIsAdmin(false);
      }
    };

    const timer = setTimeout(checkAdmin, 2000);
    return () => clearTimeout(timer);
  }, [loading, AxiosPrivate, user]);

  return { isAdmin };
};

export default useIsAdmin;
