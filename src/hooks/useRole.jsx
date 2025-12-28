"use client";

import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { useEffect, useState } from "react";

export default function useRole() {
  const axiosPrivate = useAxiosPrivate();
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const fetchRole = async () => {
      try {
        const res = await axiosPrivate.get("/api/user/me");
        if (mounted) setRole(res.data.role);
      } catch (error) {
        if (mounted) setRole(null);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchRole();

    return () => {
      mounted = false;
    };
  }, [axiosPrivate]);

  return {
    role,
    loading,
    isStudent: role === "student",
    isOrganizer: role === "organizer",
    isSuperAdmin: role === "super_admin",
  };
}
