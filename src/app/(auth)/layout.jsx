// (auth)/layout.jsx
"use client";

import { Suspense } from "react";

export default function AuthLayout({ children }) {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                {children}
            </div>
        </Suspense>
    );
}
