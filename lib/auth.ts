import { betterAuth, jwt } from "better-auth";
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

// import { betterAuth } from "better-auth";
// import { jwt } from "better-auth/plugins";          // ← correct import
// import { nextCookies } from "better-auth/next-js";
// import { Pool } from "pg";

// export const auth = betterAuth({
//   baseURL: process.env.BETTER_AUTH_URL!,
//   secret: process.env.BETTER_AUTH_SECRET!,

//   // ── Database (required for sessions/users) ──────────────
//   database: new Pool({
//     connectionString: process.env.DATABASE_URL,
//   }),

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
//       clientId: process.env.FACEBOOK_CLIENT_ID as string,
//       clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
//     },
//   },

//   user: {
//     additionalFields: {
//       role: {
//         type: "string",
//         required: false,
//         defaultValue: null,
//         input: true,
//       },
//     },
//   },

//   plugins: [
//     jwt({
//       jwt: {
//         secret: process.env.JWT_SECRET,   // decoded: this-is-my-super-secret-key-for-coursify-2024-app
//         expirationTime: "7d",
//       },
//     }),
//     nextCookies(),
//   ],
// });

// export type Session = typeof auth.$Infer.Session;
// export type User = typeof auth.$Infer.Session.user & {
//   role: "STUDENT" | "TEACHER" | null;
// };

// import { betterAuth } from "better-auth";
// import { jwt } from "better-auth/plugins";
// import { nextCookies } from "better-auth/next-js";

// export const auth = betterAuth({
//   secret: process.env.BETTER_AUTH_SECRET!,

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
//       clientId: process.env.FACEBOOK_CLIENT_ID as string,
//       clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
//     },
//   },

//   user: {
//     additionalFields: {
//       role: {
//         type: "string",
//         required: false,
//         defaultValue: null,
//         input: true,
//       },
//     },
//   },

//   // ✅ Both plugins in one array
//   plugins: [
//     jwt({
//       jwt: {
//         secret: process.env.JWT_SECRET,
//         expirationTime: "7d",
//       },
//     }),
//     nextCookies(),
//   ],
// });

// export type Session = typeof auth.$Infer.Session;
// export type User = typeof auth.$Infer.Session.user & {
//   role: "STUDENT" | "TEACHER" | null;
// };