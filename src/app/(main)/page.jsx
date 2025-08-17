import Banner from "@/components/Banner/Banner";
import CategoriesSection from "@/components/CategoriesSection/CategoriesSection";
import FeaturedEvents from "@/components/FeaturedEvents/FeaturedEvents";
import ReviewsSection from "@/components/ReviewsSection/ReviewsSection";
import React from "react";

const HomePage = () => {
    return (
        <main className="max-w-7xl mx-auto px-5">
            <Banner />
            <CategoriesSection />
            <FeaturedEvents />
            <ReviewsSection />
        </main>
    );
};

export default HomePage;
