import type { Metadata } from "next";
import { VT323 } from "next/font/google";
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
        {" "}
        <div
          className="flex flex-col items-center justify-center h-[calc(100dvh)] bg-center bg-cover"
          style={{ backgroundImage: "url(splash-background-1.gif)" }}
        >
          {children}
        </div>
      </body>
    </html>
  );
}
