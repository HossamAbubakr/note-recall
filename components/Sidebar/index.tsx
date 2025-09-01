"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import SidebarHeader from "./SidebarHeader";
import SidebarContent from "./SidebarContent";
import SidebarFooter from "./SidebarFooter";

export default function Sidebar() {
  const [open, setOpen] = useState(true);
  const { data: session } = useSession();

  if (!session) return null;

  return (
    <aside
      className={`${
        open ? "w-56" : "w-16"
      } bg-[#181818] text-gray-200 flex flex-col flex-shrink-0`}
    >
      <SidebarHeader open={open} setOpen={setOpen} />
      <SidebarContent open={open} />
      <SidebarFooter open={open} session={session} />
    </aside>
  );
}
