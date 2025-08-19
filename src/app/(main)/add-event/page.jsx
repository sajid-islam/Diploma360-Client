"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { useRouter } from "next/navigation";

export default function AddEventPage() {
    const [preview, setPreview] = useState(null);
    const AxiosPrivate = useAxiosPrivate();
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    // Convert image to Base64
    const getBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;

        let imageBase64 = null;
        if (form.image.files[0]) {
            imageBase64 = await getBase64(form.image.files[0]);
        }

        const eventData = {
            eventName: form.eventName.value,
            date: form.date.value,
            location: form.location.value,
            category: form.category.value,
            description: form.description.value,
            numberOfSeats: form.seats.value,
            image: imageBase64, // base64 string
            eventLink: form.link.value,
        };
        console.log(eventData);
        setLoading(true);
        const response = await AxiosPrivate.post("/api/events", eventData);
        const data = await response.data;
        setLoading(false);
        router.push("/events");

        console.log("res Data:", data);
    };

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const base64 = await getBase64(file);
            setPreview(base64);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen px-4">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-4xl bg-white p-6 rounded-2xl shadow-lg space-y-6"
            >
                <h2 className="text-2xl font-bold text-center">
                    Add New Event
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Event Name */}
                    <div className="flex flex-col space-y-2">
                        <Label htmlFor="eventName">Event Name</Label>
                        <Input id="eventName" name="eventName" required />
                    </div>

                    {/* Date */}
                    <div className="flex flex-col space-y-2">
                        <Label htmlFor="date">Date</Label>
                        <Input id="date" name="date" type="date" required />
                    </div>

                    {/* Location */}
                    <div className="flex flex-col space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input id="location" name="location" required />
                    </div>

                    {/* Category */}
                    <div className="flex flex-col space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Input id="category" name="category" required />
                    </div>

                    {/* Seats */}
                    <div className="flex flex-col space-y-2">
                        <Label htmlFor="seats">Number of Seats</Label>
                        <Input id="seats" name="seats" type="number" required />
                    </div>

                    {/* Link */}
                    <div className="flex flex-col space-y-2">
                        <Label htmlFor="link">Event Link (optional)</Label>
                        <Input id="link" name="link" type="url" />
                    </div>
                </div>

                {/* Description (full width) */}
                <div className="flex flex-col space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                        id="description"
                        name="description"
                        rows={4}
                        required
                    />
                </div>

                {/* Image Upload */}
                <div className="flex flex-col space-y-2">
                    <Label htmlFor="image">Upload Event Image</Label>
                    <Input
                        id="image"
                        name="image"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        required
                    />
                    {preview && (
                        <img
                            src={preview}
                            alt="Preview"
                            className="w-32 h-32 object-cover rounded-lg mt-2"
                        />
                    )}
                </div>

                {/* Submit */}
                <Button disabled={loading} type="submit" className="w-full">
                    {loading ? "সাবমিট হচ্ছে" : "সাবমিট"}
                </Button>
            </form>
        </div>
    );
}
