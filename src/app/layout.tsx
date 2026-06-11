import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "IXTHUS | Comunidad Juvenil Católica",
  description:
    "IXTHUS es una comunidad juvenil católica que evangeliza de joven a joven para hacer del mundo la Iglesia que Jesús soñó.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
