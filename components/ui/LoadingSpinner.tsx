interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  text?: string;
  className?: string;
  textColor?: string;
}

export default function LoadingSpinner({
  size = "md",
  text = "Loading...",
  className = "",
  textColor = "",
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  };

  const textSizes = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };

  return (
    <div className={`text-center ${className}`}>
      <div
        className={`animate-spin rounded-full border-b-2 border-current mx-auto mb-4 ${sizeClasses[size]}`}
      ></div>
      {text && <p className={`${textSizes[size]} ${textColor}`}>{text}</p>}
    </div>
  );
}
