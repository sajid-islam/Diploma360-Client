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

const useAuth = () => {
    const auth = getAuth(app);
    const googleProvider = new GoogleAuthProvider();

    const [user, loading] = useAuthState(auth);

    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    const signInWithGoogle = () => {
        return signInWithPopup(auth, googleProvider);
    };

    const logout = () => {
        return signOut(auth);
    };

    return { createUser, login, loading, user, signInWithGoogle, logout };
};

export default useAuth;
