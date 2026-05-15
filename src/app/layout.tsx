import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { SessionProvider } from "next-auth/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://blog.gazaalfath.my.id"),
  title: {
    default: "Gaza Alfath Blog | Technical Insights & Engineering",
    template: "%s | Gaza Alfath Blog",
  },
  description: "Explore technical deep dives into AI, Fullstack development, and modern web architecture. Original insights for developers and tech enthusiasts.",
  keywords: ["Technical Blog", "Software Engineering", "AI Insights", "Next.js", "React", "Web Development", "Gaza Alfath"],
  authors: [{ name: "Gaza Alfath" }],
  creator: "Gaza Alfath",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://blog.gazaalfath.my.id",
    siteName: "Gaza Alfath Technical Blog",
    title: "Gaza Alfath Blog | Technical Insights & Engineering",
    description: "Deep dives into AI, Fullstack development, and modern tech.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Gaza Alfath Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gaza Alfath Blog",
    description: "Technical Deep Dives for Modern Developers",
    creator: "@gazfath12",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} min-h-screen flex flex-col`}>
        <SessionProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
