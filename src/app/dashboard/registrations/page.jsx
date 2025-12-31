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

export default function RegistrationsPage() {
  const AxiosPrivate = useAxiosPrivate();
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const res = await AxiosPrivate.get("/api/events/registrations");
        setRegistrations(res.data.registrations);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load registrations");
      } finally {
        setLoading(false);
      }
    };
    fetchRegistrations();
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
              <BreadcrumbPage>Registrations</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div className="p-4 md:p-8">
        <h2 className="text-2xl font-semibold mb-4">All Registrations</h2>

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <Loader />
          </div>
        ) : registrations.length === 0 ? (
          <div className="flex items-center justify-center h-40 rounded-lg border border-dashed text-gray-500">
            No registrations found yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table className="min-w-full border rounded-lg">
              <TableHeader>
                <TableRow>
                  <TableHead>Event</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Study Status</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {registrations.map((reg) => (
                  <TableRow key={reg._id}>
                    <TableCell>{reg.eventName}</TableCell>
                    <TableCell>{reg.name}</TableCell>
                    <TableCell>{reg.email}</TableCell>
                    <TableCell>{reg.phone}</TableCell>
                    <TableCell>{reg.studyStatus}</TableCell>
                    <TableCell className="capitalize">
                      {reg.paymentStatus}
                    </TableCell>
                    <TableCell>
                      {moment(reg.createdAt).format("Do MMM, YYYY")}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </>
  );
}
