import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import UserCounter from "@/components/UserCounter";

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });
const robotoRegular = localFont({
  src: "./fonts/Roboto-Regular.ttf",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Ретушь и картинки для гравировки",
    default: "Ретушь и картинки для гравировки",
  },
  // description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${robotoRegular.className} antialiased flex flex-col h-[100vh]`}
      >
        <Header />
        <main
          className={"pb-10 flex flex-col relative"}
          style={{ flexGrow: 999 }}
        >
          {/* TODO Прописать брейкпоинты */}
          {children}
          <UserCounter />
        </main>
        <Footer />
      </body>
    </html>
  );
}
