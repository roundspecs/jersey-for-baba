import type { Metadata } from "next";
import { Geist, Geist_Mono, Teko, Montserrat, Antonio, Bebas_Neue } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const teko = Teko({
  variable: "--font-teko",
  subsets: ["latin"],
  weight: ["700"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["900"],
});

const antonio = Antonio({
  variable: "--font-antonio",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "JerseyForBaba — World Cup 2026 Kit Customizer",
  description: "Design and export custom high-resolution Argentina & Brazil football jerseys for World Cup 2026. Choose your name, number, and fonts!",
  openGraph: {
    title: "JerseyForBaba — World Cup 2026 Kit Customizer",
    description: "Design and export custom high-resolution Argentina & Brazil football jerseys for World Cup 2026. Choose your name, number, and fonts!",
    url: "https://jersey-for-baba.vercel.app",
    siteName: "JerseyForBaba",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "JerseyForBaba — World Cup 2026 Kit Customizer",
    description: "Design and export custom high-resolution Argentina & Brazil football jerseys for World Cup 2026. Choose your name, number, and fonts!",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${teko.variable} ${montserrat.variable} ${antonio.variable} ${bebasNeue.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
