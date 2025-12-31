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
import Swal from "sweetalert2";

const MyEventsPage = () => {
  const { user } = useAuth();
  const AxiosPrivate = useAxiosPrivate();
  const router = useRouter();

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch events created by organizer / super_admin
  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const response = await AxiosPrivate.get(`/api/events/my-events`);
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events", error);
        toast.error("Failed to load events.");
      } finally {
        setLoading(false);
      }
    };
    if (user?.email) fetchEvents();
  }, [user]);

  // Handle delete with confirmation
  const handleDelete = async (event) => {
    const { _id, eventName } = event;

    const result = await Swal.fire({
      html: `
        <div class="text-left">
          <div class="font-semibold text-xl mb-2">${eventName}</div>
          <div class="text-sm text-gray-600">
            Are you sure you want to delete this event? <br/>
            <b>This action cannot be undone.</b>
          </div>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      buttonsStyling: false,
      customClass: {
        confirmButton:
          "bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded",
        cancelButton:
          "bg-gray-100 hover:bg-gray-200 text-black px-4 py-2 rounded",
        actions: "flex justify-end gap-2 mt-4",
        popup: "rounded-xl p-6",
      },
    });

    if (!result.isConfirmed) return;

    try {
      setLoading(true);
      await AxiosPrivate.delete(`/api/events/${_id}`);
      setEvents((prev) => prev.filter((ev) => ev._id !== _id));
      toast.success("Event deleted successfully ✅");
    } catch (error) {
      console.error("Delete failed", error);
      toast.error(
        error?.response?.data?.message || "Failed to delete event ❌"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Header / Breadcrumb */}
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
        <h2 className="text-2xl font-semibold mb-4">My Events</h2>

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <Loader />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table className="min-w-full border rounded-lg">
              <TableCaption>List of events you have created</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[200px]">Event Name</TableHead>
                  <TableHead className="min-w-[120px]">Date</TableHead>
                  <TableHead className="min-w-[120px]">Deadline</TableHead>
                  <TableHead className="min-w-[120px]">Location</TableHead>
                  <TableHead className="min-w-[120px]">Category</TableHead>
                  <TableHead className="text-right min-w-[180px]">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {events.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-4">
                      No events found.
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
                          ? "Online"
                          : event.location}
                      </TableCell>
                      <TableCell>{event.category}</TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button
                          size="sm"
                          onClick={() =>
                            router.push(
                              `/dashboard/my-events/edit/${event._id}`
                            )
                          }
                        >
                          Update
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDelete(event)}
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
