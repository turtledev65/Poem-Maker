import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./_components/navbar";

type Props = Readonly<{
  children: React.ReactNode;
}>;
const RootLayout = ({ children }: Props) => {
  return (
    <html lang="en">
      <body className="h-screen">
        <Navbar />
        {children}
      </body>
    </html>
  );
};
export default RootLayout;

export const metadata: Metadata = {
  title: "Poem Maker",
  description: "An app for making and sharing poems",
};
