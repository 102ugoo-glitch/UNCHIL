'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="bg-slate-800 border-b border-slate-700">
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/dashboard">
            <h1 className="text-2xl font-bold text-purple-400">운칠(UNCHIL)</h1>
          </Link>
          <nav className="flex gap-2">
            <Link
              href="/dashboard"
              className={`px-3 py-2 rounded-lg transition-colors ${
                pathname === '/dashboard'
                  ? 'bg-purple-600 text-white'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700'
              }`}
            >
              대시보드
            </Link>
            <Link
              href="/analysis"
              className={`px-3 py-2 rounded-lg transition-colors ${
                pathname === '/analysis'
                  ? 'bg-purple-600 text-white'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700'
              }`}
            >
              분석
            </Link>
            <Link
              href="/settings"
              className={`px-3 py-2 rounded-lg transition-colors ${
                pathname === '/settings'
                  ? 'bg-purple-600 text-white'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700'
              }`}
            >
              설정
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
