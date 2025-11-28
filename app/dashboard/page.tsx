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
    <div className="min-h-screen bg-slate-900">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        {/* 총점 카드 */}
        <div className="relative p-8 rounded-xl bg-slate-800 shadow-2xl shadow-purple-900/50">
          <div className="relative z-10">
            <p className="text-slate-400 text-sm mb-2">오늘의 운칠</p>
            <h1 className="text-5xl font-extrabold text-white">
              {todayScore}<span className="text-purple-400">점</span>
            </h1>
            <p className="text-sm text-slate-400 mt-2">
              어제 {yesterdayData.total}점 → 오늘 {todayScore}점 
              <span className={scoreDiff > 0 ? 'text-green-400' : 'text-red-400'}>
                {' '}({scoreDiff > 0 ? '↑' : '↓'}{Math.abs(scoreDiff)})
              </span>
            </p>

            {/* 4개 소스 점수 */}
            <div className="grid grid-cols-2 gap-4 mt-6">
              {Object.entries(todayData.scores).map(([key, value]) => (
                <div key={key} className="bg-slate-700/50 p-4 rounded-lg">
                  <p className="text-slate-400 text-xs">
                    {key === 'ohasa' ? '오하아사' : key === 'star' ? '별자리' : key === 'saju' ? '사주' : '띠'}
                  </p>
                  <p className="text-2xl font-bold text-white">{value}점</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 하이라이트 */}
        <div className="bg-slate-800 rounded-xl p-6 space-y-3">
          <h3 className="text-lg font-bold text-white mb-4">오늘의 하이라이트</h3>
          {highlights.map((h, i) => (
            <p key={i} className="text-slate-300">{h}</p>
          ))}
        </div>

        {/* 친구 부스터 */}
        <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-xl p-6">
          <h3 className="text-lg font-bold text-white mb-2">친구 운세 부스터</h3>
          <p className="text-slate-300 mb-4">{booster.boosterTip}</p>
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg">
            카톡으로 공유하기
          </button>
        </div>

        {/* 히스토리 차트 */}
        <HistoryChart history={mockHistoryData} />
      </main>
    </div>
  );
}
