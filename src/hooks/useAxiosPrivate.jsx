import axios from "axios";
import { useEffect } from "react";
import useAuth from "./useAuth";
import { useRouter } from "next/navigation";

const AxiosPrivate = axios.create({
    baseURL: "https://diploma360-server.onrender.com",
    withCredentials: true,
});

const useAxiosPrivate = () => {
    const { logout } = useAuth();
    const router = useRouter();

    useEffect(() => {
        // Use the instance for interceptor
        const responseInterceptor = AxiosPrivate.interceptors.response.use(
            (res) => res,
            (error) => {
                if (
                    error.response?.status === 401 ||
                    error.response?.status === 403
                ) {
                    logout().then(() => {
                        router.push("/sign-in");
                    });
                }
                return Promise.reject(error);
            }
        );

        // Cleanup interceptor on unmount
        return () => {
            AxiosPrivate.interceptors.response.eject(responseInterceptor);
        };
    }, [logout, router]);

    return AxiosPrivate;
};

export default useAxiosPrivate;
