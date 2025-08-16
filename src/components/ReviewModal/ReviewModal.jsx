"use client";

import { useState } from "react";
import {
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import ReactStars from "react-stars";
import useAuth from "@/hooks/useAuth";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { toast } from "sonner";

export default function ReviewModal({ id, setOpen }) {
    const [rating, setRating] = useState(1);
    const [comment, setComment] = useState("");
    const [loading, setLoading] = useState(false);
    const { user } = useAuth();

    const AxiosPrivate = useAxiosPrivate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const reviewData = {
                name: user.displayName,
                email: user.email,
                rating,
                comment,
            };

            await AxiosPrivate.post(`/api/events/${id}/review`, reviewData);
            toast.success("Add review successfully");
            setLoading(false);
            setOpen(false);
            setComment("");
            setRating(1);
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message);
            }
            setLoading(false);
            setOpen(false);
        }
    };

    return (
        <DialogContent className="sm:max-w-lg">
            <DialogHeader>
                <DialogTitle className="text-custom-secondary-dark">
                    আপনার রিভিউ প্রদান করুন
                </DialogTitle>
                <DialogDescription>
                    এই ইভেন্ট সম্পর্কে আপনার মতামত শেয়ার করুন।
                </DialogDescription>
            </DialogHeader>

            <form
                onSubmit={handleSubmit}
                id="reviewForm"
                className="grid gap-4 mt-4"
            >
                <div className="flex flex-col space-y-1">
                    <Label>রেটিং</Label>
                    <ReactStars
                        count={5}
                        size={30}
                        isHalf={true}
                        activeColor="#ffd700"
                        value={rating}
                        onChange={setRating} // updates state only
                    />
                </div>

                <div className="flex flex-col space-y-1">
                    <Label htmlFor="comment">কমেন্ট </Label>
                    <Textarea
                        id="comment"
                        placeholder="Write your review..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        rows={4}
                    />
                </div>

                <DialogFooter>
                    <Button
                        disabled={loading && !user}
                        type="submit"
                        className="w-full bg-custom-secondary hover:bg-custom-secondary/90"
                    >
                        {loading ? "সাবমিট হচ্ছে" : "সাবমিট রিভিউ"}
                    </Button>
                </DialogFooter>
            </form>
        </DialogContent>
    );
}
