"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useGetPaymentRequestsQuery } from "@/redux/payment/paymentSlice";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { toast } from "sonner";
import moment from "moment";

const PaymentRequestPage = () => {
  const handleCopyText = async (value) => {
    await navigator.clipboard.writeText(value);
    toast.success(`${value} TrxId Copied!`);
  };
  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor("#", {
      header: () => "SN",
      cell: ({ row }) => row.index + 1,
    }),
    columnHelper.accessor("registrations.name", {
      cell: (info) => info.getValue(),
      header: () => "Name",
    }),
    columnHelper.accessor("registrations.phone", {
      cell: (info) => (
        <a
          className="hover:bg-custom-neutral hover:text-black hover:cursor-pointer px-1 rounded"
          href={`tel:${info.getValue()}`}
        >
          {info.getValue()}
        </a>
      ),
      header: () => "Phone",
    }),
    columnHelper.accessor("eventName", {
      header: () => "Event",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("fee", {
      header: () => "Amount",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("registrations.paymentMethod", {
      header: () => "Pay Method",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("registrations.transactionId", {
      header: () => "TrxId",
      cell: (info) => (
        <button
          className="hover:bg-custom-neutral hover:cursor-pointer hover:text-black px-1 rounded text-start"
          onClick={() => handleCopyText(info.getValue())}
        >
          {info.getValue()}
        </button>
      ),
    }),
    columnHelper.accessor("registrations.createdAt", {
      header: () => "Pay Date",
      cell: (info) => moment(info.getValue()).format("Do MMM YY, h:mm A"),
    }),
    columnHelper.accessor("accept", {
      header: () => "Action",
      cell: ({ row }) => (
        <button className="bg-custom-secondary hover:bg-custom-secondary text-black hover:cursor-pointer px-2 rounded font-medium">
          Accept
        </button>
      ),
    }),
    columnHelper.accessor("reject", {
      header: () => "Action",
      cell: ({ row }) => (
        <button className="bg-red-500 hover:bg-red-400 text-black hover:cursor-pointer px-2 rounded font-medium">
          Reject
        </button>
      ),
    }),
  ];
  const { data = [], error, isLoading } = useGetPaymentRequestsQuery();

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  console.log(data);
  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Payment Requests</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <main className="mx-10">
        {data.length === 0 ? (
          <div className="flex justify-center items-center h-[calc(100svh-64px)]">
            <h1 className="text-xl font-bold">কোনো পেমেন্ট রিকোয়েস্ট পাওয়া যায়নি।</h1>
          </div>
        ) : (
          <div>
            <Table className="border">
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id}>
                        {flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows.map((row, idx) => (
                  <TableRow key={row.id} className={` hover:bg-custom-soft-dark `}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </main>
    </>
  );
};

export default PaymentRequestPage;
