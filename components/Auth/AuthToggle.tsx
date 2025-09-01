interface AuthToggleProps {
  isSignup: boolean;
  isLoading: boolean;
  onToggle: () => void;
}

export default function AuthToggle({
  isSignup,
  isLoading,
  onToggle,
}: AuthToggleProps) {
  return (
    <p className="mt-6 sm:mt-8 text-center text-xs sm:text-sm text-gray-400">
      {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
      <button
        onClick={onToggle}
        className="text-white font-semibold hover:underline"
        disabled={isLoading}
      >
        {isSignup ? "Sign In" : "Sign Up"}
      </button>
    </p>
  );
}
