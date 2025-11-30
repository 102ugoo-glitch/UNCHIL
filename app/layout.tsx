import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "운칠(UNCHIL)",
  description: "운칠기삼 중, 일곱 칸을 채워드려요",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        {/* 온글잎 박다현체 폰트 */}
        <link rel="preconnect" href="https://fastly.jsdelivr.net" />
      <style dangerouslySetInnerHTML={{__html: `
  @font-face {
    font-family: 'Ownglyph_ParkDaHyun';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/2407-2@1.0/Ownglyph_ParkDaHyun.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
  }
  * {
    font-family: 'Ownglyph_ParkDaHyun', 'Malgun Gothic', sans-serif !important;
  }
`}} />

      </head>
      <body className="min-h-screen">
        <div className="max-w-md mx-auto min-h-screen relative">
          <div className="hidden lg:block absolute inset-0 border-x-4 border-blue-200 pointer-events-none"></div>
          <div className="relative z-10">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
