import {
    FaCalendarAlt,
    FaMapMarkerAlt,
    FaTicketAlt,
    FaUsers,
    FaHeart,
} from "react-icons/fa";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function EventCard() {
    return (
        <Card className="w-[350px] rounded-xl overflow-hidden shadow-lg">
            {/* Image Section */}
            <div className="relative">
                <img
                    src="/icon.png" // Replace with your image path
                    alt="Concert"
                    className="w-full h-[200px] object-cover"
                />

                {/* Date Tag */}
                <div className="absolute top-3 left-3 bg-white rounded-lg text-center px-2 py-1 shadow-md">
                    <p className="text-lg font-bold leading-none">01</p>
                    <p className="text-xs font-semibold text-red-500">JAN</p>
                </div>
            </div>

            {/* Content Section */}
            <CardContent className="p-4 space-y-2">
                <Badge className="bg-blue-100 text-blue-600 hover:bg-blue-200">
                    Dance & Music
                </Badge>
                <h2 className="text-lg font-bold leading-tight">
                    Music in the Park: Summer Concert Series
                </h2>

                {/* Location */}
                <div className="flex items-center text-sm text-gray-600">
                    <FaMapMarkerAlt className="mr-2" />
                    Central Park, New York City, United States
                </div>

                {/* Date & Time */}
                <div className="flex items-center text-sm text-gray-600">
                    <FaCalendarAlt className="mr-2" />
                    Sunday, January 01, 2023 • 06:00 PM
                </div>

                {/* Price */}
                <div className="flex items-center text-sm text-gray-600">
                    <FaTicketAlt className="mr-2" />
                    From $99.99
                </div>
            </CardContent>

            {/* Footer Buttons */}
            <CardFooter className="flex gap-2">
                <Button className="flex-1">Buy Tickets</Button>
                <Button variant="secondary" className="flex-1">
                    View Details
                </Button>
            </CardFooter>
        </Card>
    );
}
