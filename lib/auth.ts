// import { betterAuth } from "better-auth";
// import { nextCookies } from "better-auth/next-js";

// export const auth = betterAuth({
//   //...
//   socialProviders: {
//     github: {
//       clientId: process.env.GITHUB_CLIENT_ID as string,
//       clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
//     },
//     google: {
//       clientId: process.env.GOOGLE_CLIENT_ID as string,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
//     },
//     facebook: {
//             clientId: process.env.FACEBOOK_CLIENT_ID as string,
//             clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
//     },
//   },
//   plugins: [nextCookies()],
// });
// export type Session = typeof auth.$Infer.Session;
// export type User = typeof auth.$Infer.Session.user;

import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL!,
  secret: process.env.BETTER_AUTH_SECRET!,
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
    facebook: {
      clientId: process.env.FACEBOOK_CLIENT_ID as string,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
    },
  },

  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: null,
        input: true,
      },
    },
  },

  plugins: [nextCookies()],
});

export type Session = typeof auth.$Infer.Session;
export type User = typeof auth.$Infer.Session.user & {
  role: "STUDENT" | "TEACHER" | null;
};
