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
        {/* 모바일 뷰포트 설정 */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </head>
      <body className="min-h-screen">
        {/* 모바일 크기로 제한하는 컨테이너 */}
        <div className="max-w-md mx-auto min-h-screen relative">
          {/* 모바일 뷰 테두리 효과 (선택사항) */}
          <div className="hidden lg:block absolute inset-0 border-x-4 border-blue-200 pointer-events-none"></div>
          
          {/* 실제 콘텐츠 */}
          <div className="relative z-10">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
