import {
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import useAuth from "@/hooks/useAuth";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { useState } from "react";

const RegistrationModal = ({ event, setOpen }) => {
    const { user } = useAuth();
    const AxiosPrivate = useAxiosPrivate();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const phone = form.phone.value;
        const numberOfSeats = form.tickets.value;
        const paymentMethod = form.payment.value || "unknown";

        try {
            const registrationData = {
                name,
                email,
                phone,
                numberOfSeats,
                paymentMethod,
            };

            const response = await AxiosPrivate.post(
                `/api/events/${event._id}/registration`,
                registrationData
            );
            const data = await response.data;
            console.log(data);

            setLoading(false);
            setOpen(false);
            form.reset();
        } catch (error) {
            setLoading(false);
            console.log("Error on registration modal", error);
        }
    };
    return (
        <DialogContent className="sm:max-w-lg">
            <DialogHeader>
                <DialogTitle className="mt-4">
                    <span className="text-custom-secondary-dark">
                        {event.eventName}
                    </span>{" "}
                    জন্য রেজিস্ট্রেশন করুন
                </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
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
                <div>
                    <label className="block text-sm font-medium">
                        মোট টিকিট
                    </label>
                    <input
                        type="number"
                        name="tickets"
                        min="1"
                        className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring focus:ring-blue-200"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">
                        পেমেন্ট মেথড (অফশনাল)
                    </label>
                    <input
                        type="text"
                        name="payment"
                        className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring focus:ring-blue-200"
                    />
                </div>
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
