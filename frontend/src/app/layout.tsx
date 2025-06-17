import "./globals.css";
import QueryProvider from "./features/QueryProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <main>
          <QueryProvider>
            {children}
            </QueryProvider>
      </main>
    </html>
  );
}
