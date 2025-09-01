interface AuthHeaderProps {
  isSignup: boolean;
}

export default function AuthHeader({ isSignup }: AuthHeaderProps) {
  return (
    <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-6 sm:mb-8 text-center">
      {isSignup ? "Create an Account" : "Sign In"}
    </h2>
  );
}
