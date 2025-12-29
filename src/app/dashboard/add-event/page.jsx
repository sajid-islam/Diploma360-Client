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
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Textarea } from "@/components/ui/textarea";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function AddEventPage() {
  const AxiosPrivate = useAxiosPrivate();
  const router = useRouter();
  const today = moment().format("YYYY-MM-DD");

  const locationRef = useRef();
  const newCategoryRef = useRef();

  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(false);
  const [isAddingNewCategory, setIsAddingNewCategory] = useState(false);
  const [isLocationTypePhysical, setIsLocationTypePhysical] = useState(false);

  // Fetch categories
  useEffect(() => {
    const fetchData = async () => {
      setCategoriesLoading(true);
      try {
        const response = await AxiosPrivate.get("/api/events/categories");
        setCategories(response.data);
      } catch (error) {
        console.log("Error fetching categories", error);
      } finally {
        setCategoriesLoading(false);
      }
    };
    fetchData();
  }, []);

  // Reset inputs when toggling
  useEffect(() => {
    if (!isAddingNewCategory && newCategoryRef.current)
      newCategoryRef.current.value = "";
  }, [isAddingNewCategory]);

  useEffect(() => {
    if (!isLocationTypePhysical && locationRef.current)
      locationRef.current.value = "";
  }, [isLocationTypePhysical]);

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const base64 = await getBase64(file);
      setPreview(base64);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    let imageBase64 = null;
    if (form.image.files[0]) {
      imageBase64 = await getBase64(form.image.files[0]);
    }
    const eventData = {
      eventName: form.eventName.value,
      locationType: isLocationTypePhysical
        ? "physical"
        : form.locationType.value,
      location: isLocationTypePhysical
        ? form.location.value
        : form.locationType.value,
      category: isAddingNewCategory
        ? form.newCategory.value
        : form.category.value,
      description: form.description.value,
      numberOfSeats: form.seats.value || null,
      image: imageBase64,
      eventLink: form.link.value || null,
      fee: form.fee.value,
      organizer: form.organizer.value,
      date: form.date.value,
      time: form.time.value || null,
      deadline: form.deadline.value,
    };
    console.log(eventData);
    try {
      setLoading(true);
      const response = await AxiosPrivate.post("/api/events", eventData);
      const data = await response.data;
      setLoading(false);
      router.push("/events");
      console.log("res Data:", data);
    } catch (error) {
      console.log("Error creating event", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
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
              <BreadcrumbPage>Add Event</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div className="flex justify-center items-center px-4">
        <form
          onSubmit={handleSubmit}
          className="w-full p-6 space-y-6"
          encType="multipart/form-data"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Event Name */}
            <div className="flex flex-col space-y-2">
              <Label htmlFor="eventName">Event Name</Label>
              <Input id="eventName" name="eventName" required />
            </div>

            {/* Location */}
            <div className="flex flex-col space-y-2">
              <Label htmlFor="location">Location</Label>
              <Select
                onValueChange={(value) =>
                  setIsLocationTypePhysical(value === "physical")
                }
                name="locationType"
                id="location"
                required={!isLocationTypePhysical}
                className={isLocationTypePhysical ? "hidden" : "block"}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="online">অনলাইন</SelectItem>
                    <SelectItem value="physical">ফিজিক্যাল</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>

              <Input
                id="location"
                name="location"
                ref={locationRef}
                required={isLocationTypePhysical}
                className={isLocationTypePhysical ? "block" : "hidden"}
              />
            </div>

            {/* Category */}
            <div className="flex flex-col space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                onValueChange={(value) =>
                  setIsAddingNewCategory(value === "add-new")
                }
                name="category"
                required={!isAddingNewCategory}
                className={isAddingNewCategory ? "hidden" : "block"}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select event category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {categoriesLoading ? (
                      <Loader size={5} />
                    ) : (
                      <>
                        {categories.map((cat, i) => (
                          <SelectItem key={i} value={cat}>
                            {cat}
                          </SelectItem>
                        ))}
                        <SelectItem value="add-new">Add New</SelectItem>
                      </>
                    )}
                  </SelectGroup>
                </SelectContent>
              </Select>

              <Input
                id="newCategory"
                name="newCategory"
                ref={newCategoryRef}
                required={isAddingNewCategory}
                className={isAddingNewCategory ? "block" : "hidden"}
              />
            </div>

            {/* Fee */}
            <div className="flex flex-col space-y-2">
              <Label htmlFor="fee">Fee</Label>
              <Input id="fee" name="fee" type="number" min={0} required />
            </div>

            {/* Organizer */}
            <div className="flex flex-col space-y-2">
              <Label htmlFor="organizer">Organizer</Label>
              <Input id="organizer" name="organizer" required />
            </div>

            {/* Seats */}
            <div className="flex flex-col space-y-2">
              <Label htmlFor="seats">
                Number of Seats{" "}
                <span className="text-red-500" hidden={!isLocationTypePhysical}>
                  (required for physical)
                </span>
              </Label>
              <Input
                id="seats"
                name="seats"
                type="number"
                min={1}
                required={isLocationTypePhysical}
              />
            </div>

            {/* Link */}
            <div className="flex flex-col space-y-2">
              <Label htmlFor="link">
                Event Link{" "}
                <span className="text-red-500" hidden={isLocationTypePhysical}>
                  (required for online)
                </span>
              </Label>
              <Input
                id="link"
                name="link"
                type="url"
                required={!isLocationTypePhysical}
              />
            </div>

            {/* Date */}
            <div className="flex flex-col space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input id="date" name="date" type="date" min={today} required />
            </div>

            {/* Deadline */}
            <div className="flex flex-col space-y-2">
              <Label htmlFor="deadline">Deadline</Label>
              <Input
                id="deadline"
                name="deadline"
                type="date"
                min={today}
                required
              />
            </div>

            {/* Time */}
            <div className="flex flex-col space-y-2">
              <Label htmlFor="time">Time</Label>
              <Input id="time" name="time" type="time" required />
            </div>
          </div>

          {/* Image Upload */}
          <div className="flex flex-col space-y-2">
            <Label htmlFor="image">Upload Event Image</Label>
            <Input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              required
            />
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="w-32 h-32 object-cover rounded-lg mt-2"
              />
            )}
          </div>

          {/* Description */}
          <div className="flex flex-col space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" name="description" rows={4} required />
          </div>

          {/* Submit */}
          <Button type="submit" className="" disabled={loading}>
            {loading ? "সাবমিট হচ্ছে" : "সাবমিট"}
          </Button>
        </form>
      </div>
    </>
  );
}
