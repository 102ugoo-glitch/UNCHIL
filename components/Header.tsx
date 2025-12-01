import Link from 'next/link'; 

export default function Header() {
  return (
    /* 투명하고 흐릿한(backdrop-blur) 젤리 느낌 헤더 - 블루톤 */
    <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-sky-200 shadow-lg shadow-blue-100/50">
      <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/dashboard" className="flex items-center gap-2">
           {/* 로고 이모지 - 블루 테마 */}
          <span className="text-2xl animate-sparkle" style={{ animationDelay: '0.1s' }}>💙</span>
          <h1 className="text-2xl font-extrabold bg-gradient-to-r from-sky-500 to-indigo-600 bg-clip-text text-transparent">운칠 UNCHIL</h1>
        </Link>
        <nav className="flex gap-4">
          {/* 텍스트 색상 블루로 변경 */}
          <Link href="/dashboard" className="text-gray-600 hover:text-sky-500 font-semibold transition-colors">
            대시보드
          </Link>
          <Link href="/settings" className="text-gray-600 hover:text-sky-500 font-semibold transition-colors">
            설정
          </Link>
        </nav>
      </div>
    </header>
  );
}
