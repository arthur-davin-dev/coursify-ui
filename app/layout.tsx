import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavbarWrapper from "@/components/layout/NavbarWrapper";
import Footer from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Coursify",
  description: "Learn from industry experts.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        {/* This wrapper handles the logic of which nav to show */}
        <NavbarWrapper />
        <main className="flex-grow">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}


// import type { Metadata } from "next";
// import { Inter } from "next/font/google";
// import "./globals.css";
// import Footer from "@/components/Footer";
// import NavbarWrapper from "@/components/NavbarWrapper";
// import ReduxProvider from "@/redux/ReduxProvider"; // You need a Client Wrapper for Redux

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
//       <body className={`${inter.className} min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100`}>
//         {/* Redux Provider must wrap the parts of the app 
//           that need access to the store 
//         */}
//         <ReduxProvider>
//           <NavbarWrapper />
          
//           <main className="flex-grow">
//             {children}
//           </main>

//           <Footer />
//         </ReduxProvider>
//       </body>
//     </html>
//   );
// }