import axios from "axios";

const AxiosPrivate = axios.create({
    baseURL: "http://localhost:3001",
    withCredentials: true,
});

const useAxiosPrivate = () => {
    return AxiosPrivate;
};

export default useAxiosPrivate;
