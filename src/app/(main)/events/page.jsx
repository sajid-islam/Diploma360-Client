"use client";
import EventCard from "../../../components/EventCard/EventCard";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useEffect, useState } from "react";

const EventsPage = () => {
    const AxiosPublic = useAxiosPublic();

    const [events, setEvents] = useState([]);
    console.log(events);

    useEffect(() => {
        const fetchData = async () => {
            const response = await AxiosPublic.get("/api/events");
            const data = await response.data;
            setEvents(data);
        };
        fetchData();
    }, []);

    return (
        <div className="container mx-auto max-w-5xl py-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {events.map((event) => (
                    <EventCard key={event._id} event={event} />
                ))}
            </div>
        </div>
    );
};

export default EventsPage;
