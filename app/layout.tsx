// import type { Metadata } from "next";
// import { Inter } from "next/font/google";
// import "./globals.css";
// import NavbarWrapper from "@/components/layout/NavbarWrapper";
// import Footer from "@/components/layout/Footer";
// import StoreProvider from "@/store/StoreProvider";

// const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Coursify",
//   description: "Learn from industry experts.",
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en">
//       <body className={`${inter.className} min-h-screen flex flex-col`}>
//         {/* This wrapper handles the logic of which nav to show */}

//         <StoreProvider>
//         <NavbarWrapper />
//         <main className="flex-grow">
//           {children}
//         </main>
//         <Footer />
//         </StoreProvider>
//       </body>
//     </html>
//   );
// }

import { Inter, Odor_Mean_Chey, Moul, Kantumruy_Pro } from "next/font/google";
import "./globals.css";
import NavbarWrapper from "@/components/layout/NavbarWrapper";
import Footer from "@/components/layout/Footer";
import StoreProvider from "@/store/StoreProvider";
import I18nProvider from "@/components/I18nProvider";
import { Metadata } from "next";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://cousify.vercel.app"),

  title: {
    default: "Coursify | Learn Programming & Tech Skills Online",
    template: "%s | Coursify",
  },

  description:
    "Coursify is a modern e-learning platform to learn programming, web development, and IT skills in Cambodia. Start learning today.",

  keywords: [
    "Coursify",
    "online courses Cambodia",
    "learn programming",
    "web development course",
    "IT training Cambodia",
    "e-learning platform",
  ],

  authors: [{ name: "Coursify Team" }],

  openGraph: {
    title: "Coursify | Learn Anytime, Anywhere",
    description:
      "Explore top courses in programming, design, and technology with Coursify.",
    url: "/",
    siteName: "Coursify",
    images: ["/thumbnail.jpg"], // cleaner (metadataBase handles full URL)
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Coursify",
    description: "Learn programming and tech skills online",
    images: ["/thumbnail.jpg"],
  },

  icons: {
    icon: "/favicon.ico",
  },

  // ✅ EXTRA (improves SEO)
  robots: {
    index: true,
    follow: true,
  },

  category: "education",
};

const odorMeanChey = Odor_Mean_Chey({
  weight: "400",
  subsets: ["khmer"],
  variable: "--font-odor",
  display: "swap",
});

const moul = Moul({
  weight: "400",
  subsets: ["khmer"],
  variable: "--font-moul",
});

const kantumruy = Kantumruy_Pro({
  subsets: ["khmer"],
  variable: "--font-kantumruy",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} ${odorMeanChey.variable} ${moul.variable} ${kantumruy.variable} font-sans min-h-screen flex flex-col`}
      >
        <StoreProvider>
          {/* ✅ Wrap everything in the I18nProvider */}
          <I18nProvider>
            <NavbarWrapper />
            <main className="flex-grow">{children}</main>
            <Footer />
            <Toaster position="top-right" />
          </I18nProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
