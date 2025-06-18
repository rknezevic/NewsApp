import "./globals.css";
import QueryProvider from "../features/QueryProvider";
import {Navbar} from "../components/Navbar/Navbar";
import { Header } from "@/components/Header/Header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
   return (
    <html lang="en">
      <body>
        <QueryProvider>
          <Header />
          <main>{children}</main>
        </QueryProvider>
      </body>
    </html>
  );
}
