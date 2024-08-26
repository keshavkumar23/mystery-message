import { z } from "zod";

export const usernameValidation = z
    .string()
    .min(2, "Username must be at least of 2 character")
    .max(20, "Username must not be more than of 20 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Username must not contain any special character")


export const signUpSchema = z.object({
    username: usernameValidation,
    email: z.string().email({message: "Invalid email address"}),
    password: z.string().min(6, {message: "Password must be at least of 6 character"})
})