import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const eventApi = createApi({
  reducerPath: "eventApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/events`, credentials: "include" }),
  endpoints: (build) => ({
    getMyBookings: build.query({
      query: (email) => `${email}/my-bookings`,
    }),
  }),
});

export const { useGetMyBookingsQuery } = eventApi;
