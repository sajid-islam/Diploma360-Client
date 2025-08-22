"use client";

import { useEffect, useState } from "react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import useAuth from "@/hooks/useAuth";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
import ReviewModal from "@/components/ReviewModal/ReviewModal";
import { toast } from "sonner";
import { useGetMyBookingsQuery } from "@/redux/event/eventSlice";
import Loader from "@/components/Loader/Loader";

const MyEventPage = () => {
  const AxiosPrivate = useAxiosPrivate();
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [selectedDialogId, setSelectedDialogId] = useState(null);

  const handleOpenModal = (eventId) => {
    setSelectedDialogId(eventId);
    setOpen(true);
  };

  const { data: bookings = [], error, isLoading, refetch } = useGetMyBookingsQuery(user?.email);

  const handleCancel = async (id) => {
    if (!confirm("আপনি কি সত্যিই এই ইভেন্ট বাতিল করতে চান?")) return;

    try {
      const response = await AxiosPrivate.delete(`/api/events/${id}/registration`);

      if (response.data.success) {
        // Remove canceled booking from state
        refetch();
        toast.success("বুকিং সফলভাবে বাতিল হয়েছে");
      } else {
        toast.error(response.data.message || "কিছু ভুল হয়েছে");
      }
    } catch (error) {
      console.error("Error cancelling booking:", error);
      toast.error("কিছু ভুল হয়েছে। পুনরায় চেষ্টা করুন।");
    }
  };

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
                  <TableHead className="min-w-[120px]">টিকিট</TableHead>
                  <TableHead className="text-right min-w-[120px]">অ্যাকশন</TableHead>
                  <TableHead className="text-right min-w-[120px]">অ্যাকশন</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bookings.map((booking) => (
                  <TableRow key={booking._id}>
                    <TableCell>{booking.eventName}</TableCell>
                    <TableCell>{new Date(booking.date).toLocaleDateString()}</TableCell>
                    <TableCell>{booking.registrations[0].numberOfSeats}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="destructive" size="sm" onClick={() => handleCancel(booking._id)}>
                        বাতিল করুন
                      </Button>
                    </TableCell>
                    <TableCell className="text-right">
                      <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                          <Button onClick={() => handleOpenModal(booking._id)} size="sm">
                            রিভিউ দিন
                          </Button>
                        </DialogTrigger>
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
