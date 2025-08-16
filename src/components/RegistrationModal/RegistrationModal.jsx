import {
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import useAuth from "@/hooks/useAuth";

const RegistrationModal = ({ event }) => {
    const { user } = useAuth();
    const handleSubmit = (e) => {};
    return (
        <DialogContent className="sm:max-w-lg">
            <DialogHeader>
                <DialogTitle>Register for {event.eventName}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                <div>
                    <label className="block text-sm font-medium">Name</label>
                    <input
                        type="text"
                        name="name"
                        className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring focus:ring-blue-200"
                        readOnly
                        required
                        value={user?.displayName}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Email</label>
                    <input
                        type="email"
                        name="email"
                        className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring focus:ring-blue-200"
                        readOnly
                        required
                        value={user?.email}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">
                        Phone Number
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
                        Number of Tickets
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
                        Payment Method (optional)
                    </label>
                    <input
                        type="text"
                        name="payment"
                        className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring focus:ring-blue-200"
                    />
                </div>
                <Button type="submit" className="w-full ">
                    Submit Registration
                </Button>
            </form>
        </DialogContent>
    );
};

export default RegistrationModal;
