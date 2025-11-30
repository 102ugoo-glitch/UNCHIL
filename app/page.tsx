'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [birthData, setBirthData] = useState({
    year: '',
    month: '',
    day: '',
    hour: '',
    minute: '',
    isLunar: false,
    hasTime: false
  });

  const isValid = birthData.year.length === 4 && 
                  birthData.month.length > 0 && 
                  birthData.day.length > 0;

  const handleSubmit = () => {
    // 로딩 페이지로 이동 후 대시보드로
    router.push('/loading');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="card-cute p-8 max-w-lg w-full">
        {/* 헤더 - 이모티콘 효과 제거 */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🔮</div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-600 bg-clip-text text-transparent mb-3">
            운칠
          </h1>
          <p className="text-gray-600 text-base font-medium leading-relaxed">
            운칠기삼 중, 칠할을 채워드려요
          </p>
          <p className="text-gray-500 text-sm mt-2 leading-relaxed">
            오하아사 + 네이버 사주 + 띠 + 운칠만의 운세까지<br />
            모두 합친 오늘의 총점을 알아봐요
          </p>
        </div>
        
        {/* 양력/음력 선택 */}
        <div className="mb-6">
          <div className="flex items-center justify-center gap-4 p-3 bg-sky-50/50 rounded-2xl">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="calendar"
                checked={!birthData.isLunar}
                onChange={() => setBirthData({...birthData, isLunar: false})}
                className="w-5 h-5 text-sky-500"
              />
              <span className="text-gray-700 font-medium">양력</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="calendar"
                checked={birthData.isLunar}
                onChange={() => setBirthData({...birthData, isLunar: true})}
                className="w-5 h-5 text-sky-500"
              />
              <span className="text-gray-700 font-medium">음력</span>
            </label>
          </div>
        </div>

        {/* 생년월일 입력 - 반응형 */}
        <div className="mb-6">
          <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
            <span className="text-xl">🎂</span>
            <span>생년월일</span>
          </label>
          <div className="flex flex-wrap items-center gap-2">
            <input
              type="text"
              placeholder="1990"
              maxLength={4}
              value={birthData.year}
              onChange={(e) => setBirthData({...birthData, year: e.target.value.replace(/[^0-9]/g, '')})}
              className="input-cute text-center font-bold text-base flex-1 min-w-[80px]"
            />
            <span className="text-gray-500 font-medium text-sm">년</span>
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
              className="input-cute text-center font-bold text-base flex-1 min-w-[60px]"
            />
            <span className="text-gray-500 font-medium text-sm">월</span>
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
              className="input-cute text-center font-bold text-base flex-1 min-w-[60px]"
            />
            <span className="text-gray-500 font-medium text-sm">일</span>
          </div>
        </div>

        {/* 태어난 시간 입력 - 선택사항 */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
              <span className="text-xl">⏰</span>
              <span>태어난 시간 (선택사항)</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={birthData.hasTime}
                onChange={(e) => setBirthData({...birthData, hasTime: e.target.checked})}
                className="w-4 h-4 text-sky-500 rounded"
              />
              <span className="text-xs text-gray-600">시간 알고 있음</span>
            </label>
          </div>
          
          {birthData.hasTime && (
            <div className="flex flex-wrap items-center gap-2">
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
                className="input-cute text-center font-bold text-base flex-1 min-w-[80px] bg-sky-50 border-sky-200 focus:border-sky-400"
              />
              <span className="text-gray-500 font-medium text-sm">시</span>
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
                className="input-cute text-center font-bold text-base flex-1 min-w-[80px] bg-sky-50 border-sky-200 focus:border-sky-400"
              />
              <span className="text-gray-500 font-medium text-sm">분</span>
            </div>
          )}
          
          <div className="mt-3 p-3 bg-sky-50 rounded-2xl border-2 border-sky-100">
            <p className="text-xs text-sky-700 font-medium">
              💡 {birthData.hasTime ? '정확한 사주 분석을 위해 태어난 시간을 입력해주세요' : '시간을 모르면 기본 운세로 확인해요'}
            </p>
          </div>
        </div>

        {/* 버튼 */}
        {isValid ? (
          <button 
            onClick={handleSubmit}
            className="btn-cute w-full text-base"
          >
            운칠 확인하기 ✨
          </button>
        ) : (
          <button 
            disabled
            className="w-full bg-gray-300 text-gray-500 font-bold py-3 px-6 rounded-full cursor-not-allowed text-base"
          >
            생년월일을 입력해주세요
          </button>
        )}

        {/* 푸터 */}
        <div className="text-center mt-6">
          <p className="text-xs text-gray-400">매일 당신의 운을 응원해요 💕</p>
        </div>
      </div>
    </div>
  );
}