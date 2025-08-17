import axios from "axios";

const AxiosPublic = axios.create({
    baseURL: "https://diploma360-server.vercel.app",
    withCredentials: true,
});
const useAxiosPublic = () => {
    return AxiosPublic;
};

export default useAxiosPublic;
