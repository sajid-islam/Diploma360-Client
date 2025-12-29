"use client";

import Loader from "@/components/Loader/Loader";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Textarea } from "@/components/ui/textarea";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import moment from "moment";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function UpdateEventPage() {
  const { id } = useParams();
  const router = useRouter();
  const AxiosPrivate = useAxiosPrivate();
  const today = moment().format("YYYY-MM-DD");

  const locationRef = useRef();

  const [event, setEvent] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isPhysical, setIsPhysical] = useState(false);
  const [locationType, setLocationType] = useState("");

  // ---------- helpers ----------
  const formatDate = (date) => (date ? moment(date).format("YYYY-MM-DD") : "");

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });

  // ---------- fetch event ----------
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await AxiosPrivate.get(`/api/events/${id}`);
        setEvent(res.data);
        setLocationType(res.data.locationType);
        setIsPhysical(res.data.locationType === "physical");
      } catch (err) {
        console.error("Failed to load event", err);
      }
    };
    fetchEvent();
  }, [id]);

  // ---------- image ----------
  const handleImageChange = async (e) => {
    if (e.target.files[0]) {
      setPreview(await getBase64(e.target.files[0]));
    }
  };

  // ---------- submit ----------
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    let imageBase64 = null;
    if (form.image.files[0]) {
      imageBase64 = await getBase64(form.image.files[0]);
    }

    const updatedData = {
      eventName: form.eventName.value,
      locationType,
      location: locationType === "physical" ? form.location?.value : "online",
      category: form.category.value,
      description: form.description.value,
      numberOfSeats: form.seats.value || null,
      eventLink: locationType === "online" ? form.link.value : null,
      fee: form.fee.value,
      organizer: form.organizer.value,
      date: form.date.value,
      time: form.time.value,
      deadline: form.deadline.value,
      ...(imageBase64 && { image: imageBase64 }),
    };

    try {
      setLoading(true);
      await AxiosPrivate.put(`/api/events/${id}`, updatedData);
      router.push("/dashboard/my-events");
    } catch (err) {
      console.error("Update failed", err);
    } finally {
      setLoading(false);
    }
  };

  if (!event) return <Loader />;

  return (
    <>
      {/* ---------- HEADER ---------- */}
      <header className="flex h-16 items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage>Update Event</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      {/* ---------- FORM ---------- */}
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <Label>Event Name</Label>
            <Input name="eventName" defaultValue={event.eventName} required />
          </div>

          <div>
            <Label>Location Type</Label>
            <Select
              value={locationType}
              onValueChange={(v) => {
                setLocationType(v);
                setIsPhysical(v === "physical");
              }}
              defaultValue={locationType}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select location type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="online">Online</SelectItem>
                <SelectItem value="physical">Physical</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {isPhysical && (
            <div>
              <Label>Location</Label>
              <Input
                ref={locationRef}
                name="location"
                defaultValue={event.location}
                required
              />
            </div>
          )}

          {!isPhysical && (
            <div>
              <Label>Event Link</Label>
              <Input
                name="link"
                type="url"
                defaultValue={event.eventLink}
                required
              />
            </div>
          )}

          <div>
            <Label>Category</Label>
            <Input name="category" defaultValue={event.category} required />
          </div>

          <div>
            <Label>Fee</Label>
            <Input name="fee" type="number" min={0} defaultValue={event.fee} />
          </div>

          <div>
            <Label>Organizer</Label>
            <Input name="organizer" defaultValue={event.organizer} />
          </div>

          <div>
            <Label>Date</Label>
            <Input
              name="date"
              type="date"
              min={today}
              defaultValue={formatDate(event.date)}
              required
            />
          </div>

          <div>
            <Label>Time</Label>
            <Input name="time" type="time" defaultValue={event.time} required />
          </div>

          <div>
            <Label>Deadline</Label>
            <Input
              name="deadline"
              type="date"
              min={today}
              defaultValue={formatDate(event.deadline)}
              required
            />
          </div>

          <div>
            <Label>Number of Seats</Label>
            <Input
              name="seats"
              type="number"
              min={1}
              defaultValue={event.numberOfSeats}
            />
          </div>
        </div>

        <div>
          <Label>Event Image</Label>
          <Input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
          />
          {(preview || event.eventImage) && (
            <img
              src={preview || event.eventImage}
              className="w-32 h-32 mt-2 rounded object-cover"
            />
          )}
        </div>

        <div>
          <Label>Description</Label>
          <Textarea
            name="description"
            rows={4}
            defaultValue={event.description}
            required
          />
        </div>

        <Button type="submit" disabled={loading}>
          {loading ? "Updating..." : "Update Event"}
        </Button>
      </form>
    </>
  );
}
