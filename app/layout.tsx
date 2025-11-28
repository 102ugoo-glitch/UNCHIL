import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "운칠(UNCHIL) - 당신의 운세 앱",
  description: "4가지 소스로 확인하는 나만의 운세",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="bg-slate-900 min-h-screen">
        {children}
      </body>
    </html>
  );
}
