"use client";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import React, { useEffect, useState } from "react";
import EventCard from "../EventCard/EventCard";

const FeaturedEvents = () => {
    const [events, setEvents] = useState([]);
    const AxiosPublic = useAxiosPublic();
    console.log(events);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await AxiosPublic.get("/api/events/featured");
                const data = await response.data;
                setEvents(data);
            } catch (error) {
                console.log("Error fetching featured events", error);
            }
        };
        fetchData();
    }, []);
    return (
        <div className="py-12">
            <div>
                <h2 className="text-3xl font-bold text-center mb-8">
                    ফিচার্ড ইভেন্টস
                </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {events.map((event) => (
                    <EventCard key={event._id} event={event} />
                ))}
            </div>
        </div>
    );
};

export default FeaturedEvents;
