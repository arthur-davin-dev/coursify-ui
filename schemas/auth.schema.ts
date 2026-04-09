import * as z from "zod";

export const registerSchema = z.object({
  username: z.string().min(3, "Username is too short"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be 6+ characters"),
  gender: z.enum(["MALE", "FEMALE", "OTHER"]),
  role: z.enum(["STUDENT", "TEACHER"]), // UI uses lowercase, we convert later
});