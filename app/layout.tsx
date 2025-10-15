import "./globals.css";
import Navbar from "./_components/Navbar";
import { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import AlertBox from "./_components/AlertBox";

export const metadata: Metadata = {
  title: "Arcade Lab",
  icons: {
    icon: "/logo/arcade_lab_logo_64.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="text-text-dark font-[DepartureMono]">
        <SpeedInsights />
        <Analytics />
        <div className="flex flex-col">
          <div className="fixed top-0 w-screen h-screen from-dark-1400 to-dark-1400 via-dark-900 bg-linear-to-r" />
          <div
            style={{
              position: "fixed",
              top: 0,
              zIndex: 10,
              width: "100dvw",
              height: "100dvh",
              backgroundSize: "2rem 2rem",
              backgroundImage:
                "linear-gradient(to right, rgb(26, 26, 36, 0.2) 2px, transparent 2px),linear-gradient(to bottom, rgb(26, 26, 36, 0.2) 2px, transparent 2px)",
            }}
          />
          <div className="flex z-10 flex-col min-h-dvh">
            <Navbar />
            <AlertBox context="global" />
            <div className="flex flex-1 mt-[100px]">{children}</div>
          </div>
        </div>
      </body>
    </html>
  );
}
