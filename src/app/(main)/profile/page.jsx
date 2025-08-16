"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import useAuth from "@/hooks/useAuth";

export default function UserProfilePage() {
    const { user, loading } = useAuth();

    if (loading) return null;

    return (
        <div className="mx-auto p-6 flex justify-center items-center h-[calc(100svh-64px)]">
            <Card className="p-6 flex flex-col items-center text-center space-y-4 w-full md:w-md">
                {/* Profile Image */}
                <Avatar className="w-24 h-24">
                    <AvatarImage src={user.photoURL} alt={user.displayName} />
                    <AvatarFallback>
                        {user.displayName.charAt(0)}
                    </AvatarFallback>
                </Avatar>

                {/* Name & Email */}
                <CardContent className="p-0">
                    <h1 className="text-2xl font-bold">{user.displayName}</h1>
                    <p className="text-gray-600">{user.email}</p>
                </CardContent>
            </Card>
        </div>
    );
}
