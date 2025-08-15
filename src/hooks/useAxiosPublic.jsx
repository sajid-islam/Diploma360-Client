import axios from "axios";

const AxiosPublic = axios.create({
    baseURL: "http://localhost:3001",
});
const useAxiosPublic = () => {
    return AxiosPublic;
};

export default useAxiosPublic;
