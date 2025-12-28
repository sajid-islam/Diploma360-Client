"use client";

import { LuLayoutDashboard, LuTicketCheck } from "react-icons/lu";
import {
  MdOutlineEventNote,
  MdOutlinePayment,
  MdOutlineRateReview,
} from "react-icons/md";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import OrganizationInfo from "@/components/organization-info";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import useRole from "@/hooks/useRole";

export function AppSidebar({ ...props }) {
  const { isOrganizer, isStudent, isSuperAdmin } = useRole();

  const data = {
    organization: {
      name: "DIPLOMA 360",
      logo: "/icon.png",
      plan: isSuperAdmin
        ? "Super Admin"
        : isOrganizer
        ? "Organizer"
        : "Student",
    },
  };
  const navMain = [
    // DASHBOARD (Organizer + Super Admin)
    (isOrganizer || isSuperAdmin) && {
      title: "Dashboard",
      url: "/dashboard",
      icon: <LuLayoutDashboard />,
      isActive: true,
      items: isOrganizer
        ? [
            {
              title: "Registration",
              url: "/dashboard/registration",
            },
          ]
        : [
            {
              title: "Students",
              url: "/dashboard/students",
            },
          ],
    },

    // PAYMENT REQUEST (Organizer only)
    isOrganizer && {
      title: "Payment Request",
      url: "/dashboard/payment-requests",
      icon: <MdOutlinePayment />,
    },

    // EVENTS (Organizer + Super Admin)
    (isOrganizer || isSuperAdmin) && {
      title: "Events",
      url: "/dashboard/events",
      icon: <MdOutlineEventNote />,
      items: (isOrganizer || isSuperAdmin) && [
        { title: "Add Event", url: "/dashboard/add-event" },
        { title: "My Events", url: "/dashboard/my-events" },
      ],
    },

    // REVIEWS (Organizer + Super Admin)
    (isOrganizer || isSuperAdmin) && {
      title: "Reviews",
      url: "/dashboard/reviews",
      icon: <MdOutlineRateReview />,
    },

    // TICKET VALIDATION (Organizer only)
    isOrganizer && {
      title: "Ticket Validation",
      url: "/dashboard/ticket-validation",
      icon: <LuTicketCheck />,
    },

    // MY BOOKINGS (Student only)
    isStudent && {
      title: "My Bookings",
      url: "/dashboard/my-bookings",
      icon: <LuTicketCheck />,
    },
  ].filter(Boolean);
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <OrganizationInfo organization={data.organization} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
