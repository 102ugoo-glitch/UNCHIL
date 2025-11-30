'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import { defaultWeights, type Weights } from '@/lib/data';

export default function Settings() {
  const [weights, setWeights] = useState<Weights>(defaultWeights);

  const handleChange = (key: keyof Weights, value: number) => {
    setWeights({ ...weights, [key]: value / 100 });
  };

  const total = Object.values(weights).reduce((a, b) => a + b, 0);

  return (
    <div className="min-h-screen bg-slate-900">
      <Header />
      
      <main className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-slate-800 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-white mb-6">운세 비중 설정</h2>
          
          <div className="space-y-6">
            {Object.entries(weights).map(([key, value]) => (
              <div key={key}>
                <div className="flex justify-between mb-2">
                  <label className="text-slate-300">
                    {key === 'ohasa' ? '오하아사' : key === 'star' ? '별자리' : key === 'saju' ? '사주' : '띠'}
                  </label>
                  <span className="text-purple-400 font-bold">{Math.round(value * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={value * 100}
                  onChange={(e) => handleChange(key as keyof Weights, Number(e.target.value))}
                  className="w-full"
                />
              </div>
            ))}
          </div>

          <div className="mt-8 p-4 bg-slate-700 rounded-lg">
            <p className="text-slate-300">
              합계: <span className={total === 1 ? 'text-green-400' : 'text-red-400'}>
                {Math.round(total * 100)}%
              </span>
            </p>
          </div>

          <button className="w-full mt-6 bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-lg">
            저장하기
          </button>
        </div>
      </main>
    </div>
  );
}
