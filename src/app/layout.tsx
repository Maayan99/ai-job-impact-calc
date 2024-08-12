import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Job Impact Calculator",
  description: "Discover how AI might impact your career with our advanced AI Job Impact Calculator. Get personalized insights on the future of your profession.",
  keywords: "AI, job impact, career, future of work, artificial intelligence, employment",
  openGraph: {
    title: "AI Job Impact Calculator",
    description: "Discover how AI might impact your career with our advanced AI Job Impact Calculator.",
    url: "https://ai-job-impact-calc.vercel.app",
    siteName: "AI Job Impact Calculator",
    images: [
      {
        url: "https://ai-job-impact-calc.vercel.app/og-image.png",
        width: 848,
        height: 477,
        alt: "AI Job Impact Calculator Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Job Impact Calculator",
    description: "Discover how AI might impact your career with our advanced AI Job Impact Calculator.",
    images: ["https://ai-job-impact-calc.vercel.app/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
    ],
    apple: [
      { url: "/apple-touch-icon.png" },
    ],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">
      <body className={inter.className}>
        {children}
      <Analytics/>
      </body>
      </html>
  );
}