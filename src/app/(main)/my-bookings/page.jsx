"use client";

import { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import useAuth from "@/hooks/useAuth";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";

const MyEventPage = () => {
    const AxiosPrivate = useAxiosPrivate();
    const { user } = useAuth();
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await AxiosPrivate.get(
                    `/api/events/${user.email}/my-bookings`
                );
                const data = await response.data;
                setBookings(data);
            } catch (error) {
                console.log("Error fetching my bookings", error);
            }
        };
        if (user) {
            fetchData();
        }
    }, [user]);

    const handleCancel = (id) => {};

    return (
        <ProtectedRoute>
            <div className="max-w-5xl mx-auto p-4 md:p-8">
                <h2 className="text-2xl font-semibold mb-4">
                    আমার বুক করা ইভেন্টগুলি
                </h2>
                <div className="overflow-x-auto">
                    <Table className="min-w-full border rounded-lg">
                        <TableCaption>
                            আপনার ইভেন্ট বুকিংয়ের একটি তালিকা
                        </TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="min-w-[200px]">
                                    ইভেন্টের নাম
                                </TableHead>
                                <TableHead className="min-w-[120px]">
                                    তারিখ
                                </TableHead>
                                <TableHead className="min-w-[120px]">
                                    টিকিট
                                </TableHead>
                                <TableHead className="text-right min-w-[120px]">
                                    অ্যাকশন
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {bookings.map((booking) => (
                                <TableRow key={booking._id}>
                                    <TableCell>{booking.eventName}</TableCell>
                                    <TableCell>
                                        {new Date(
                                            booking.date
                                        ).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell>
                                        {booking.registrations[0].numberOfSeats}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            onClick={() =>
                                                handleCancel(booking.id)
                                            }
                                        >
                                            বাতিল করুন
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {bookings.length === 0 && (
                                <TableRow>
                                    <TableCell
                                        colSpan={4}
                                        className="text-center py-4"
                                    >
                                        কোন বুকিং পাওয়া যায়নি।
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </ProtectedRoute>
    );
};

export default MyEventPage;
