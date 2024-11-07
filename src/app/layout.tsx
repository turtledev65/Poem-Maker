import type { Metadata } from "next";
import "./globals.css";

type Props = Readonly<{
  children: React.ReactNode;
}>;
const RootLayout = ({ children }: Props) => {
  return (
    <html lang="en">
      <body className="h-screen">{children}</body>
    </html>
  );
};
export default RootLayout;

export const metadata: Metadata = {
  title: "Poem Maker",
  description: "An app for making and sharing poems",
};
