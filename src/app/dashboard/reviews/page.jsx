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
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import moment from "moment";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function ReviewsPage() {
  const AxiosPrivate = useAxiosPrivate();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await AxiosPrivate.get("/api/events/reviews");
        setReviews(res.data);
      } catch (error) {
        toast.error("Failed to load reviews");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

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
              <BreadcrumbPage>Reviews</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div className="p-4 md:p-8">
        <h2 className="text-2xl font-semibold mb-4">Event Reviews</h2>

        {loading ? (
          <Loader />
        ) : reviews.length === 0 ? (
          <div className="flex items-center justify-center h-40 rounded-lg border border-dashed text-gray-500">
            No reviews have been submitted for events yet.
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Event</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Comment</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reviews.map((item) => (
                <TableRow key={item.reviews._id}>
                  <TableCell>{item.eventName}</TableCell>
                  <TableCell>{item.reviews.name}</TableCell>
                  <TableCell>{item.reviews.email}</TableCell>
                  <TableCell>{item.reviews.rating} ⭐</TableCell>
                  <TableCell className="max-w-[300px] truncate">
                    {item.reviews.comment}
                  </TableCell>
                  <TableCell>
                    {moment(item.reviews.createdAt).format("DD MMM YYYY")}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </>
  );
}
