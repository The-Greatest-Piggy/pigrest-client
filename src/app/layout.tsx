import type { Metadata } from "next";
import "./globals.css";
import GNB from "../components/navbar/GNB";
import SNB from "@/components/navbar/SNB";
import { MswComponent } from "@/components/msw.component";

export const metadata: Metadata = {
  title: "Pigrest | The Greatest Piggy",
  description: "All the pigs in the world",
  icons: {
    icon: "images/bacon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="flex flex-col min-h-screen">
        <MswComponent />
        <GNB />
        <div className="flex flex-1 space-x-4">
          <SNB />
          <main className="flex-1">{children}</main>
        </div>
      </body>
    </html>
  );
}
