"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import moment from "moment";
import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function DashboardStats() {
  const AxiosPrivate = useAxiosPrivate();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await AxiosPrivate.get("/api/events/stats");
        setStats(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchStats();
  }, []);

  if (!stats) return <p className="p-6 text-center">Loading stats...</p>;

  return (
    <div className="w-full min-h-screen bg-gray-50 dark:bg-gray-900 p-6 space-y-8">
      {/* Dashboard Header */}
      <header className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Overview</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
          Welcome, {stats.role}
        </h1>
      </header>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {stats.role === "student" && (
          <>
            <div className="p-6 rounded-xl shadow-lg bg-white dark:bg-gray-800 hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                Total Registrations
              </h3>
              <p className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">
                {stats.totalRegistrations}
              </p>
            </div>
            {stats.nextEvent && (
              <div className="p-6 rounded-xl shadow-lg bg-white dark:bg-gray-800 hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                  Next Event
                </h3>
                <p className="text-gray-800 dark:text-gray-100">
                  {stats.nextEvent.eventName}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  {moment(stats.nextEvent.date).format("DD MMM YYYY")}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  {stats.nextEvent.time}
                </p>
              </div>
            )}
          </>
        )}

        {stats.role === "organizer" && (
          <>
            <div className="p-6 rounded-xl shadow-lg bg-white dark:bg-gray-800 hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                Total Events
              </h3>
              <p className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">
                {stats.totalEvents}
              </p>
            </div>
            <div className="p-6 rounded-xl shadow-lg bg-white dark:bg-gray-800 hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                Total Registrations
              </h3>
              <p className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">
                {stats.totalRegistrations}
              </p>
            </div>
            <div className="p-6 rounded-xl shadow-lg bg-white dark:bg-gray-800 hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                Total Revenue
              </h3>
              <p className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">
                ${stats.totalRevenue.toFixed(2)}
              </p>
            </div>
          </>
        )}

        {stats.role === "super_admin" && (
          <>
            <div className="p-6 rounded-xl shadow-lg bg-white dark:bg-gray-800 hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                Students
              </h3>
              <p className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">
                {stats.users.student}
              </p>
            </div>
            <div className="p-6 rounded-xl shadow-lg bg-white dark:bg-gray-800 hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                Organizers
              </h3>
              <p className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">
                {stats.users.organizer}
              </p>
            </div>
            <div className="p-6 rounded-xl shadow-lg bg-white dark:bg-gray-800 hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                Total Events
              </h3>
              <p className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">
                {stats.totalEvents}
              </p>
            </div>
          </>
        )}
      </div>

      {/* Chart */}
      <div className="mt-8 p-6 rounded-xl shadow-lg bg-white dark:bg-gray-800 w-full">
        <h3 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-200">
          {stats.role === "organizer"
            ? "Revenue per Event"
            : "Registrations per Month"}
        </h3>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={stats.chartData}>
            <XAxis dataKey={stats.role === "organizer" ? "name" : "month"} />
            <YAxis />
            <Tooltip />
            <Bar
              dataKey={stats.role === "organizer" ? "revenue" : "count"}
              fill="#4f46e5"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
