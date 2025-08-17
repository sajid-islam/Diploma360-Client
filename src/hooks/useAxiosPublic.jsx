import axios from "axios";

const AxiosPublic = axios.create({
    baseURL: "https://diploma360-server.onrender.com",
    withCredentials: true,
});
const useAxiosPublic = () => {
    return AxiosPublic;
};

export default useAxiosPublic;
