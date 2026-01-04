"use client";
import DashboardHeader from "@/components/DashboardHeader/DashboardHeader";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { useEffect, useState } from "react";

import {
  CalendarDays,
  CheckCircle,
  Clock,
  Hourglass,
  MapPin,
  Video,
} from "lucide-react";

const StudentTimeline = () => {
  const [events, setEvents] = useState([]);
  const AxiosPrivate = useAxiosPrivate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyTimelineData = async () => {
      try {
        const res = await AxiosPrivate.get("/api/events/my-timeline");
        setEvents(res.data.timeline);
      } catch (error) {
        console.error("Failed to load timeline");
      } finally {
        setLoading(false);
      }
    };
    fetchMyTimelineData();
  }, []);

  const formatTime = (time) => {
    if (!time) return "";
    const [hours, minutes] = time.split(":");
    const date = new Date();
    date.setHours(hours, minutes);
    return date.toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const canJoinNow = (date, time) => {
    if (!time) return false;
    const eventDateTime = new Date(`${date} ${time}`);
    return new Date() >= eventDateTime;
  };

  return (
    <>
      <DashboardHeader page="My Timeline" />
      <div className="">
        <div className="pr-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event, index) => {
            const joinEnabled = canJoinNow(event.date, event.time);

            return (
              <div key={index} className="ml-6 mb-8">
                {/* Card */}
                <div className="bg-white border rounded-lg p-4 shadow-sm h-full">
                  <h3 className="font-semibold">{event.eventName}</h3>

                  <p className="text-sm text-gray-600 flex items-center gap-2 mt-1">
                    <CalendarDays size={16} />
                    {new Date(event.date).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                    {event.time && (
                      <>
                        <span className="mx-1">•</span>
                        <Clock size={16} />
                        {formatTime(event.time)}
                      </>
                    )}
                  </p>

                  <p className="text-sm mt-1 flex items-center gap-2">
                    <MapPin size={16} />
                    {event.locationType === "online"
                      ? "Online Event"
                      : event.location}
                  </p>

                  {/* Status */}
                  {event.ticketUsed ? (
                    <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
                      <CheckCircle size={14} />
                      Joined on {new Date(event.joinedAt).toLocaleString()}
                    </p>
                  ) : (
                    <p className="text-xs text-yellow-600 mt-2 flex items-center gap-1">
                      <Hourglass size={14} />
                      Not joined yet
                    </p>
                  )}

                  {/* Join Button*/}
                  {event.locationType === "online" && event.eventLink && (
                    <a
                      href={joinEnabled ? event.eventLink : "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-2 mt-3 w-fit px-4 py-1.5 text-sm rounded
                        ${
                          joinEnabled
                            ? "bg-black text-white hover:opacity-90"
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                        }`}
                      onClick={(e) => {
                        if (!joinEnabled) e.preventDefault();
                      }}
                    >
                      <Video size={16} />
                      Join Event
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default StudentTimeline;
