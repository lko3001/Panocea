import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { GlobalContextProvider } from "@/components/context/GlobalContext";
import { ThemeProvider } from "@/components/ui/theme-provider";
import AuthProvider from "@/components/layout/AuthProvider";
import { PomodoroContextProvider } from "@/components/context/PomodoroContext";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Panocea",
  description: "Panocea",
  manifest: "/manifest.json",
  icons: { apple: "/icon.png" },
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className}`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AuthProvider>
            <GlobalContextProvider>
              <PomodoroContextProvider>
                <main className="px-4">{children}</main>
              </PomodoroContextProvider>
            </GlobalContextProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
