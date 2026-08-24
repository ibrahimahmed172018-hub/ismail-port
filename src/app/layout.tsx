import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ISMAIL_DATA } from "@/data/portfolio";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ismailmohamed.vercel.app"),
  title: `${ISMAIL_DATA.personal.name} — ${ISMAIL_DATA.personal.jobTitle}`,
  description: ISMAIL_DATA.personal.bio,
  keywords: [
    "Graphic Designer",
    "Digital Marketing",
    "Video Editing",
    "Audio Creator",
    "Motion Graphics",
    "Brand Identity",
    "Retina Agency",
    "Ismail Mohamed",
    "Egypt Designer"
  ],
  authors: [{ name: ISMAIL_DATA.personal.name }],
  openGraph: {
    title: `${ISMAIL_DATA.personal.name} — ${ISMAIL_DATA.personal.jobTitle}`,
    description: ISMAIL_DATA.personal.bio,
    images: [{ url: "/ismail_hero.jpg" }]
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark antialiased scroll-smooth`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-black text-white selection:bg-red-600 selection:text-white" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
