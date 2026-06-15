import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { firstComponent, getGlobal } from "@/lib/getGlobal";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export async function generateMetadata(): Promise<Metadata> {
  const global = await getGlobal()?.catch(() => null);
  const navbar = firstComponent(global?.navbar);
  return { title: navbar?.logo ?? undefined };
}

export const viewport: Viewport = { themeColor: "#0b0b0b" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter?.variable}>
      <body className="min-h-screen bg-[#0b0b0b] text-white antialiased">
        <Navbar />
        <div className="pt-20">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
