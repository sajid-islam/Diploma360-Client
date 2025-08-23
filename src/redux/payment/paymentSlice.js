import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const paymentApi = createApi({
  reducerPath: "paymentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/events/payment`,
    credentials: "include",
  }),
  endpoints: (build) => ({
    getPaymentRequests: build.query({
      query: () => "/payment-requests",
    }),
  }),
});

export const { useGetPaymentRequestsQuery } = paymentApi;
