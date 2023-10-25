import type { Metadata } from "next";
import { Merriweather, Poppins, Unbounded } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

export const merriweather = Merriweather({
  weight: ["300", "400", "700", "900"],
  display: "swap",
  subsets: ["latin"],
  variable: "--font-merriweather",
});

export const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "X-Hotel Management System",
  description:
    "A hotel monitoring system for X-Hotel for our final project in CIT 211 - System Integration and Architecture",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${merriweather.variable}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
