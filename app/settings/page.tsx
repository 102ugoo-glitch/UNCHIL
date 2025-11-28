'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import { defaultWeights } from '@/lib/data';

export default function Settings() {
  const [weights, setWeights] = useState(defaultWeights);

  const handleWeightChange = (source: keyof typeof weights, value: number) => {
    // 새로운 값이 범위 내에 있는지 확인
    const clampedValue = Math.max(0, Math.min(100, value));
    
    // 다른 소스들의 키 목록
    const otherSources = Object.keys(weights).filter(key => key !== source) as Array<keyof typeof weights>;
    
    // 남은 비중 (100 - 현재 슬라이더 값)
    const remaining = 100 - clampedValue;
    
    // 다른 소스들의 현재 합계
    const otherTotal = otherSources.reduce((sum, key) => sum + weights[key], 0);
    
    const newWeights = { ...weights, [source]: clampedValue };
    
    if (remaining === 0) {
      // 현재 슬라이더가 100이면 나머지는 모두 0
      otherSources.forEach(key => {
        newWeights[key] = 0;
      });
    } else if (otherTotal === 0) {
      // 다른 소스들이 모두 0이면 균등 분배
      const equalShare = Math.floor(remaining / otherSources.length);
      const remainder = remaining - (equalShare * otherSources.length);
      
      otherSources.forEach((key, index) => {
        newWeights[key] = equalShare + (index === 0 ? remainder : 0);
      });
    } else {
      // 다른 소스들의 비율을 유지하면서 재분배 (Largest Remainder Method)
      // 먼저 모든 다른 소스를 0으로 초기화
      otherSources.forEach(key => {
        newWeights[key] = 0;
      });
      
      // 1. 먼저 floor를 사용해 정수 부분을 할당
      const allocations = otherSources.map(key => {
        const proportion = weights[key] / otherTotal;
        const exactValue = remaining * proportion;
        const floorValue = Math.floor(exactValue);
        const fractional = exactValue - floorValue;
        return { key, floorValue, fractional };
      });
      
      // 2. 할당된 정수 부분의 합계 계산
      const allocatedTotal = allocations.reduce((sum, a) => sum + a.floorValue, 0);
      const leftover = remaining - allocatedTotal;
      
      // 3. 남은 부분을 fractional 부분이 큰 순서대로 배분
      allocations.sort((a, b) => b.fractional - a.fractional);
      
      allocations.forEach((allocation, index) => {
        const bonus = index < leftover ? 1 : 0;
        newWeights[allocation.key] = Math.max(0, allocation.floorValue + bonus);
      });
    }
    
    setWeights(newWeights);
  };

  const total = Object.values(weights).reduce((sum, w) => sum + w, 0);

  const sources = [
    { key: 'ohasa' as const, name: '오하아사', icon: '☀️' },
    { key: 'star' as const, name: '별자리', icon: '⭐' },
    { key: 'saju' as const, name: '사주', icon: '🎴' },
    { key: 'ddi' as const, name: '띠', icon: '🐉' },
  ];

  return (
    <div className="min-h-screen bg-slate-900">
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-slate-800 rounded-xl p-8 shadow-2xl shadow-purple-900/50">
          <h1 className="text-3xl font-bold text-white mb-2">설정</h1>
          <p className="text-slate-300 mb-8">각 운세 소스의 비중을 조정하세요 (합계: {total}%)</p>

          <div className="space-y-6">
            {sources.map((source) => (
              <div key={source.key} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{source.icon}</span>
                    <label htmlFor={source.key} className="text-lg font-medium text-white">
                      {source.name}
                    </label>
                  </div>
                  <span className="text-2xl font-bold text-purple-400">{weights[source.key]}%</span>
                </div>
                <input
                  type="range"
                  id={source.key}
                  min="0"
                  max="100"
                  value={weights[source.key]}
                  onChange={(e) => handleWeightChange(source.key, parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                  style={{
                    background: `linear-gradient(to right, rgb(168 85 247) 0%, rgb(168 85 247) ${weights[source.key]}%, rgb(51 65 85) ${weights[source.key]}%, rgb(51 65 85) 100%)`
                  }}
                />
              </div>
            ))}
          </div>

          <div className="mt-8 p-4 bg-slate-700 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-lg font-medium text-white">총합</span>
              <span className="text-2xl font-bold text-green-400">
                {total}%
              </span>
            </div>
          </div>

          <button
            className="w-full mt-6 py-3 px-6 rounded-lg font-bold transition-colors bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-900/50"
          >
            저장하기
          </button>
        </div>
      </main>
    </div>
  );
}
