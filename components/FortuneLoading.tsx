'use client';

import { useEffect, useState } from 'react';

export default function FortuneLoading() {
  const [dots, setDots] = useState('');
  const [messageIndex, setMessageIndex] = useState(0);
  
  const messages = [
    '운세를 불러오는 중이에요',
    '별들에게 물어보는 중',
    '당신의 운을 계산하고 있어요',
    '좋은 소식을 준비하고 있어요'
  ];

  useEffect(() => {
    const dotsInterval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 500);

    const messageInterval = setInterval(() => {
      setMessageIndex(prev => (prev + 1) % messages.length);
    }, 2500);

    return () => {
      clearInterval(dotsInterval);
      clearInterval(messageInterval);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-16">
      {/* 돌아가는 수정구슬 - 블루톤 */}
      <div className="relative mb-8">
        <div className="w-24 h-24 border-4 border-sky-200 border-t-sky-500 rounded-full animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-5xl animate-pulse">🔮</span>
        </div>
      </div>
      
      {/* 메시지 - 블루 컬러 */}
      <div className="text-center">
        <p className="text-xl font-bold text-sky-600 mb-2">
          {messages[messageIndex]}{dots}
        </p>
        <div className="flex gap-2 justify-center mt-4">
          <span className="text-2xl animate-bounce">✨</span>
          <span className="text-2xl animate-bounce" style={{animationDelay: '0.1s'}}>💫</span>
          <span className="text-2xl animate-bounce" style={{animationDelay: '0.2s'}}>⭐</span>
        </div>
      </div>
    </div>
  );
}
