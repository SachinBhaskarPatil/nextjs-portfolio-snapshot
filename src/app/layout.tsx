import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Portfolio Snapshot - Investment Dashboard",
  description: "Personal investment portfolio dashboard with real-time insights, asset allocation charts, and performance tracking",
  keywords: ["portfolio", "investment", "dashboard", "mutual funds", "asset allocation", "financial planning"],
  authors: [{ name: "Portfolio App" }],
  creator: "Portfolio App",
  publisher: "Portfolio App",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://your-domain.com'),
  openGraph: {
    title: "Portfolio Snapshot - Investment Dashboard",
    description: "Personal investment portfolio dashboard with real-time insights",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio Snapshot - Investment Dashboard",
    description: "Personal investment portfolio dashboard with real-time insights",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: "/Porfolio.svg",
    apple: "/Porfolio.svg",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
