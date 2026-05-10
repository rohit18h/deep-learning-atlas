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
  title: {
    default: "Deep Learning | Interactive Educational Atlas",
    template: "%s | Deep Learning"
  },
  description: "Master neural networks through high-fidelity interactive visualizations and metaphor-driven explanations. Learn biological neurons, CNNs, RNNs, and more.",
  keywords: ["Deep Learning", "Neural Networks", "AI Education", "Machine Learning", "Visual Atlas", "CNN", "RNN", "Transformers"],
  authors: [{ name: "Neural Intelligence Team" }],
  openGraph: {
    title: "Deep Learning | Interactive Educational Atlas",
    description: "The ultimate visual guide to understanding neural networks.",
    type: "website",
    locale: "en_US",
    siteName: "Deep Learning",
  },
  twitter: {
    card: "summary_large_image",
    title: "Deep Learning | Interactive Educational Atlas",
    description: "Master AI concepts through immersive visual learning.",
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
