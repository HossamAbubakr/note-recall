interface AuthMessageProps {
  message: string;
}

export default function AuthMessage({ message }: AuthMessageProps) {
  if (!message) return null;

  const isSuccess = message.includes("successfully");

  return (
    <div
      className={`mb-4 p-3 rounded-lg text-sm ${
        isSuccess ? "bg-green-900 text-green-100" : "bg-red-900 text-red-100"
      }`}
    >
      {message}
    </div>
  );
}
