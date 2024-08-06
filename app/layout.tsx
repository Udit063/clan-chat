import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ModalProvider } from "@/components/modal-provider";
import { SessionProvider } from 'next-auth/react';
import { Toaster } from "@/components/ui/sonner";
import { WebSocketProvider } from "@/components/socket-provider";

const font = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Clan Chat",
  description: "Clan Chat is an application to modernize the way chat applications work. We provide you with an excess of chat, audio and video call functionality along with role-based management of users",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        <div className="h-screen w-screen ">
          <SessionProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
            >
              <ModalProvider />
              <WebSocketProvider>
                {children}
              </WebSocketProvider>
              <Toaster />
            </ThemeProvider>
          </SessionProvider>
        </div>
      </body>
    </html>
  );
}

