import useAuth from "@/hooks/useAuth";
import { Button } from "./ui/button";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import useAxiosPublic from "@/hooks/useAxiosPublic";

const GoogleAuthBtn = () => {
    const { signInWithGoogle } = useAuth();
    const router = useRouter();
    const AxiosPublic = useAxiosPublic();

    const handleGoogleLogin = async () => {
        const result = await signInWithGoogle();

        const userData = {
            name: result.user.displayName,
            photoURL: result.user.photoURL,
            email: result.user.email,
            uid: result.user.uid,
        };

        const response = await AxiosPublic.post("/api/user", userData);
        const data = response.data;
        console.log(data);

        router.push("/");
    };
    return (
        <Button
            variant="secondary"
            onClick={handleGoogleLogin}
            className="w-full mt-4"
        >
            <FcGoogle size={20} />
            Google দিয়ে সাইন আপ করুন
        </Button>
    );
};

export default GoogleAuthBtn;
