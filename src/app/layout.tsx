import type { Metadata } from "next";
import "./globals.css";
import { Header } from "app/components/shared/Header";
import { Footer } from "app/components/shared/Footer";

export const metadata: Metadata = {
  title: "Digenio",
  description: "Digenio's CRM",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body 
        className="
          bg-background text-foreground 
          font-beVietnam">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
