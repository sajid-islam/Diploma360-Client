"use client";

import RegistrationModal from "@/components/RegistrationModal/RegistrationModal";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/useAuth";
import Link from "next/link";
import moment from "moment";
import { useGetMyBookingsQuery } from "@/redux/event/eventSlice";
import Loader from "@/components/Loader/Loader";

export default function EventDetailsPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const [event, setEvent] = useState(null);
  const AxiosPublic = useAxiosPublic();
  const [open, setOpen] = useState(false);

  const { data: bookings = [], isLoading } = useGetMyBookingsQuery(user?.email, {
    skip: !user?.email,
  });

  const isBooked = bookings.some((booking) => booking._id === id);

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
          <img src={event.eventImage} alt={event.name} className="w-full h-full object-cover" />
        </div>
      )}

      {/* Event Title & Ticket Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-6 gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold">{event.name}</h1>
          <p className="text-gray-600 mt-2">আয়োজক {event.organizer || "ডিপ্লোমা ৩৬০"}</p>
        </div>
        <div className="text-right">
          <p className="text-lg font-semibold text-gray-800">
            মূল্য: <span className="text-orange-600">{event.fee} টাকা</span>
          </p>
          {!user ? (
            <Link href={`/sign-in?redirect=/events/${id}`}>
              {" "}
              <Button className="mt-2">টিকিট কিনুন</Button>
            </Link>
          ) : (
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button disabled={isBooked || isLoading} className="mt-2">
                  {isLoading ? <Loader /> : isBooked ? "ইতিমধ্যে বুক করা হয়েছে" : " টিকিট কিনুন"}
                </Button>
              </DialogTrigger>
              <RegistrationModal event={event} setOpen={setOpen} />
            </Dialog>
          )}
        </div>
      </div>

      {/* Event Info */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm sm:text-base bg-gray-50 p-6 rounded-xl shadow">
        <div>
          <p className="text-custom-secondary-dark font-bold">
            <span className="font-semibold text-black">📅 তারিখ:</span>{" "}
            {moment(
              event.time ? `${event.date} ${event.time}` : event.date, // if no time, just use date
              event.time ? "YYYY-MM-DD HH:mm" : "YYYY-MM-DD"
            ).format(event.time ? "MMMM Do YYYY, h:mm A" : "MMMM Do YYYY")}
          </p>
          <p>
            <span className="font-semibold">📍 স্থান:</span>{" "}
            {event.location === "online" ? "অনলাইন" : event.location}
          </p>
        </div>
        <div>
          <p>
            <span className="font-semibold">📂 ক্যাটেগরি:</span> {event.category}
          </p>
          <p>
            <span className="font-semibold">🎟 মোট সিটস :</span> {event.numberOfSeats || "Unlimited"}
          </p>
        </div>
        <div>
          <p>
            <span className="font-semibold">💰 রেজিস্ট্রেশন ফি:</span> {event.fee}TK
          </p>
          <p>
            <span className="font-semibold">⏳ শেষ তারিখ:</span>{" "}
            {new Date(event.deadline).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Event Description */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-3">ইভেন্ট সম্পর্কে</h2>
        <p className="text-gray-700 leading-relaxed">{event.description}</p>
      </div>
    </div>
  );
}
