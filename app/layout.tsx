import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://claudeconfig.app"),
  title: {
    default: "Claude Config — Switch Claude Code providers in one click",
    template: "%s | Claude Config",
  },
  description:
    "Cross-platform desktop app for managing Claude Code provider profiles. Switch between Anthropic, GLM, Kimi, DeepSeek, Minimax, self-hosted, or any OpenAI-compatible provider.",
  keywords: [
    "claude code",
    "claude config",
    "anthropic",
    "openai compatible",
    "provider manager",
    "tauri",
    "desktop app",
  ],
  applicationName: "Claude Config",
  authors: [{ name: "Ayan De", url: "https://github.com/ayan-de" }],
  creator: "Ayan De",
  openGraph: {
    type: "website",
    title: "Claude Config — Switch Claude Code providers in one click",
    description:
      "Cross-platform desktop app for managing Claude Code provider profiles.",
    siteName: "Claude Config",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Claude Config — Switch Claude Code providers in one click",
    description:
      "Cross-platform desktop app for managing Claude Code provider profiles.",
    creator: "@ayan_de",
  },
  icons: {
    icon: "/logo.png",
    apple: "/logo@2x.png",
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
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-surface text-text-primary">
        {children}
      </body>
    </html>
  );
}