import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SidebarDemo } from "@/components/dashboard/dashboard-layout";
import { AppWrapper } from "@/context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Home | KraftWerk",
  icons: {
    icon: "kraft.png",
  },
  description:
    "With no effort on your part, we let you build beautiful resumes with the most attractive designs and templates. No more manually editing your template—just enter your information and let us handle the rest. Manage different versions of your CVs for various employers effortlessly. Elevate your professional presence and impress employers with ease!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <AppWrapper>{children}</AppWrapper>
      </body>
    </html>
  );
}
