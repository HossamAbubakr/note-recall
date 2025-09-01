import { ReactNode } from "react";

interface AuthContainerProps {
  children: ReactNode;
}

export default function AuthContainer({ children }: AuthContainerProps) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#212121] text-white p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl bg-[#181818] rounded-2xl p-6 sm:p-8 lg:p-10 shadow-2xl">
        {children}
      </div>
    </div>
  );
}
