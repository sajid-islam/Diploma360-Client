import Banner from "@/components/Banner/Banner";
import EventCard from "@/components/EventCard/EventCard";
import React from "react";

const HomePage = () => {
    return (
        <main className="max-w-7xl mx-auto px-5">
            <Banner />
            <EventCard />
        </main>
    );
};

export default HomePage;
