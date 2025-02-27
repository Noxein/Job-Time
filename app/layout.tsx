import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { RemoveIndexesContextProvider } from "./context/RemoveIndexes";
import { UserFetcher } from "./ui/UserFetcher";
import { Swiper } from "./ui/Swiper";
import { SideNavContextProvider } from "./context/SideNavContext";
import { TableRefContextProvider } from "./context/PhoneTableRefContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  manifest: "/manifest.json",
  title: "Create Next App",
  description: "Generated by create next app",
};

export const viewport: Viewport = {
  themeColor: "#ADD8E6",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={` ${inter} flex`}>
        <RemoveIndexesContextProvider>
          <UserFetcher>
            <SideNavContextProvider>
              <TableRefContextProvider>
                  {children}
                  <Swiper/>
              </TableRefContextProvider>
            </SideNavContextProvider>
          </UserFetcher>
        </RemoveIndexesContextProvider>
      </body>
    </html>
  );
}
