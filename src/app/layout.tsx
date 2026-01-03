import "./globals.css";
import 'highlight.js/styles/github-dark-dimmed.css';
import { Noto_Sans } from "next/font/google";
import { ThemeProvider } from "@/app/components/ThemeProvider";

const notoSans = Noto_Sans({ subsets: ["latin"], display: "swap" });

export const metadata = {
  title: "Chani-Blog",
  description: "바둑 좋아하는 개발자의 의미있는 학습 기록을 위한 공간",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const theme = localStorage.getItem('theme') ||
                  (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
                document.documentElement.classList.toggle('dark', theme === 'dark');
              })();
            `,
          }}
        />
      </head>
      <body className={`${notoSans.className} bg-background text-foreground`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
