import axios from "axios";
import { useEffect } from "react";
import useAuth from "./useAuth";
import { useRouter } from "next/navigation";

const AxiosPrivate = axios.create({
    baseURL: "http://localhost:3001",
    withCredentials: true,
});

const useAxiosPrivate = () => {
    const { logout } = useAuth();
    const router = useRouter();

    useEffect(() => {
        AxiosPrivate.interceptors.response.use(
            (res) => {
                return res;
            },
            async (error) => {
                if (
                    error.response?.status === 401 ||
                    error.response?.status === 403
                ) {
                    await logout();
                    router.push("/sign-in");
                }
            }
        );
    }, []);

    return AxiosPrivate;
};

export default useAxiosPrivate;
