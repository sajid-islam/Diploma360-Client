import app from "@/services/firebase.config";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
} from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import useAxiosPublic from "./useAxiosPublic";
import { useState } from "react";

const useAuth = () => {
    const auth = getAuth(app);
    const googleProvider = new GoogleAuthProvider();
    const AxiosPublic = useAxiosPublic();

    const [user, loading] = useAuthState(auth);
    const [authLoading, setAuthLoading] = useState(false);

    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const login = async (email, password) => {
        setAuthLoading(true);
        const result = await signInWithEmailAndPassword(auth, email, password);
        await AxiosPublic.post("/api/user/jwt", { email: result.user.email });
        setAuthLoading(false);
        return login;
    };

    const signInWithGoogle = async () => {
        setAuthLoading(true);

        const result = await signInWithPopup(auth, googleProvider);
        const email = result.user.email;
        await AxiosPublic.post("/api/user/jwt", { email });
        setAuthLoading(false);

        return result;
    };

    const logout = async () => {
        const logout = await signOut(auth);
        await AxiosPublic.delete("/api/user/logout");
        return logout;
    };

    return {
        createUser,
        login,
        loading,
        user,
        signInWithGoogle,
        logout,
        authLoading,
    };
};

export default useAuth;
