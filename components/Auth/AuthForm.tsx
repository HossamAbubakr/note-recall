"use client";

import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { baseSchema, signupSchema } from "@/app/auth/_schemas";
import { signUp } from "@/actions/auth";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import AuthContainer from "./AuthContainer";
import AuthHeader from "./AuthHeader";
import AuthMessage from "./AuthMessage";
import AuthInput from "./AuthInput";
import AuthButton from "./AuthButton";
import AuthToggle from "./AuthToggle";

type AuthData = {
  email: string;
  password: string;
  confirmPassword?: string;
};

export default function AuthForm() {
  const [isSignup, setIsSignup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const schema = isSignup ? signupSchema : baseSchema;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AuthData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = useCallback(
    async (data: AuthData) => {
      setIsLoading(true);
      setMessage("");

      try {
        if (isSignup) {
          const result = await signUp(data.email, data.password);

          if (result.success) {
            setMessage("Account created successfully! Please sign in.");
            setIsSignup(false);
            reset();

            setTimeout(() => {
              router.push("/chat");
            }, 2000);
          }
        } else {
          const result = await signIn("credentials", {
            email: data.email,
            password: data.password,
            redirect: false,
          });

          if (result?.error) {
            setMessage("Invalid email or password");
          } else if (result?.ok) {
            setMessage("Sign-in successful! Redirecting...");
            router.push("/chat");
          }
        }
      } catch (error: unknown) {
        console.error(error);
        setMessage(
          error instanceof Error ? error.message : "An error occurred"
        );
      } finally {
        setIsLoading(false);
      }
    },
    [isSignup, reset, router]
  );

  const handleToggle = useCallback(() => {
    setIsSignup(!isSignup);
    setMessage("");
    reset();
  }, [isSignup, reset]);

  return (
    <AuthContainer>
      <AuthHeader isSignup={isSignup} />
      <AuthMessage message={message} />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 sm:space-y-6"
      >
        <AuthInput
          type="email"
          placeholder="Email"
          register={register("email")}
          error={errors.email}
          disabled={isLoading}
        />

        <AuthInput
          type="password"
          placeholder="Password"
          register={register("password")}
          error={errors.password}
          disabled={isLoading}
        />

        {isSignup && (
          <AuthInput
            type="password"
            placeholder="Confirm Password"
            register={register("confirmPassword")}
            error={errors.confirmPassword}
            disabled={isLoading}
          />
        )}

        <AuthButton isLoading={isLoading} isSignup={isSignup} />
      </form>

      <AuthToggle
        isSignup={isSignup}
        isLoading={isLoading}
        onToggle={handleToggle}
      />
    </AuthContainer>
  );
}
