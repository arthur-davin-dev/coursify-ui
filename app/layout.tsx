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


import type { Metadata } from "next";
import { Inter,Odor_Mean_Chey } from "next/font/google";
import "./globals.css";
import NavbarWrapper from "@/components/layout/NavbarWrapper";
import Footer from "@/components/layout/Footer";
import StoreProvider from "@/store/StoreProvider";
import I18nProvider from "@/components/I18nProvider"; // ✅ Import the new provider

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Coursify",
  description: "Learn from industry experts.",
};

const odorMeanChey = Odor_Mean_Chey({
  weight: "400", // Only weight 400 is available for this font
  subsets: ["khmer"],
  variable: "--font-odor",
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${odorMeanChey.variable} font-sans min-h-screen flex flex-col`}>
        <StoreProvider>
          {/* ✅ Wrap everything in the I18nProvider */}
          <I18nProvider> 
            <NavbarWrapper />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </I18nProvider>
        </StoreProvider>
      </body>
    </html>
  );
}