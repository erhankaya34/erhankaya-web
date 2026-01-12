import type { Metadata, Viewport } from "next";
import { Bokor, Inter, JetBrains_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";

const bokor = Bokor({
  variable: "--font-bokor",
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  icons: {
    icon: '/assets/favicon.svg',
  },
  title: "Erhan Kaya | Software Engineer",
  description: "Software Engineer based in Istanbul. Creator of Pyralis, Co-founder of IGDA Istanbul.",
  keywords: ["Software Engineer", "Game Developer", "Istanbul", "Turkey", "IGDA", "Pyralis"],
  authors: [{ name: "Mustafa Erhan Kaya" }],
  creator: "Mustafa Erhan Kaya",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://erhankaya.dev",
    siteName: "Erhan Kaya",
    title: "Erhan Kaya | Software Engineer",
    description: "Software Engineer based in Istanbul. Creator of Pyralis, Co-founder of IGDA Istanbul.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Erhan Kaya | Software Engineer",
    description: "Software Engineer based in Istanbul.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${bokor.variable} ${playfair.variable} ${inter.variable} ${jetbrainsMono.variable} font-sans antialiased bg-void text-bone`}
      >
        {/* High quality grain texture overlay */}
        <div className="grain-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
