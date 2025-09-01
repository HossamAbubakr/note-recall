import { Menu, SquareChevronLeft } from "lucide-react";

interface SidebarHeaderProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function SidebarHeader({ open, setOpen }: SidebarHeaderProps) {
  return (
    <div className="text-center p-2 border-b border-[#232323] items-center">
      <button
        onClick={() => setOpen(!open)}
        className={`p-2 text-gray-400 hover:text-white cursor-pointer ${
          open && "float-right"
        }`}
      >
        {open ? <SquareChevronLeft size={20} /> : <Menu size={20} />}
      </button>
    </div>
  );
}
