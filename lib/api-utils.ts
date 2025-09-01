import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export interface ApiError {
  error: string;
  status?: number;
}

export async function getAuthenticatedUser() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  return session.user;
}

export function createErrorResponse(
  error: string,
  status: number = 500
): NextResponse {
  return NextResponse.json({ error }, { status });
}

export function createSuccessResponse(
  data: any,
  status: number = 200
): NextResponse {
  return NextResponse.json(data, { status });
}

export async function handleApiRequest<T>(
  handler: () => Promise<T>
): Promise<NextResponse> {
  try {
    const result = await handler();
    return createSuccessResponse(result);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An error occurred";
    const status =
      error instanceof Error && error.message === "Unauthorized" ? 401 : 500;
    return createErrorResponse(errorMessage, status);
  }
}
