export interface SignUpResponse {
  success: boolean;
  user: { id: string; email: string };
  message: string;
  redirectTo: string;
}

export async function signUp(
  email: string,
  password: string
): Promise<SignUpResponse> {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Sign-up failed");
  }

  return data;
}
