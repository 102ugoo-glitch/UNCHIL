'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [birthData, setBirthData] = useState({
    year: '',
    month: '',
    day: '',
    hour: '',
    minute: ''
  });

  const isValid = birthData.year.length === 4 && 
                  birthData.month.length > 0 && 
                  birthData.day.length > 0;

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="card-cute p-8 max-w-md w-full">
        {/* 귀여운 헤더 */}
        <div className="text-center mb-8">
          <div className="text-7xl mb-4 animate-float">🔮</div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-600 bg-clip-text text-transparent mb-3">
            운칠
          </h1>
          <p className="text-gray-600 text-lg font-medium">운칠기삼, 칠할을 채워드려요</p>
          <div className="flex justify-center gap-3 mt-4">
            <span className="text-3xl animate-sparkle">✨</span>
            <span className="text-3xl animate-sparkle" style={{animationDelay: '0.3s'}}>💫</span>
            <span className="text-3xl animate-sparkle" style={{animationDelay: '0.6s'}}>⭐</span>
          </div>
        </div>
        
        {/* 생년월일 입력 */}
        <div className="mb-6">
          <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
            <span className="text-2xl">🎂</span>
            <span>생년월일</span>
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="1990"
              maxLength={4}
              value={birthData.year}
              onChange={(e) => setBirthData({...birthData, year: e.target.value.replace(/[^0-9]/g, '')})}
              className="input-cute w-24 text-center font-bold text-lg"
            />
            <span className="text-gray-500 font-medium">년</span>
            <input
              type="text"
              placeholder="05"
              maxLength={2}
              value={birthData.month}
              onChange={(e) => {
                const val = e.target.value.replace(/[^0-9]/g, '');
                if (val === '' || (parseInt(val) >= 1 && parseInt(val) <= 12)) {
                  setBirthData({...birthData, month: val});
                }
              }}
              className="input-cute w-20 text-center font-bold text-lg"
            />
            <span className="text-gray-500 font-medium">월</span>
            <input
              type="text"
              placeholder="15"
              maxLength={2}
              value={birthData.day}
              onChange={(e) => {
                const val = e.target.value.replace(/[^0-9]/g, '');
                if (val === '' || (parseInt(val) >= 1 && parseInt(val) <= 31)) {
                  setBirthData({...birthData, day: val});
                }
              }}
              className="input-cute w-20 text-center font-bold text-lg"
            />
            <span className="text-gray-500 font-medium">일</span>
          </div>
        </div>

        {/* 태어난 시간 입력 */}
        <div className="mb-8">
          <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
            <span className="text-2xl">⏰</span>
            <span>태어난 시간</span>
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="14"
              maxLength={2}
              value={birthData.hour}
              onChange={(e) => {
                const val = e.target.value.replace(/[^0-9]/g, '');
                if (val === '' || (parseInt(val) >= 0 && parseInt(val) <= 23)) {
                  setBirthData({...birthData, hour: val});
                }
              }}
              className="input-cute flex-1 text-center font-bold text-lg bg-sky-50 border-sky-200 focus:border-sky-400"
            />
            <span className="text-gray-500 font-medium">시</span>
            <input
              type="text"
              placeholder="30"
              maxLength={2}
              value={birthData.minute}
              onChange={(e) => {
                const val = e.target.value.replace(/[^0-9]/g, '');
                if (val === '' || (parseInt(val) >= 0 && parseInt(val) <= 59)) {
                  setBirthData({...birthData, minute: val});
                }
              }}
              className="input-cute flex-1 text-center font-bold text-lg bg-sky-50 border-sky-200 focus:border-sky-400"
            />
            <span className="text-gray-500 font-medium">분</span>
          </div>
          <div className="mt-3 p-3 bg-sky-50 rounded-2xl border-2 border-sky-100">
            <p className="text-xs text-sky-700 font-medium">💡 정확한 사주 분석을 위해 태어난 시간을 입력해주세요</p>
          </div>
        </div>

        {/* 귀여운 버튼 */}
        {isValid ? (
          <Link href="/dashboard">
            <button className="btn-cute w-full text-lg">
              운칠 시작하기 ✨
            </button>
          </Link>
        ) : (
          <button 
            disabled
            className="w-full bg-gray-300 text-gray-500 font-bold py-3 px-6 rounded-full cursor-not-allowed"
          >
            생년월일을 입력해주세요
          </button>
        )}

        {/* 귀여운 푸터 */}
        <div className="text-center mt-6">
          <p className="text-xs text-gray-400">매일 당신의 운을 응원해요 💕</p>
        </div>
      </div>
    </div>
  );
}
