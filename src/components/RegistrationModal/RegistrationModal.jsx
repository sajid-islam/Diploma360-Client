import {
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import useAuth from "@/hooks/useAuth";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { useState } from "react";
import { toast } from "sonner";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";

const technologies = [
    "Computer Technology",
    "Electrical Technology",
    "Electronics Technology",
    "Civil Technology",
    "Mechanical Technology",
    "Power Technology",
    "Telecommunication Technology",
    "Architecture Technology",
    "Chemical Technology",
    "Refrigeration & Air Conditioning (RAC) Technology",
    "Textile Technology",
    "Garments Design & Pattern Making (GDPM) Technology",
    "Marine Technology",
    "Automobile Technology",
    "Survey Technology",
    "Environmental Technology",
    "Instrumentation & Process Control Technology",
    "Food Technology",
    "Mining & Mine Survey Technology",
    "Glass & Ceramic Technology",
    "Medical Technology",
];

const RegistrationModal = ({ event, setOpen }) => {
    const { user } = useAuth();
    const AxiosPrivate = useAxiosPrivate();
    const [loading, setLoading] = useState(false);

    // new state to toggle
    const [studyOption, setStudyOption] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const form = e.target;

        const name = form.name.value;
        const email = form.email.value;
        const phone = form.phone.value;
        const studyStatus = form.studyOption.value;

        // collect extra fields only if "want-to-study"
        const sscYear = form.sscYear.value;
        const address = form.address.value;
        const technology = form.technology.value;

        try {
            const registrationData = {
                name,
                email,
                phone,
                studyStatus,
                sscYear,
                address,
                technology,
            };
            console.log(registrationData);

            await AxiosPrivate.post(
                `/api/events/${event._id}/registration`,
                registrationData
            );

            toast.success("Event booked successfully");
            setLoading(false);
            setOpen(false);
            form.reset();
        } catch (error) {
            console.log("Error on registration modal", error);
            if (error.response) {
                toast.error(error.response.data.message);
            } else {
                toast.error("Something went wrong");
            }
            setOpen(false);
            form.reset();
        } finally {
            setLoading(false);
        }
    };

    return (
        <DialogContent className="sm:max-w-lg h-[90vh] overflow-auto">
            <DialogHeader>
                <DialogTitle className="mt-4">
                    <span className="text-custom-secondary-dark">
                        {event.eventName}
                    </span>{" "}
                    জন্য রেজিস্ট্রেশন করুন
                </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                {/* Name */}
                <div>
                    <label className="block text-sm font-medium">নাম</label>
                    <input
                        type="text"
                        name="name"
                        className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring focus:ring-blue-200"
                        readOnly
                        required
                        value={user?.displayName || ""}
                    />
                </div>

                {/* Email */}
                <div>
                    <label className="block text-sm font-medium">ইমেইল</label>
                    <input
                        type="email"
                        name="email"
                        className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring focus:ring-blue-200"
                        readOnly
                        required
                        value={user?.email || ""}
                    />
                </div>

                {/* Phone */}
                <div>
                    <label className="block text-sm font-medium">
                        ফোন নাম্বার
                    </label>
                    <input
                        type="text"
                        name="phone"
                        className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring focus:ring-blue-200"
                        required
                    />
                </div>

                {/* Diploma Study Option */}
                <div>
                    <label className="block text-sm font-medium">
                        আপনি কি ডিপ্লোমায় পড়াশোনা করছেন নাকি করতে চান?
                    </label>
                    <select
                        name="studyOption"
                        value={studyOption}
                        onChange={(e) => setStudyOption(e.target.value)}
                        className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring focus:ring-blue-200"
                        required
                    >
                        <option value="">-- সিলেক্ট করুন --</option>
                        <option value="already-studying">
                            ইতিমধ্যেই পড়াশোনা করছেন
                        </option>
                        <option value="want-to-study">
                            ডিপ্লোমায় পড়তে চান
                        </option>
                    </select>
                </div>

                {/* Extra fields only if want-to-study */}
                {studyOption === "want-to-study" && (
                    <>
                        <div>
                            <label className="block text-sm font-medium">
                                এসএসসি পাশের বছর
                            </label>
                            <input
                                type="number"
                                name="sscYear"
                                className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring focus:ring-blue-200"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">
                                ঠিকানা
                            </label>
                            <input
                                type="text"
                                name="address"
                                className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring focus:ring-blue-200"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">
                                কোন টেকনোলজি পড়তে চান?
                            </label>
                            <Select
                                id="technology"
                                name="technology"
                                required
                                className="w-full"
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select your technology" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {technologies.map((tech, index) => (
                                            <SelectItem
                                                key={index}
                                                value={tech}
                                            >
                                                {tech}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </>
                )}

                {/* Submit */}
                <Button
                    disabled={loading}
                    type="submit"
                    className="w-full bg-custom-secondary hover:bg-custom-secondary/90"
                >
                    {loading ? "সাবমিট হচ্ছে" : "সাবমিট রেজিস্ট্রেশন"}
                </Button>
            </form>
        </DialogContent>
    );
};

export default RegistrationModal;
