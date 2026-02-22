import "./globals.css";
import Navbar from "./components/Navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-br from-indigo-100 via-sky-100 to-teal-100">        <Navbar />
        {children}
      </body>
    </html>
  );
}
