import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Signalix Admin",
  description: "Admin panel for Signalix Digital Agency",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-navy-950 text-slate-100 font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
