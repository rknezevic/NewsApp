import "./globals.css";
import QueryProvider from "../features/QueryProvider";
import ClientLayout from "./clientLayout";
const noHeader = ["/signin", "signup"]
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
   return (
    <html lang="en">
      <body>
        <QueryProvider>
          <main>
            <ClientLayout>{children}</ClientLayout>
          </main>
        </QueryProvider>
      </body>
    </html>
  );
}
