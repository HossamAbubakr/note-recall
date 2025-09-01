import { UseFormRegisterReturn, FieldError } from "react-hook-form";

interface AuthInputProps {
  type: "email" | "password";
  placeholder: string;
  register: UseFormRegisterReturn;
  error?: FieldError;
  disabled?: boolean;
}

export default function AuthInput({
  type,
  placeholder,
  register,
  error,
  disabled = false,
}: AuthInputProps) {
  return (
    <div>
      <input
        type={type}
        placeholder={placeholder}
        {...register}
        className="w-full p-3 sm:p-4 rounded-lg bg-[#303030] border border-[#232323] focus:outline-none focus:ring-2 focus:ring-white text-sm sm:text-base"
        disabled={disabled}
      />
      {error && (
        <p className="text-red-500 text-xs sm:text-sm mt-1">{error.message}</p>
      )}
    </div>
  );
}
