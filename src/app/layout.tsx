import "./globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { AuthProvider } from "@/hooks/useAuth";

const apercuRegular = localFont({
  src: [
    {
      path: "./assets/fonts/apercu-regular.otf",
      weight: "400",
      style: "normal",
    },
  ],
});

const apercuBold = localFont({
  src: [
    {
      path: "./assets/fonts/apercu-bold.otf",
      weight: "700",
      style: "bold",
    },
  ],
});

const nimbus = localFont({
  src: [
    {
      path: "./assets/fonts/tan-nimbus.otf",
      weight: "700",
      style: "bold",
    },
  ],
});

export const metadata: Metadata = {
  title: "Twogether",
  description: "Getting things done, together.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body
        className={`${(nimbus.className, apercuBold.className, apercuRegular.className)}`}
      >
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
