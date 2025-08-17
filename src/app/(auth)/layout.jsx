// (auth)/layout.jsx
"use client";

import { Suspense } from "react";

export default function AuthLayout({ children }) {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <div>{children}</div>
        </Suspense>
    );
}
