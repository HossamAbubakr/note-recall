import z from "zod";

const baseSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const signupSchema = baseSchema
  .extend({
    confirmPassword: z.string().min(6, "Password confirmation required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export { baseSchema, signupSchema };
