import "./globals.css";
import QueryProvider from "./features/QueryProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <main>
          <QueryProvider>
            {children}
          </QueryProvider>
        </main>
      </body>
    </html>
  );
}
