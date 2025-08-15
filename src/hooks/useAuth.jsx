import app from "@/services/firebase.config";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

const useAuth = () => {
    const auth = getAuth(app);

    const [user, loading] = useAuthState(auth);

    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    return { createUser, login, loading, user };
};

export default useAuth;
