"use client";
import { FaQuoteLeft } from "react-icons/fa";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import useAxiosPublic from "@/hooks/useAxiosPublic";

// dynamically import ReactStars to disable SSR
const ReactStars = dynamic(() => import("react-stars"), { ssr: false });

const ReviewsSection = () => {
    const [reviews, setReviews] = useState([]);
    const AxiosPublic = useAxiosPublic();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await AxiosPublic.get(
                    "/api/events/recent-reviews"
                );
                const data = await response.data;
                setReviews(data);
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
                    গ্রাহকের মতামত
                </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
                {reviews.map((r) => (
                    <div
                        key={r._id}
                        className="relative bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 w-full mx-auto"
                    >
                        {/* Quote Icon */}
                        <div className="absolute -top-4 -left-4 text-blue-500 text-4xl">
                            <FaQuoteLeft />
                        </div>

                        {/* Review Content */}
                        <div className="mt-2">
                            <h3 className="text-lg font-semibold">
                                {r.reviews.name}
                            </h3>
                            <div className="my-2">
                                <ReactStars
                                    count={5}
                                    value={r.reviews.rating}
                                    size={24}
                                    isHalf={true}
                                    edit={false}
                                    activeColor="#ffd700"
                                />
                            </div>
                            <p className="text-gray-700">{r.reviews.comment}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ReviewsSection;
