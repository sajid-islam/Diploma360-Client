"use client";

import Loader from "@/components/Loader/Loader";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useAuth from "@/hooks/useAuth";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const MyEventsPage = () => {
  const { user } = useAuth();
  const AxiosPrivate = useAxiosPrivate();
  const router = useRouter();

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  // Fetch events created by organizer / super_admin
  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const response = await AxiosPrivate.get(`/api/events/my-events`);
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events", error);
        toast.error("ইভেন্ট লোড করতে সমস্যা হয়েছে।");
      } finally {
        setLoading(false);
      }
    };
    if (user?.email) fetchEvents();
  }, [user]);

  // Handle delete
  const handleDelete = async (eventId) => {
    try {
      setLoading(true);
      await AxiosPrivate.delete(`/api/events/${eventId}`);
      setEvents(events.filter((ev) => ev._id !== eventId));
      toast.success("ইভেন্ট সফলভাবে মুছে ফেলা হয়েছে।");
      setDeleteDialogOpen(false);
    } catch (error) {
      console.error("Error deleting event", error);
      toast.error("ইভেন্ট মুছে ফেলতে সমস্যা হয়েছে।");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <header className="flex h-16 items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage>My Events</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div className="p-4 md:p-8">
        <h2 className="text-2xl font-semibold mb-4">আমার ইভেন্টগুলি</h2>

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <Loader />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table className="min-w-full border rounded-lg">
              <TableCaption>আপনার তৈরি করা ইভেন্টের একটি তালিকা</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[200px]">ইভেন্টের নাম</TableHead>
                  <TableHead className="min-w-[120px]">তারিখ</TableHead>
                  <TableHead className="min-w-[120px]">শেষ তারিখ</TableHead>
                  <TableHead className="min-w-[120px]">স্থান</TableHead>
                  <TableHead className="min-w-[120px]">শ্রেণী</TableHead>
                  <TableHead className="text-right min-w-[180px]">
                    অ্যাকশন
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {events.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-4">
                      কোন ইভেন্ট পাওয়া যায়নি।
                    </TableCell>
                  </TableRow>
                ) : (
                  events.map((event) => (
                    <TableRow key={event._id}>
                      <TableCell>{event.eventName}</TableCell>
                      <TableCell>
                        {moment(event.date).format("Do MMM, YY")}
                      </TableCell>
                      <TableCell>
                        {moment(event.deadline).format("Do MMM, YY")}
                      </TableCell>
                      <TableCell>
                        {event.location === "online"
                          ? "অনলাইন"
                          : event.location}
                      </TableCell>
                      <TableCell>{event.category}</TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button
                          size="sm"
                          onClick={() =>
                            router.push(`/dashboard/events/edit/${event._id}`)
                          }
                        >
                          Update
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => {
                            setSelectedEvent(event);
                            setDeleteDialogOpen(true);
                          }}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </>
  );
};

export default MyEventsPage;
