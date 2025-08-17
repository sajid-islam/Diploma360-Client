"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
    FaBriefcase,
    FaChalkboardTeacher,
    FaCode,
    FaGlobeAsia,
    FaPaintBrush,
    FaUsers,
} from "react-icons/fa";

const categories = [
    {
        id: 1,
        name: "ওয়েব ডেভেলপমেন্ট",
        icon: <FaCode className="text-blue-500 text-3xl" />,
    },
    {
        id: 2,
        name: "প্রফেশনাল ট্রেনিং",
        icon: <FaChalkboardTeacher className="text-green-500 text-3xl" />,
    },
    {
        id: 3,
        name: "ব্যবসা ও উদ্যোক্তা",
        icon: <FaBriefcase className="text-purple-500 text-3xl" />,
    },
    {
        id: 4,
        name: "ভাষা শিক্ষা",
        icon: <FaGlobeAsia className="text-orange-500 text-3xl" />,
    },
    {
        id: 5,
        name: "আর্টস ও ডিজাইন",
        icon: <FaPaintBrush className="text-pink-500 text-3xl" />,
    },
    {
        id: 6,
        name: "সাধারণ ও দক্ষতা উন্নয়ন",
        icon: <FaUsers className="text-red-500 text-3xl" />,
    },
];

export default function CategoriesSection() {
    return (
        <section className="py-12">
            <div className="max-w-6xl mx-auto px-6">
                <h2 className="text-3xl font-bold text-center mb-8">
                    ইভেন্ট ক্যাটাগরি
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                    {categories.map((cat) => (
                        <Card
                            key={cat.id}
                            className="flex flex-col items-center justify-center p-6 rounded-2xl shadow-md hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer"
                        >
                            <CardContent className="flex flex-col items-center text-center">
                                {cat.icon}
                                <p className="mt-3 font-medium text-gray-700">
                                    {cat.name}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
