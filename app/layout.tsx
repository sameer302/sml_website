import "./globals.css";
import Navbar from "./components/Navbar";

export const metadata = {
  title: "Sensing & Monitoring Lab | IIT Bombay",
  description: "End-to-end digital health screening and diagnostics research at the Koita Centre for Digital Health, IIT Bombay.",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}