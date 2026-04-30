import type { Metadata } from "next";
import { VT323 } from "next/font/google";
import Image from "next/image";

import { ToastProvider } from "@/context/ToastContext";

import "./globals.css";

const font = VT323({
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Pixel Day",
  description: "Aesthethic pixel art organizer and notebook",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ToastProvider>
          <div className="relative flex min-h-[100dvh] flex-col items-center justify-center">
            <Image
              src="/assets/images/splash-background-1.gif"
              alt=""
              fill
              priority
              unoptimized
              sizes="100vw"
              aria-hidden="true"
              className="-z-10 object-cover"
            />
            {children}
          </div>
        </ToastProvider>
      </body>
    </html>
  );
}
