import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NextAuthProvider } from "./provider";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Subsmatt: Langblocks',
  description: 'Learn language',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <NextAuthProvider>
        <body className={inter.className}>{children}</body>
      </NextAuthProvider>
    </html>
  )
}
