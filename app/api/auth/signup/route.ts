import { NextResponse } from "next/server";
import { hash } from "@/lib/hash";
import prisma from "@/lib/prisma";
import { signupSchema } from "@/app/auth/_schemas";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validatedData = signupSchema.parse(body);

    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await hash(validatedData.password);

    const user = await prisma.user.create({
      data: {
        email: validatedData.email,
        passwordHash: hashedPassword,
      },
    });

    return NextResponse.json({
      success: true,
      user: { id: user.id, email: user.email },
      message: "Account created successfully! Please sign in.",
      redirectTo: "/chat",
    });
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { error: "Failed to create account" },
      { status: 400 }
    );
  }
}
