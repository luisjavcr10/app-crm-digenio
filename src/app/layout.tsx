import type { Metadata } from "next";
import { Be_Vietnam_Pro} from "next/font/google";
import "./globals.css";
import { Header } from "app/components/shared/Header";
import { Footer } from "app/components/shared/Footer";

const beVietmanPro = Be_Vietnam_Pro({
  weight:['100','200','300','400','500','600','700','800','900'],
  style:['italic','normal'],
  subsets:['latin'],
});

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
        className={`
          bg-background text-foreground 
          ${beVietmanPro.className} `}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
