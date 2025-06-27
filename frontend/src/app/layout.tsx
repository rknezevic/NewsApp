'use client';
import "./globals.css";
import QueryProvider from "../features/QueryProvider";
import { Header } from "@/components/Header/Header";
import { use } from "react";
import { usePathname } from "next/navigation";
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const noHeader = ['/signin', '/signup'];
  return (
    <html lang="en">
      <body>
        <QueryProvider>
          <main>
            {!noHeader.includes(pathname) && <Header />}
            {children}
          </main>
        </QueryProvider>
      </body>
    </html>
  );
}
