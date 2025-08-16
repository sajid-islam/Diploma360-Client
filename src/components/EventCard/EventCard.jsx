// components/EventCard.js
import {
    FaCalendarAlt,
    FaMapMarkerAlt,
    FaTicketAlt,
    FaUsers,
} from "react-icons/fa";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function EventCard({ event }) {
    return (
        <Card className="rounded-xl overflow-hidden shadow-lg">
            {/* Image Section */}
            <div className="relative">
                <img
                    src={event.eventImage || "/placeholder.png"}
                    alt={event.eventName}
                    className="w-full h-[200px] object-cover"
                />

                {/* Date Tag */}
                <div className="absolute top-3 left-3 bg-white rounded-lg text-center px-2 py-1 shadow-md">
                    <p className="text-lg font-bold leading-none">
                        {new Date(event.date).getDate()}
                    </p>
                    <p className="text-xs font-semibold text-red-500">
                        {new Date(event.date).toLocaleString("default", {
                            month: "short",
                        })}
                    </p>
                </div>
            </div>

            {/* Content Section */}
            <CardContent className="p-4 space-y-2">
                <Badge className="bg-blue-100 text-blue-600 hover:bg-blue-200">
                    {event.category}
                </Badge>
                <h2 className="text-lg font-bold leading-tight">
                    {event.eventName}
                </h2>

                {/* Location */}
                <div className="flex items-center text-sm text-gray-600">
                    <FaMapMarkerAlt className="mr-2" />
                    {event.location}
                </div>

                {/* Date & Time */}
                <div className="flex items-center text-sm text-gray-600">
                    <FaCalendarAlt className="mr-2" />
                    {new Date(event.date).toLocaleDateString()}
                </div>

                {/* Available Seats */}
                <div className="flex items-center text-sm text-gray-600">
                    <FaUsers className="mr-2" />
                    {event.numberOfSeats} সিটস অ্যাভেইলেবল
                </div>
            </CardContent>

            {/* Footer Buttons */}
            <CardFooter>
                <Link href={`/events/${event._id}`} className="w-full">
                    <Button variant="secondary" className="w-full">
                        বিস্তারিত দেখুন
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    );
}
