'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LoadingPage() {
  const router = useRouter();

  useEffect(() => {
    // 3초 후 대시보드로 이동
    const timer = setTimeout(() => {
      router.push('/dashboard');
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="text-center">
        {/* 돌아가는 수정구슬 */}
        <div className="relative mb-8">
          <div className="w-32 h-32 border-4 border-sky-200 border-t-sky-500 rounded-full animate-spin mx-auto" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-7xl animate-pulse">🔮</span>
          </div>
        </div>
        
        {/* 메시지 */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-sky-400 to-indigo-600 bg-clip-text text-transparent">
            운세를 불러오는 중이에요
          </h2>
          <p className="text-gray-600">
            오하아사, 사주, 별자리, 띠 운세를<br />
            모두 확인하고 있어요...
          </p>
          <div className="flex justify-center gap-2 mt-6">
            <span className="text-2xl animate-bounce">✨</span>
            <span className="text-2xl animate-bounce" style={{animationDelay: '0.1s'}}>💫</span>
            <span className="text-2xl animate-bounce" style={{animationDelay: '0.2s'}}>⭐</span>
          </div>
        </div>
      </div>
    </div>
  );
}
