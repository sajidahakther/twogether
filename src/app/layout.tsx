import "./globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { AuthProvider } from "@/hooks/useAuth";

const apercuRegular = localFont({
  src: [
    {
      path: "./fonts/apercu-regular.otf",
      weight: "400",
      style: "normal",
    },
  ],
});

const apercuBold = localFont({
  src: [
    {
      path: "./fonts/apercu-bold.otf",
      weight: "700",
      style: "bold",
    },
  ],
});

const nimbus = localFont({
  src: [
    {
      path: "./fonts/tan-nimbus.otf",
      weight: "700",
      style: "bold",
    },
  ],
});

export const metadata: Metadata = {
  title: "Twogether",
  description: "Getting things done, twogether.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${(nimbus.className, apercuBold.className, apercuRegular.className)}`}
      >
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
