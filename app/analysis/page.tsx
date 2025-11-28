'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface DailyRecord {
  date: string;
  fortuneScore: number;
  realityScore: number;
  memo: string;
  sources: {
    ohasa: number;
    star: number;
    saju: number;
    ddi: number;
  };
}

interface SourceAccuracy {
  name: string;
  fullName: string;
  accuracy: number;
  icon: string;
}

const defaultAccuracyData: SourceAccuracy[] = [
  { name: '오하아사', fullName: 'ohasa', accuracy: 82, icon: '☀️' },
  { name: '별자리', fullName: 'star', accuracy: 65, icon: '⭐' },
  { name: '사주', fullName: 'saju', accuracy: 88, icon: '🎴' },
  { name: '띠', fullName: 'ddi', accuracy: 71, icon: '🐉' },
];

export default function Analysis() {
  const [matchRate, setMatchRate] = useState({
    highFortuneAvg: 0,
    lowFortuneAvg: 0,
    overallMatch: 0,
    dataCount: 0,
  });
  const [accuracyData, setAccuracyData] = useState<SourceAccuracy[]>(defaultAccuracyData);
  const [bestSource, setBestSource] = useState<SourceAccuracy>(defaultAccuracyData[2]);

  useEffect(() => {
    const savedRecords = localStorage.getItem('unchil_records');
    
    if (savedRecords) {
      const records: DailyRecord[] = JSON.parse(savedRecords);
      const last30Days = records.slice(-30);
      
      if (last30Days.length > 0) {
        const highFortuneDays = last30Days.filter(r => r.fortuneScore >= 70);
        const lowFortuneDays = last30Days.filter(r => r.fortuneScore <= 50);
        
        const highAvg = highFortuneDays.length > 0
          ? highFortuneDays.reduce((sum, r) => sum + r.realityScore, 0) / highFortuneDays.length
          : 0;
        
        const lowAvg = lowFortuneDays.length > 0
          ? lowFortuneDays.reduce((sum, r) => sum + r.realityScore, 0) / lowFortuneDays.length
          : 0;

        const overallMatch = last30Days.reduce((sum, r) => {
          const fortuneNormalized = r.fortuneScore / 20;
          const diff = Math.abs(fortuneNormalized - r.realityScore);
          return sum + (1 - diff / 5) * 100;
        }, 0) / last30Days.length;

        setMatchRate({
          highFortuneAvg: Math.round(highAvg * 10) / 10,
          lowFortuneAvg: Math.round(lowAvg * 10) / 10,
          overallMatch: Math.round(overallMatch),
          dataCount: last30Days.length,
        });

        const sourceKeys: Array<keyof DailyRecord['sources']> = ['ohasa', 'star', 'saju', 'ddi'];
        const sourceNames = ['오하아사', '별자리', '사주', '띠'];
        const sourceIcons = ['☀️', '⭐', '🎴', '🐉'];

        const calculatedAccuracy = sourceKeys.map((key, index) => {
          const correlation = last30Days.reduce((sum, r) => {
            const sourceNormalized = r.sources[key] / 20;
            const diff = Math.abs(sourceNormalized - r.realityScore);
            return sum + (1 - diff / 5) * 100;
          }, 0) / last30Days.length;

          return {
            name: sourceNames[index],
            fullName: key,
            accuracy: Math.round(correlation),
            icon: sourceIcons[index],
          };
        });

        setAccuracyData(calculatedAccuracy);
        
        const best = calculatedAccuracy.reduce((prev, current) => 
          current.accuracy > prev.accuracy ? current : prev
        );
        setBestSource(best);
      }
    }
  }, []);

  const maxAccuracy = Math.max(...accuracyData.map(d => d.accuracy));

  return (
    <div className="min-h-screen bg-slate-900">
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        <h1 className="text-3xl font-bold text-white">운세 분석</h1>

        {/* 운세-현실 일치도 */}
        <div className="bg-slate-800 rounded-xl p-6 shadow-2xl shadow-purple-900/50">
          <h2 className="text-xl font-bold text-white mb-4">운세-현실 일치도</h2>
          <p className="text-slate-400 text-sm mb-4">
            {matchRate.dataCount > 0 
              ? `최근 ${matchRate.dataCount}일간 데이터 분석`
              : '30일간 데이터 분석 (더미 데이터)'}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-700 rounded-lg p-4">
              <p className="text-slate-400 text-sm mb-1">운세 70점 이상인 날</p>
              <p className="text-2xl font-bold text-green-400">
                {matchRate.dataCount > 0 ? `${matchRate.highFortuneAvg}⭐` : '4.2⭐'}
              </p>
              <p className="text-slate-500 text-xs">평균 별점</p>
            </div>
            
            <div className="bg-slate-700 rounded-lg p-4">
              <p className="text-slate-400 text-sm mb-1">운세 50점 이하인 날</p>
              <p className="text-2xl font-bold text-orange-400">
                {matchRate.dataCount > 0 ? `${matchRate.lowFortuneAvg}⭐` : '2.1⭐'}
              </p>
              <p className="text-slate-500 text-xs">평균 별점</p>
            </div>
            
            <div className="bg-slate-700 rounded-lg p-4">
              <p className="text-slate-400 text-sm mb-1">전체 일치도</p>
              <p className="text-2xl font-bold text-purple-400">
                {matchRate.dataCount > 0 ? `${matchRate.overallMatch}%` : '76%'}
              </p>
              <p className="text-slate-500 text-xs">운세와 현실의 상관관계</p>
            </div>
          </div>
        </div>

        {/* 소스별 정확도 */}
        <div className="bg-slate-800 rounded-xl p-6 shadow-2xl shadow-purple-900/50">
          <h2 className="text-xl font-bold text-white mb-4">소스별 정확도</h2>
          <p className="text-slate-400 text-sm mb-6">점수가 높을 때 실제 별점도 높았는지 상관관계 분석</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {accuracyData.map((source) => (
              <div 
                key={source.name}
                className={`rounded-lg p-4 ${
                  source.accuracy === maxAccuracy 
                    ? 'bg-purple-600 ring-2 ring-purple-400' 
                    : 'bg-slate-700'
                }`}
              >
                <div className="text-2xl mb-2">{source.icon}</div>
                <p className="text-white font-medium">{source.name}</p>
                <p className={`text-2xl font-bold ${
                  source.accuracy === maxAccuracy ? 'text-white' : 'text-purple-400'
                }`}>
                  {source.accuracy}%
                </p>
                {source.accuracy === maxAccuracy && (
                  <span className="text-xs text-purple-200">최고 정확도</span>
                )}
              </div>
            ))}
          </div>

          {/* 차트 */}
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={accuracyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" domain={[0, 100]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: '1px solid #475569',
                    borderRadius: '8px',
                    color: '#fff',
                  }}
                  formatter={(value: number) => [`${value}%`, '정확도']}
                />
                <Bar dataKey="accuracy" radius={[4, 4, 0, 0]}>
                  {accuracyData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`}
                      fill={entry.accuracy === maxAccuracy ? '#a855f7' : '#6366f1'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 결론 메시지 */}
        <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-xl p-6 shadow-2xl shadow-purple-900/50">
          <div className="flex items-center gap-4">
            <div className="text-5xl">{bestSource.icon}</div>
            <div>
              <h2 className="text-xl font-bold text-white mb-1">분석 결과</h2>
              <p className="text-purple-100 text-lg">
                당신에게는 <span className="font-bold text-white">{bestSource.name}</span>가 가장 잘 맞아요!
              </p>
              <p className="text-purple-200 text-sm mt-1">
                정확도 {bestSource.accuracy}%로 가장 높은 일치율을 보였습니다
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
