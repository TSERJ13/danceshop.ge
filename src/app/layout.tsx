import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import PWARegistration from "@/components/PWARegistration";
import { CartProvider } from "@/context/CartContext";
import CartDrawer from "@/components/CartDrawer";
import Toast from "@/components/Toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DanceShop Georgia - პრემიუმ საცეკვაო ტანსაცმელი და ფეხსაცმელი",
  description: "სამეჯლისო, ლათინური და სავარჯიშო საცეკვაო ტანსაცმელი და ფეხსაცმელი ქალების, კაცებისა და ბავშვებისთვის.",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "DanceShop",
  },
  icons: {
    icon: [
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ka" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <head>
        <link rel="manifest" href="/manifest.webmanifest" />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground selection:bg-yellow-500 selection:text-black">
        <CartProvider>
          <PWARegistration />
          {children}
          <CartDrawer />
          <Toast />
        </CartProvider>
      </body>
    </html>
  );
}
