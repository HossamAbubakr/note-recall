import { UserRound } from "lucide-react";
import { Session } from "next-auth";

interface UserInfoProps {
  open: boolean;
  session: Session;
}

export default function UserInfo({ open, session }: UserInfoProps) {
  return (
    <div className={`p-2 rounded-lg ${!open && "flex justify-center"}`}>
      {open && <div className="text-sm text-gray-400 mb-2">Signed in as:</div>}
      <div className={`flex items-center ${!open && "justify-center"}`}>
        <UserRound size={16} className={open ? "ml-1" : "ml-0"} />
        {open && (
          <span className="ml-2 text-sm truncate">{session.user?.email}</span>
        )}
      </div>
    </div>
  );
}
