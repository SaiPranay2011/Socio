import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProviders } from "./themeProviders";
import ToasterContext from "@/components/context/toasterContext";
import AuthContext from "@/components/context/AuthContext";
import ActiveStatus from "@/components/reusableComponents/activeStatus";

const font = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Socio",
  description: "A messenger web-app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={font.className}>
        <ThemeProviders>
          <AuthContext>
            <ToasterContext />
            <ActiveStatus/>
            {children}
          </AuthContext>
        </ThemeProviders>
      </body>
    </html>
  );
}
