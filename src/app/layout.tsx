import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ThemeProvider } from "@/design-system/theme/provider";
import { Sidebar } from "@/components/layout/Sidebar";
import { FaviconSwitcher } from "@/components/layout/FaviconSwitcher";
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
  title: "Rock-at UI — Design System",
  description: "Design System Rock-at: tokens, components e playground",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AntdRegistry>
          <ThemeProvider>
            <FaviconSwitcher />
            <div className="flex h-screen overflow-hidden">
              <Sidebar />
              <main className="flex-1 min-w-0 h-screen overflow-y-auto">
                {children}
              </main>
            </div>
          </ThemeProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
