"use client";

import RegistrationModal from "@/components/RegistrationModal/RegistrationModal";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/useAuth";
import Link from "next/link";

export default function EventDetailsPage() {
    const { id } = useParams();
    const { user } = useAuth();
    const [event, setEvent] = useState(null);
    const AxiosPublic = useAxiosPublic();
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const response = await AxiosPublic.get(`/api/events/${id}`);
            const data = await response.data;
            setEvent(data);
        };
        fetchData();
    }, [id]);

    if (!event) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p className="text-lg">ইভেন্টের তথ্য লোড হচ্ছে...</p>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto p-4 sm:p-6 md:p-8">
            {/* Event Cover Image */}
            {event.eventImage && (
                <div className="relative w-full h-72 sm:h-96 md:h-[420px] rounded-xl overflow-hidden shadow-md">
                    <img
                        src={event.eventImage}
                        alt={event.name}
                        className="w-full h-full object-cover"
                    />
                </div>
            )}

            {/* Event Title & Ticket Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-6 gap-4">
                <div>
                    <h1 className="text-3xl sm:text-4xl font-bold">
                        {event.name}
                    </h1>
                    <p className="text-gray-600 mt-2">
                        আয়োজক {event.organizer || "সিটি পলিটেকনিক ইনস্টিটিউট"}
                    </p>
                </div>
                <div className="text-right">
                    <p className="text-lg font-semibold text-gray-800">
                        মূল্য: <span className="text-orange-600">200 টাকা</span>
                    </p>
                    {!user ? (
                        <Link href={`/sign-in?redirect=/events/${id}`}>
                            {" "}
                            <Button className="mt-2">টিকিট কিনুন</Button>
                        </Link>
                    ) : (
                        <Dialog open={open} onOpenChange={setOpen}>
                            <DialogTrigger asChild>
                                <Button className="mt-2">টিকিট কিনুন</Button>
                            </DialogTrigger>
                            <RegistrationModal
                                event={event}
                                setOpen={setOpen}
                            />
                        </Dialog>
                    )}
                </div>
            </div>

            {/* Event Info */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm sm:text-base bg-gray-50 p-6 rounded-xl shadow">
                <div>
                    <p>
                        <span className="font-semibold">📅 তারিখ:</span>{" "}
                        {new Date(event.date).toLocaleDateString()}
                    </p>
                    <p>
                        <span className="font-semibold">📍 স্থান:</span>{" "}
                        {event.location}
                    </p>
                </div>
                <div>
                    <p>
                        <span className="font-semibold">📂 ক্যাটেগরি:</span>{" "}
                        {event.category}
                    </p>
                    <p>
                        <span className="font-semibold">🎟 মোট সিটস :</span>{" "}
                        {event.numberOfSeats}
                    </p>
                </div>
                <div>
                    <p>
                        <span className="font-semibold">
                            💰 রেজিস্ট্রেশন ফি:
                        </span>{" "}
                        200TK
                    </p>
                    <p>
                        <span className="font-semibold">⏳ শেষ তারিখ:</span>{" "}
                        {event.deadline
                            ? new Date(event.deadline).toLocaleDateString()
                            : "Not specified"}
                    </p>
                </div>
            </div>

            {/* Event Description */}
            <div className="mt-10">
                <h2 className="text-2xl font-semibold mb-3">ইভেন্ট সম্পর্কে</h2>
                <p className="text-gray-700 leading-relaxed">
                    {event.description}
                </p>
            </div>

            {/* Online Event Link */}
            {event.eventLink && (
                <div className="mt-8">
                    <h2 className="text-2xl font-semibold mb-2">
                        অনলাইনে যোগদান করুন
                    </h2>
                    <a
                        href={event.eventLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                    >
                        ইভেন্টে যোগ দিতে এখানে ক্লিক করুন
                    </a>
                </div>
            )}
        </div>
    );
}
