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
  title: {
    default: "Gaza Alfath | Software Engineer & Tech Writer",
    template: "%s | Gaza Alfath",
  },
  description: "Personal blog of Gaza Alfath, a Software Engineer focusing on AI, Fullstack development, and tech career.",
  keywords: ["Software Engineer", "Fullstack Developer", "AI", "Next.js", "React", "Tech Blog"],
  authors: [{ name: "Gaza Alfath" }],
  creator: "Gaza Alfath",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://gazaalfath.my.id",
    siteName: "Gaza Alfath Blog",
    title: "Gaza Alfath | Software Engineer",
    description: "Personal blog of Gaza Alfath.",
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
    title: "Gaza Alfath",
    description: "Software Engineer & Tech Writer",
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
