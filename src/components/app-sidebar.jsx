"use client";

import * as React from "react";
import { MdOutlinePayment, MdOutlineEventNote, MdOutlineRateReview } from "react-icons/md";
import { LuLayoutDashboard, LuTicketCheck } from "react-icons/lu";

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

// This is sample data.
const data = {
  organization: {
    name: "DIPLOMA 360",
    logo: "/icon.png",
    plan: "Organizer",
  },

  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: <LuLayoutDashboard />,
      isActive: true,
      items: [
        {
          title: "Registration",
          url: "/dashboard/registration",
        },
        {
          title: "Students",
          url: "/dashboard/students",
        },
      ],
    },
    {
      title: "Payment Request",
      url: "/dashboard/payment-request",
      icon: <MdOutlinePayment />,
    },
    {
      title: "Events",
      url: "/dashboard/events",
      icon: <MdOutlineEventNote />,
    },
    {
      title: "Reviews",
      url: "/dashboard/reviews",
      icon: <MdOutlineRateReview />,
    },
    {
      title: "Ticket Validation",
      url: "/dashboard/ticket-validation",
      icon: <LuTicketCheck />,
    },
  ],
};

export function AppSidebar({ ...props }) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <OrganizationInfo organization={data.organization} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
