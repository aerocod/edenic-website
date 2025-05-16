import type React from "react";
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Organic Farm - Natural Fresh and Locally Premium Spices, Straight from the Heart of Indonesia",
  description: "Premium Spices, Straight from the Heart of Indonesia",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* Add suppressHydrationWarning here */}
      <body className="antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}