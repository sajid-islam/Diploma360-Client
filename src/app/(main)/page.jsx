import Banner from "@/components/Banner/Banner";
import CategoriesSection from "@/components/CategoriesSection/CategoriesSection";
import EventCard from "@/components/EventCard/EventCard";
import FeaturedEvents from "@/components/FeaturedEvents/FeaturedEvents";
import React from "react";

const HomePage = () => {
    return (
        <main className="max-w-7xl mx-auto px-5">
            <Banner />
            <CategoriesSection />
            <FeaturedEvents />
        </main>
    );
};

export default HomePage;
