import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./_components/navbar";
import Providers from "./_providers";

type Props = Readonly<{
  children: React.ReactNode;
}>;
const RootLayout = ({ children }: Props) => {
  return (
    <html lang="en">
      <body>
        <Providers>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
};
export default RootLayout;

export const metadata: Metadata = {
  title: "Poem Maker",
  description: "An app for making and sharing poems",
};
