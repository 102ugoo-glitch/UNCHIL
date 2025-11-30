'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// history prop을 받기 위한 타입 정의
interface HistoryData {
  date: string;
  total: number;
  scores: any;
}

interface HistoryChartProps {
  history: HistoryData[];
}

export default function HistoryChart({ history }: HistoryChartProps) {
  return (
    /* jelly-card 클래스 적용 */
    <div className="jelly-card p-6">
      <h2 className="text-xl font-bold text-gray-700 mb-4">7일 운세 히스토리</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={history}>
          {/* 그리드 색상 - 블루톤 */}
          <CartesianGrid strokeDasharray="3 3" stroke="#e0f2fe" /> 
          <XAxis 
            dataKey="date" 
            stroke="#6b7280" /* 짙은 회색 */
            style={{ fontSize: '12px' }}
          />
          <YAxis 
            stroke="#6b7280" /* 짙은 회색 */
            style={{ fontSize: '12px' }}
            domain={[0, 100]}
          />
          <Tooltip
            /* 툴팁 배경 블루톤 */
            contentStyle={{
              backgroundColor: '#ffffff',
              border: '1px solid #bae6fd',
              borderRadius: '12px',
              color: '#374151',
              boxShadow: '0 4px 6px rgba(56, 189, 248, 0.15)'
            }}
            formatter={(value: number) => [`${value}점`, 'Total Score']}
            labelFormatter={(label) => `날짜: ${label}`}
          />
          <Line
            type="monotone"
            dataKey="total"
            stroke="#38bdf8" /* 스카이 블루 */
            strokeWidth={4} /* 선 굵기 증가 */
            dot={{ fill: '#3b82f6', r: 5 }} /* 점 색상 블루 */
            activeDot={{ r: 8, strokeWidth: 3, stroke: '#bae6fd' }} /* 활성 점 효과 블루톤 */
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
