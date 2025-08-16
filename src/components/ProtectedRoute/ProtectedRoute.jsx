import useAuth from "@/hooks/useAuth";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (!loading && !user) {
            router.push(`/sign-in?redirect=${pathname}`);
        }
    }, [user, loading, router, pathname]);
    return <>{children}</>;
};

export default ProtectedRoute;
