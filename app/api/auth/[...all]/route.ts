// app/api/auth/[...all]/route.ts
import { auth } from "@/lib/auth"; // adjust path to your auth.ts
import { toNextJsHandler } from "better-auth/next-js";

export const { GET, POST } = toNextJsHandler(auth);