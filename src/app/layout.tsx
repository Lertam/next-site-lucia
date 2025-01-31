import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.scss";
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

const openSans = localFont({
  src: "./fonts/OpenSans-VariableFont_wdth,wght.ttf",
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
    <html lang={"ru"}>
      <body
        className={`${robotoRegular.className} antialiased flex flex-col h-[100vh] align-middle`}
      >
        <Header />
        <main
          className={`${openSans.className} pb-10 mb-10 relative md:max-w-[720px] lg:max-w-[940px] xl:max-w-[1140px] m-auto w-full px-2 sm:py-0 flex flex-col justify-stretch`}
          style={{ flexGrow: 999 }}
        >
          {/* TODO Прописать брейкпоинты */}
          {children}
          <UserCounter />
        </main>
        <Footer />
        <div id="modal-root" />
      </body>
    </html>
  );
}
