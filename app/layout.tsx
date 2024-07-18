import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ModalProvider } from "@/components/modal-provider";
import { Toaster } from "@/components/ui/sonner"

const font = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Clan Chat",
  description: "clan chat is an application to modernize the way chat applications work. We provide you with an excess of chat, audio and video call functionality along with the role based management of user",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        <div className="h-screen w-screen">
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <ModalProvider />
            {children}
          </ThemeProvider>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
