interface AuthButtonProps {
  isLoading: boolean;
  isSignup: boolean;
}

export default function AuthButton({ isLoading, isSignup }: AuthButtonProps) {
  return (
    <button
      type="submit"
      disabled={isLoading}
      className="w-full py-3 sm:py-4 bg-white text-black font-semibold rounded-lg hover:bg-gray-300 transition duration-200 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isLoading ? "Processing..." : isSignup ? "Sign Up" : "Sign In"}
    </button>
  );
}
