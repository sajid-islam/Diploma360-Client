"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/useAuth";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
import ReviewModal from "@/components/ReviewModal/ReviewModal";
import { useGetMyBookingsQuery } from "@/redux/event/eventSlice";
import Loader from "@/components/Loader/Loader";
import moment from "moment";
import { toast } from "sonner";

const MyEventPage = () => {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [selectedDialogId, setSelectedDialogId] = useState(null);

  const handleOpenModal = (eventId, paymentStatus) => {
    if (paymentStatus !== "accepted") {
      toast.error("You are not allowed to review this event");
      return;
    }
    setSelectedDialogId(eventId);
    setOpen(true);
  };

  const { data: bookings = [], error, isLoading } = useGetMyBookingsQuery(user?.email);

  return (
    <ProtectedRoute>
      <div className="max-w-5xl mx-auto p-4 md:p-8">
        <h2 className="text-2xl font-semibold mb-4">আমার বুক করা ইভেন্টগুলি</h2>
        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="flex h-full w-full justify-center items-center">
              {" "}
              <Loader />
            </div>
          ) : (
            <Table className="min-w-full border rounded-lg">
              <TableCaption>আপনার ইভেন্ট বুকিংয়ের একটি তালিকা</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[200px]">ইভেন্টের নাম</TableHead>
                  <TableHead className="min-w-[120px]">তারিখ</TableHead>
                  <TableHead className="min-w-[120px]">শেষ তারিখ</TableHead>
                  <TableHead className="min-w-[120px]">স্থান</TableHead>
                  <TableHead className="min-w-[120px]">পেমেন্ট স্ট্যাটাস</TableHead>
                  <TableHead className="text-right min-w-[120px]">অ্যাকশন</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bookings.map((booking) => (
                  <TableRow
                    key={booking._id}
                    className={`${
                      booking.registrations[0].paymentStatus === "rejected" &&
                      "bg-red-400 hover:bg-red-500"
                    }`}
                  >
                    {/* Event Name */}
                    <TableCell>{booking.eventName}</TableCell>

                    {/*Event Date and Time */}
                    <TableCell>
                      {moment(
                        booking.time ? `${booking.date} ${booking.time}` : booking.date,
                        `${booking.time ? "YYYY-MM-DD, HH:mm" : "YYYY-MM-DD"}`
                      ).format("Do MMM YY, hh:mm A")}
                    </TableCell>

                    {/* Event Deadline */}
                    <TableCell>{moment(booking.deadline).format("Do MMM, YY")}</TableCell>

                    {/* Location */}
                    <TableCell>
                      {booking.location === "online" ? "অনলাইন" : booking.location}
                    </TableCell>
                    <TableCell>
                      {booking.registrations[0].paymentStatus === "accepted" && "অ্যাকসেপ্টেড"}
                      {booking.registrations[0].paymentStatus === "rejected" && "রিজেক্টেড"}
                      {booking.registrations[0].paymentStatus === "pending" && "পেন্ডিং"}
                    </TableCell>

                    {/* Review dialog button */}
                    <TableCell className="text-right">
                      <Dialog open={open} onOpenChange={setOpen}>
                        <Button
                          onClick={() =>
                            handleOpenModal(booking._id, booking.registrations[0].paymentStatus)
                          }
                          size="sm"
                        >
                          রিভিউ দিন
                        </Button>
                        <ReviewModal id={selectedDialogId} setOpen={setOpen} />
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
                {(bookings.length === 0 || error) && (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-4">
                      কোন বুকিং পাওয়া যায়নি।
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default MyEventPage;
