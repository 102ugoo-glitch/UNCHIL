'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <div className="bg-slate-800 p-8 rounded-xl shadow-2xl max-w-md w-full">
        <h1 className="text-3xl font-bold text-purple-400 mb-2">운칠 UNCHIL</h1>
        <p className="text-slate-400 mb-6">운칠기삼, 칠할을 채워드려요</p>
        
        <div className="space-y-4 mb-6">
          <input
            type="date"
            className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg"
            placeholder="생년월일"
          />
          <input
            type="time"
            className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg"
            placeholder="태어난 시간 (선택)"
          />
        </div>

        <Link href="/dashboard">
          <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-lg transition">
            운칠 시작하기
          </button>
        </Link>
      </div>
    </div>
  );
}
