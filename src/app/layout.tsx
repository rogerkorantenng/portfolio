import type { Metadata } from "next";
import localFont from "next/font/local";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Scanlines } from "@/components/scanlines";
import { MatrixRain } from "@/components/matrix-rain";
import { KonamiCode } from "@/components/konami-code";
import { XPNotification } from "@/components/xp-notification";
import { GamificationTracker } from "@/components/gamification-tracker";
import { profile } from "@/data/profile";
import "./globals.css";

const jetbrainsMono = localFont({
  src: "../../public/fonts/JetBrainsMono-VariableFont_wght.ttf",
  variable: "--font-jetbrains-mono",
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
        <MatrixRain opacity={0.03} speed={0.8} />
        <Scanlines />
        <XPNotification />
        <GamificationTracker />
        <KonamiCode>
          <div className="relative z-10 flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </KonamiCode>
      </body>
    </html>
  );
}
