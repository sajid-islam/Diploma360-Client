import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import useAuth from "@/hooks/useAuth";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import moment from "moment";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import BkashPaymentSection from "./BkashPaymentSection";

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
  const [studyOption, setStudyOption] = useState("");
  // const [transactionId, setTransactionId] = useState("");

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const phone = form.phone.value;
    const studyStatus = form.studyOption.value;
    const transactionId = form.transactionId?.value;

    const sscYear = form.sscYear?.value;
    const address = form.address?.value;
    const targetTechnology = form.targetTechnology?.value;

    if (event.fee > 0) {
      if (!transactionId || !/^[A-Za-z0-9]{8,16}$/.test(transactionId.trim())) {
        toast.error("সঠিক ট্রান্স্যাকশন আইডি দিন (৮–১৬ অক্ষর/সংখ্যা)।");
        setLoading(false);
        return;
      }
    }

    try {
      const registrationData = {
        name,
        email,
        phone,
        studyStatus,
        sscYear,
        address,
        targetTechnology,
      };

      if (event.fee > 0) {
        registrationData.paymentMethod = "bkash";
        registrationData.transactionId = transactionId.trim().toUpperCase();
      }

      await AxiosPrivate.post(
        `/api/events/${event._id}/registration`,
        registrationData
      );

      toast.success("পেমেন্ট ইনফো সাবমিট হয়েছে 🎉 আমরা যাচাই করছি।");
      setOpen(false);
      form.reset();
    } catch (error) {
      console.log("Error on registration modal", error.response);
      if (error.response.status === 409) {
        toast.error("এই ইভেন্টটি ইতিমধ্যেই বুক করা আছে");
      } else {
        toast.error("কিছু সমস্যা হয়েছে, পরে আবার চেষ্টা করুন।");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <DialogContent className="sm:max-w-lg h-[90vh] overflow-auto">
      <DialogHeader>
        <DialogTitle className="mt-4">
          <span className="text-custom-secondary-dark">{event.eventName}</span>{" "}
          জন্য রেজিস্ট্রেশন করুন
        </DialogTitle>
      </DialogHeader>

      <form onSubmit={handlePayment} className="space-y-4 mt-4">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium">নাম</label>
          <input
            type="text"
            name="name"
            className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring focus:ring-pink-200"
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
            className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring focus:ring-pink-200"
            readOnly
            required
            value={user?.email || ""}
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium">ফোন নাম্বার</label>
          <input
            type="text"
            name="phone"
            className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring focus:ring-pink-200"
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
            className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring focus:ring-pink-200"
            required
          >
            <option value="">-- সিলেক্ট করুন --</option>
            <option value="already-studying">ইতিমধ্যেই পড়াশোনা করছেন</option>
            <option value="want-to-study">ডিপ্লোমায় পড়তে চান</option>
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
                min={moment().year() - 15}
                max={moment().year()}
                className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring focus:ring-pink-200"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">ঠিকানা</label>
              <input
                type="text"
                name="address"
                className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring focus:ring-pink-200"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">
                কোন টেকনোলজি পড়তে চান?
              </label>
              <Select
                id="targetTechnology"
                name="targetTechnology"
                required
                className="w-full"
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select your technology" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {technologies.map((tech, index) => (
                      <SelectItem key={index} value={tech}>
                        {tech}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </>
        )}

        {/* --- bKash Themed Payment Section --- */}
        {event.fee > 0 && <BkashPaymentSection event={event} />}

        {/* Payment Button (replaces Submit) */}
        <Button
          disabled={loading}
          type="submit"
          className="w-full bg-[#E2136E] hover:bg-[#c80f5f]"
        >
          {loading
            ? "প্রসেস হচ্ছে..."
            : event.fee > 0
            ? "পেমেন্ট তথ্য সাবমিট করুন"
            : "ফ্রি রেজিস্ট্রেশন করুন"}
        </Button>

        <p className="text-[11px] text-gray-500 text-center">
          পেমেন্ট ভেরিফাই হতে কিছু সময় লাগতে পারে। সমস্যায় পড়লে আয়োজকের সাথে
          যোগাযোগ করুন।
        </p>
      </form>
    </DialogContent>
  );
};

export default RegistrationModal;
