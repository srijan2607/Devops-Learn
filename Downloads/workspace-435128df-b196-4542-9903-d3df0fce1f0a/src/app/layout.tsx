import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { SessionProviderWrapper } from "@/components/providers/session-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ContentCraft AI - AI-Powered Content Creation",
  description: "Create high-quality, SEO-optimized content with AI. Industry-specific content generation with brand voice adaptation.",
  keywords: ["ContentCraft AI", "AI content generation", "content marketing", "SEO", "brand voice", "content creation"],
  authors: [{ name: "ContentCraft AI Team" }],
  openGraph: {
    title: "ContentCraft AI",
    description: "AI-powered content creation platform for businesses",
    url: "https://contentcraft.ai",
    siteName: "ContentCraft AI",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ContentCraft AI",
    description: "AI-powered content creation platform for businesses",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <SessionProviderWrapper>
          {children}
          <Toaster />
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
