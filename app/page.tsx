'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [birthDate, setBirthDate] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (birthDate) {
      router.push('/dashboard');
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <div className="max-w-md w-full">
        <div className="bg-slate-800 rounded-xl p-8 shadow-2xl shadow-purple-900/50">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-purple-400 mb-2">운칠(UNCHIL)</h1>
            <p className="text-slate-300">당신의 운세를 확인하세요</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="birthDate" className="block text-sm font-medium text-slate-300 mb-2">
                생년월일
              </label>
              <input
                type="date"
                id="birthDate"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-colors shadow-lg shadow-purple-900/50"
            >
              운칠 시작하기
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-slate-400">
            <p>오늘의 운세를 4가지 소스로 확인해보세요</p>
            <div className="flex justify-center gap-3 mt-2">
              <span className="text-purple-400">오하아사</span>
              <span className="text-purple-400">별자리</span>
              <span className="text-purple-400">사주</span>
              <span className="text-purple-400">띠</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
