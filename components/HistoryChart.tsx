'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// History prop을 받기 위한 타입 정의 (이전 오류 해결의 핵심)
// 이 타입이 page.tsx에서 전달되는 mockHistoryData의 실제 구조와 일치해야 합니다.
export interface HistoryData {
  date: string;
  total: number; // ✨ 이전에 'missing' 오류가 났던 핵심 속성
  // scores: any; // 💡 사용하지 않는 경우 제거하여 타입 불필요성 최소화
}

interface HistoryChartProps {
  history: HistoryData[];
}

export default function HistoryChart({ history }: HistoryChartProps) {
  // 💡 데이터가 비어있을 경우 처리 (UX 개선)
  if (!history || history.length === 0) {
    return (
      <div className="jelly-card p-6 flex justify-center items-center h-[300px]">
        <p className="text-gray-500 font-semibold">데이터가 존재하지 않습니다.</p>
      </div>
    );
  }

  return (
    /* jelly-card 클래스 적용 */
    <div className="jelly-card p-6">
      <h2 className="text-xl font-bold text-gray-700 mb-4">🔮 7일 운세 히스토리</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={history} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}> {/* 마진 조정 */}
          {/* 그리드 색상 - 블루톤 */}
          <CartesianGrid strokeDasharray="3 3" stroke="#e0f2fe" vertical={false} /> {/* 세로선 제거 */}
          <XAxis 
            dataKey="date" 
            stroke="#9ca3af" /* 중간 회색 */
            tickLine={false} /* 축 눈금선 제거 */
            style={{ fontSize: '12px' }}
          />
          <YAxis 
            stroke="#9ca3af" /* 중간 회색 */
            tickLine={false}
            axisLine={false} /* 축 선 자체 제거 */
            style={{ fontSize: '12px' }}
            domain={[0, 100]}
          />
          <Tooltip
            /* 툴팁 배경 블루톤 */
            contentStyle={{
              backgroundColor: '#ffffff',
              border: '1px solid #bae6fd',
              borderRadius: '8px', // 모서리 둥글기 줄임
              color: '#374151',
              boxShadow: '0 6px 10px rgba(56, 189, 248, 0.15)' // 그림자 강화
            }}
            formatter={(value: number) => [`${value}점`, 'Total Score']}
            labelFormatter={(label) => `날짜: ${label}`}
          />
          <Line
            type="monotone"
            dataKey="total"
            stroke="#3b82f6" /* 더 진한 블루로 변경 */
            strokeWidth={3} /* 선 굵기 조정 */
            dot={{ fill: '#3b82f6', r: 4, stroke: '#ffffff', strokeWidth: 2 }} /* 점 디자인 개선 */
            activeDot={{ r: 7, strokeWidth: 3, stroke: '#93c5fd' }} /* 활성 점 효과 개선 */
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}