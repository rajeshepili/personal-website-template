import type { Metadata } from "next";
import { Merienda, Quicksand } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/navbar";
import { config } from "@/config";
import Footer from "@/components/layout/footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import ScrollToTop from "@/components/ScrollToTop";

const quicksand = Quicksand({
  subsets: ["latin"],
  variable: "--font-quicksand",
});

const merienda = Merienda({
  subsets: ["latin"],
  variable: "--font-merienda",
});

export const metadata: Metadata = {
  title: `${config.website.name}`,
  description: `Welcome to the personal blog of ${config.user.firstname} ${config.user.lastname}`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${quicksand.className} ${merienda.className} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main>{children}</main>
          <Footer />
          <ScrollToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
