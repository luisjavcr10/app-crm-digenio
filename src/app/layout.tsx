import "./globals.css";
import type { Metadata } from "next";
import { AuthProvider } from "@/client/contexts/AuthContext";
import ApolloWrapper from "@/client/contexts/ApolloWrapper";
import { ThemeWrapper } from "@/client/contexts/ThemeWrapper";
import { Be_Vietnam_Pro } from "next/font/google";
import { Header } from "@/client/components/shared/Header";
import { Footer } from "@/client/components/shared/Footer";
import { Sidebar } from "@/client/components/shared/Sidebar";

const beVietmanPro = Be_Vietnam_Pro({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["italic", "normal"],
  subsets: ["latin"],
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
        className={`h-screen flex flex-col bg-background text-foreground ${beVietmanPro.className}`}
      >
        <ThemeWrapper>
          <ApolloWrapper>
            <AuthProvider>
              <div className="flex-1 flex">

                <Sidebar />

                <div className="flex-1 flex flex-col">
                  <Header />
                  {children}
                </div>
              
              </div>
                  
              <Footer />
            </AuthProvider>
          </ApolloWrapper>
        </ThemeWrapper>
      </body>
    </html>
  );
}
