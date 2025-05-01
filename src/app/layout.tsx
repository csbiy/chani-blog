import "./globals.css";
import 'highlight.js/styles/github.css';
import { Noto_Sans } from "next/font/google";

const notoSans = Noto_Sans({ subsets: ["latin"], display: "swap" });

export const metadata = {
  title: "Chani-Blog",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
      <html lang="ko">
      <body className={notoSans.className}>
      {children}
      </body>
      </html>
  );
}
