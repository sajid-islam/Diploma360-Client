import axios from "axios";

const AxiosPrivate = axios.create({
    baseURL: "https://diploma360-server.vercel.app",
    withCredentials: true,
});

const useAxiosPrivate = () => {
    return AxiosPrivate;
};

export default useAxiosPrivate;
