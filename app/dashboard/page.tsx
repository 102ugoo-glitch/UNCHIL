'use client';

import { useState } from 'react';
import Header from '@/components/Header'; 
import HistoryChart from '@/components/HistoryChart';
import { todayData, yesterdayData, mockHistoryData, generateHighlights, getBoosterMessage } from '@/lib/data';
import { generateInsights, analyzeWeeklyPattern } from '@/lib/gemini';

export default function Dashboard() {
  const [aiInsights, setAiInsights] = useState<string[]>([]);
  const [insightsLoading, setInsightsLoading] = useState(false);
  const [weeklyAnalysis, setWeeklyAnalysis] = useState('');
  const [analysisLoading, setAnalysisLoading] = useState(false);

  const todayScore = todayData.total;
  const scoreDiff = todayScore - yesterdayData.total;
  const highlights = generateHighlights(todayData.scores);
  const booster = getBoosterMessage(todayScore);

  const handleGenerateInsights = async () => {
    setInsightsLoading(true);
    const insights = await generateInsights(mockHistoryData, todayData.scores);
    setAiInsights(insights);
    setInsightsLoading(false);
  };

  const handleAnalyzeWeekly = async () => {
    setAnalysisLoading(true);
    const analysis = await analyzeWeeklyPattern(mockHistoryData);
    setWeeklyAnalysis(analysis);
    setAnalysisLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-900">
      <Header />

      <main className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        {/* 총점 카드 */}
        <div className="relative p-8 rounded-xl bg-slate-800 shadow-2xl shadow-purple-900/50">
          <div className="absolute inset-0 rounded-xl bg-gradient-radial from-purple-900/20 to-transparent opacity-30"></div>

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

        {/* 하이라이트 with AI */}
        <div className="bg-slate-800 rounded-xl p-6 space-y-3">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-white">오늘의 하이라이트</h3>
            <button
              onClick={handleGenerateInsights}
              disabled={insightsLoading}
              className="bg-purple-600 hover:bg-purple-700 disabled:bg-slate-600 text-white px-4 py-2 rounded-lg text-sm transition"
            >
              {insightsLoading ? '분석 중...' : '🤖 AI 인사이트'}
            </button>
          </div>
          {(aiInsights.length > 0 ? aiInsights : highlights).map((h, i) => (
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

        {/* 주간 운세 분석 */}
        <div className="bg-slate-800 rounded-xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-white">AI가 분석한 나의 운세 패턴</h3>
            <button
              onClick={handleAnalyzeWeekly}
              disabled={analysisLoading}
              className="bg-purple-600 hover:bg-purple-700 disabled:bg-slate-600 text-white px-4 py-2 rounded-lg text-sm transition"
            >
              {analysisLoading ? '분석 중...' : '🔮 분석하기'}
            </button>
          </div>
          {weeklyAnalysis ? (
            <div className="bg-purple-900/20 rounded-lg p-4">
              <p className="text-slate-300 whitespace-pre-line">{weeklyAnalysis}</p>
            </div>
          ) : (
            <p className="text-slate-400 text-center py-8">
              버튼을 눌러 AI가 7일간의 운세 패턴을 분석해드립니다
            </p>
          )}
        </div>

        {/* 히스토리 차트 */}
        <HistoryChart history={mockHistoryData} />
      </main>
    </div>
  );
}
