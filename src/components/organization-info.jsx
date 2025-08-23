import Image from "next/image";
import { SidebarMenuButton } from "./ui/sidebar";

function OrganizationInfo({ organization }) {
  return (
    <SidebarMenuButton size="lg" className="">
      <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
        <Image
          src={organization.logo}
          width={50}
          height={50}
          alt="organization logo"
          className="size-4"
        />
      </div>
      <div className="grid flex-1 text-left text-sm leading-tight">
        <span className="truncate font-medium">{organization.name}</span>
        <span className="truncate text-xs">{organization.plan}</span>
      </div>
    </SidebarMenuButton>
  );
}

export default OrganizationInfo;
