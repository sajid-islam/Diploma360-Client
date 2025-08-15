import { Ghost } from "lucide-react";
import { Button } from "../ui/button";
import NavLinks from "./NavLinks";

const Navbar = () => {
    return (
        <div className="px-5 h-16 flex items-center justify-between">
            <div>
                <h1 className="text-xl font-semibold">
                    <span>ডিপ্লোমা </span>
                    <span>৩৬০</span>
                </h1>
            </div>
            <div className="flex items-center gap-4">
                <NavLinks />
                <div className="flex gap-1">
                    <Button
                        size="sm"
                        className="bg-transparent hover:bg-transparent text-black border-2 border-black px-2 py-1 text-sm "
                    >
                        লগ ইন
                    </Button>
                    <Button size="sm">সাইন ইন</Button>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
