'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import HistoryChart from '@/components/HistoryChart';
import { todayData, yesterdayData, mockHistoryData, generateHighlights, getBoosterMessage } from '@/lib/data';

export default function Dashboard() {
  const todayScore = todayData.total;
  const scoreDiff = todayScore - yesterdayData.total;
  const highlights = generateHighlights(todayData.scores);
  const booster = getBoosterMessage(todayScore);

  return (
    <div className="min-h-screen"> 
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        {/* 총점 카드: jelly-card 적용 */}
        <div className="jelly-card relative p-8">
          <div className="relative z-10">
            <p className="text-gray-500 text-sm mb-2 font-semibold">오늘의 운칠</p>
            {/* 점수 색상: 블루 그라데이션 */}
            <h1 className="text-6xl font-extrabold bg-gradient-to-r from-sky-500 to-indigo-600 bg-clip-text text-transparent">
              {todayScore}<span className="text-gray-600 ml-1">점</span>
            </h1>
            <p className="text-sm text-gray-500 mt-3">
              어제 {yesterdayData.total}점 → 오늘 {todayScore}점 
              <span className={scoreDiff > 0 ? 'text-emerald-500 font-bold' : 'text-rose-500 font-bold'}>
                {' '}({scoreDiff > 0 ? '↑' : '↓'}{Math.abs(scoreDiff)})
              </span>
            </p>
            {/* 4개 소스 점수: 블루톤 배경 */}
            <div className="grid grid-cols-2 gap-4 mt-6">
              {Object.entries(todayData.scores).map(([key, value]) => (
                <div key={key} className="bg-sky-100/60 border border-sky-200 p-4 rounded-xl hover:shadow-md transition-all"> 
                  <p className="text-sky-600 text-xs font-medium">
                    {key === 'ohasa' ? '오하아사' : key === 'star' ? '별자리' : key === 'saju' ? '사주' : '띠'}
                  </p>
                  <p className="text-2xl font-extrabold text-indigo-700">{value}점</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 하이라이트: jelly-card 적용 */}
        <div className="jelly-card rounded-xl p-6 space-y-3">
          <h3 className="text-lg font-bold text-gray-700 mb-4">오늘의 하이라이트 ✨</h3>
          {highlights.map((h, i) => (
            <p key={i} className="text-gray-600 border-l-4 border-sky-400 pl-3 transition-all hover:shadow-sm hover:border-blue-500">{h}</p>
          ))}
        </div>

        {/* 친구 부스터: 블루 그라데이션 */}
        <div className="bg-gradient-to-r from-sky-400/90 to-indigo-600/90 rounded-3xl p-6 shadow-xl shadow-blue-300/50 hover:shadow-2xl hover:shadow-blue-400/60 transition-all">
          <h3 className="text-xl font-extrabold text-white mb-2">친구 운세 부스터 💙</h3>
          <p className="text-blue-50 mb-4">{booster.boosterTip}</p>
          <button className="bg-white hover:bg-sky-50 text-sky-600 font-extrabold px-6 py-2 rounded-full shadow-md hover:shadow-lg transition-all hover:scale-105 active:scale-95">
            카톡으로 공유하기
          </button>
        </div>

        {/* 히스토리 차트 */}
        <HistoryChart history={mockHistoryData} />
      </main>
    </div>
  );
}
