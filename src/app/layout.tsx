import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Scanlines } from "@/components/scanlines";
import { profile } from "@/data/profile";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${profile.name} | SYSTEM_OPERATIVE`,
    template: `%s | ${profile.name}`,
  },
  description: profile.summary,
  keywords: [
    "Software Engineer",
    "Backend Developer",
    "AI Engineer",
    "Machine Learning",
    "Laravel",
    "Python",
    "AWS",
    "Ghana",
    "Cyberpunk",
    "Hacker",
  ],
  authors: [{ name: profile.name }],
  creator: profile.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: profile.name,
    title: `${profile.name} | SYSTEM_OPERATIVE`,
    description: profile.summary,
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} | SYSTEM_OPERATIVE`,
    description: profile.summary,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${jetbrainsMono.variable} antialiased`}>
        <Scanlines />
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
