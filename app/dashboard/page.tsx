'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import HistoryChart from '@/components/HistoryChart';
import { todayData, yesterdayData, mockHistoryData, generateHighlights, getBoosterMessage, mockUserSaju } from '@/lib/data';

export default function Dashboard() {
  // 비중 설정 (기본값)
  const [weights, setWeights] = useState({
    ohasa: 40,
    star: 30,
    saju: 20,
    ddi: 10
  });

  // 각 점수
  const scores = todayData.scores;
  
  // 가중 평균 점수 계산
  const calculateWeightedAvg = (s: typeof scores, w: typeof weights) => {
    return Number((
      (s.ohasa * w.ohasa + s.star * w.star + s.saju * w.saju + s.ddi * w.ddi) / 100
    ).toFixed(1));
  };
  
  const avgScore = calculateWeightedAvg(scores, weights);
  const yesterdayAvg = calculateWeightedAvg(yesterdayData.scores, weights);
  const scoreDiff = Number((avgScore - yesterdayAvg).toFixed(1));
  
  const highlights = generateHighlights(scores);
  const booster = getBoosterMessage(avgScore, mockUserSaju);
  
  // 사용자 정보 (예시)
  const userInfo = {
    birth: '1990년 5월 15일',
    birthTime: '14시 30분',
    ddi: '말띠',
    ilju: mockUserSaju.ilgan
  };
  
  // 각 운세별 등수
  const scoresArray = [
    { name: '오하아사', value: scores.ohasa, key: 'ohasa' },
    { name: '별자리', value: scores.star, key: 'star' },
    { name: '사주', value: scores.saju, key: 'saju' },
    { name: '띠', value: scores.ddi, key: 'ddi' }
  ].sort((a, b) => b.value - a.value);
  
  const getRank = (key: string) => {
    return scoresArray.findIndex(s => s.key === key) + 1;
  };
  
  // 운세별 상세 설명 (3줄 이상)
  const getDetailedDescription = (key: string, value: number) => {
    const descriptions: Record<string, any> = {
      ohasa: {
        high: '오늘 아침의 기운이 아주 좋아요! 중요한 미팅이나 약속은 오전에 잡으면 성공 확률이 높습니다. 첫인상으로 좋은 평가를 받을 수 있는 날이에요.',
        mid: '오늘 아침 컨디션은 평범해요. 무난하게 하루를 시작할 수 있지만, 중요한 결정은 조금 더 신중하게 생각해보세요. 가벼운 운동으로 기운을 북돋워보는 것도 좋아요.',
        low: '오늘 아침 기운이 다소 약해요. 무리하지 말고 천천히 시작하세요. 중요한 일은 오후로 미루고, 아침에는 가볍게 몸을 풀면서 컨디션을 올리는 게 좋겠어요.'
      },
      star: {
        high: '별자리 운세가 최고예요! 오늘 하루 운명적인 만남이나 좋은 기회가 찾아올 수 있어요. 평소 미뤄뒀던 고백이나 제안을 해보기 좋은 날입니다. 자신감을 가지고 도전해보세요!',
        mid: '별자리 운세는 안정적이에요. 큰 변화는 없지만 평온한 하루를 보낼 수 있습니다. 주변 사람들과의 관계에 신경 쓰면 더 좋은 하루가 될 거예요.',
        low: '별자리 운세가 조금 낮네요. 오늘은 새로운 도전보다는 현상 유지에 집중하는 게 좋아요. 갈등 상황은 피하고, 혼자만의 시간을 가지며 재충전하는 것을 추천해요.'
      },
      saju: {
        high: '사주 운세가 매우 강해요! 재물운과 귀인운이 함께하는 날입니다. 투자나 계약을 고려하고 있었다면 오늘이 좋은 타이밍일 수 있어요. 직감을 믿고 결정해도 좋습니다.',
        mid: '사주 운세는 무난해요. 급한 결정은 피하고, 차근차근 계획을 세우면서 진행하는 게 좋겠어요. 가족이나 가까운 사람들과 시간을 보내면 안정감을 느낄 수 있어요.',
        low: '사주 운세가 약해요. 오늘은 중요한 계약이나 큰 지출은 피하는 게 좋습니다. 보수적으로 행동하고, 이미 진행 중인 일에 집중하세요. 내일은 더 나아질 거예요!'
      },
      ddi: {
        high: '띠 운세가 활발해요! 사람들과의 만남에서 좋은 에너지를 받을 수 있는 날입니다. 네트워킹이나 모임에 참석하면 뜻밖의 기회를 잡을 수도 있어요. 적극적으로 행동해보세요!',
        mid: '띠 운세는 평범해요. 일상적인 루틴을 유지하면서 안정적으로 보내기 좋은 날이에요. 특별한 일은 없겠지만, 소소한 행복을 느낄 수 있을 거예요.',
        low: '띠 운세가 조용해요. 오늘은 혼자 있는 시간이 더 편할 수 있어요. 사람들과의 약속은 최소화하고, 독서나 취미 활동으로 나만의 시간을 보내는 게 좋겠어요.'
      }
    };
    
    if (value >= 70) return descriptions[key].high;
    if (value >= 40) return descriptions[key].mid;
    return descriptions[key].low;
  };
  
  // 주의 포인트 요약
  const getCautionPoints = () => {
    const lowScores = scoresArray.filter(s => s.value < 50);
    if (lowScores.length === 0) {
      return '오늘은 특별히 주의할 점이 없어요! 자신감 있게 하루를 보내세요! 🌟';
    }
    
    const points = lowScores.map(s => {
      const tips: Record<string, string> = {
        ohasa: '아침 컨디션 관리에 신경 쓰세요',
        star: '새로운 만남이나 도전은 신중하게',
        saju: '큰 결정이나 지출은 내일로 미루세요',
        ddi: '대인관계에서 조심스럽게 행동하세요'
      };
      return tips[s.key];
    });
    
    return points.join(', ') + '.';
  };

  return (
    <div className="min-h-screen"> 
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        {/* 사용자 정보 카드 */}
        <div className="card-highlight p-6">
          <h3 className="text-sm font-bold text-gray-600 mb-3">나의 정보</h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-xs text-gray-500 mb-1">생년월일</p>
              <p className="font-bold text-gray-800">{userInfo.birth}</p>
              <p className="text-xs text-gray-600">{userInfo.birthTime}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">띠</p>
              <p className="font-bold text-gray-800 text-lg">{userInfo.ddi}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">일주</p>
              <p className="font-bold text-gray-800">{userInfo.ilju}</p>
            </div>
          </div>
        </div>

        {/* 총점 카드 */}
        <div className="jelly-card relative p-8">
          <div className="relative z-10">
            <p className="text-gray-500 text-sm mb-2 font-semibold">오늘의 운칠</p>
            <h1 className="text-6xl font-extrabold bg-gradient-to-r from-sky-500 to-indigo-600 bg-clip-text text-transparent">
              {avgScore}<span className="text-gray-600 ml-1">점</span>
            </h1>
            <p className="text-sm text-gray-500 mt-3">
              어제 {yesterdayAvg}점 → 오늘 {avgScore}점 
              <span className={scoreDiff > 0 ? 'text-emerald-500 font-bold' : scoreDiff < 0 ? 'text-rose-500 font-bold' : 'text-gray-500 font-bold'}>
                {scoreDiff !== 0 ? ` (${scoreDiff > 0 ? '↑' : '↓'}${Math.abs(scoreDiff)})` : ' (변동 없음)'}
              </span>
            </p>
            
            {/* 4개 소스 점수 - 상세 설명 포함 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              {['ohasa', 'star', 'saju', 'ddi'].map((key) => {
                const names: Record<string, string> = {
                  ohasa: '오하아사',
                  star: '별자리',
                  saju: '사주',
                  ddi: '띠'
                };
                const value = scores[key as keyof typeof scores];
                
                return (
                  <div key={key} className="bg-sky-100/60 border border-sky-200 p-4 rounded-xl hover:shadow-md transition-all">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sky-600 text-sm font-bold">{names[key]}</p>
                      <span className="text-xs bg-sky-200 text-sky-800 px-2 py-1 rounded-full font-bold">
                        {getRank(key)}위
                      </span>
                    </div>
                    <p className="text-3xl font-extrabold text-indigo-700 mb-2">
                      {value.toFixed(1)}점
                    </p>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      {getDetailedDescription(key, value)}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* 오늘의 하이라이트 - 총점 포함 */}
        <div className="jelly-card rounded-xl p-6 space-y-3">
          <h3 className="text-lg font-bold text-gray-700 mb-4">오늘의 하이라이트 ✨</h3>
          <div className="p-4 bg-gradient-to-r from-sky-50 to-blue-50 rounded-xl border-2 border-sky-200 mb-4">
            <p className="text-sm font-bold text-sky-700">
              📊 오늘의 총점: {avgScore}점
            </p>
            <p className="text-xs text-gray-600 mt-1">
              {avgScore >= 70 ? '매우 좋은 하루예요!' : avgScore >= 50 ? '괜찮은 하루예요!' : '조심스럽게 보내세요!'}
            </p>
          </div>
          {highlights.map((h, i) => (
            <p key={i} className="text-gray-600 border-l-4 border-sky-400 pl-3 py-2 transition-all hover:shadow-sm hover:border-blue-500 text-sm">{h}</p>
          ))}
        </div>

        {/* 주의 포인트 */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-5 border-2 border-amber-200">
          <h3 className="text-base font-bold text-amber-800 mb-2 flex items-center gap-2">
            ⚠️ 오늘 주의해야 할 포인트
          </h3>
          <p className="text-sm text-gray-700 leading-relaxed">
            {getCautionPoints()}
          </p>
        </div>

        {/* 친구 부스터 - 한글로 변경 */}
        <div className="bg-gradient-to-r from-sky-400/90 to-indigo-600/90 rounded-3xl p-6 shadow-xl shadow-blue-300/50 hover:shadow-2xl hover:shadow-blue-400/60 transition-all">
          <h3 className="text-xl font-extrabold text-white mb-2">친구 운세 부스터 💙</h3>
          <p className="text-blue-50 mb-2 text-sm">
            부족한 오행: {mockUserSaju.deficientOhang === '木' ? '나무(목)' : 
                        mockUserSaju.deficientOhang === '火' ? '불(화)' : 
                        mockUserSaju.deficientOhang === '土' ? '흙(토)' : 
                        mockUserSaju.deficientOhang === '金' ? '쇠(금)' : '물(수)'}
          </p>
          <p className="text-white text-sm mb-4">
            {booster.complementaryGan?.join(', ')} 일주 친구와 함께하면 +{booster.bonusScore}점!
          </p>
          <button className="bg-white hover:bg-sky-50 text-sky-600 font-extrabold px-6 py-2 rounded-full shadow-md hover:shadow-lg transition-all hover:scale-105 active:scale-95 text-sm">
            카톡으로 공유하기
          </button>
        </div>

        {/* 7일 히스토리 */}
        <HistoryChart history={mockHistoryData} />

        {/* 운세 비중 설정 */}
        <div className="jelly-card p-6">
          <h3 className="text-lg font-bold text-gray-700 mb-4">운세 비중 설정 ⚖️</h3>
          <p className="text-xs text-gray-500 mb-4">각 운세가 총점에 미치는 영향을 조정하세요 (합계: {weights.ohasa + weights.star + weights.saju + weights.ddi}%)</p>
          
          <div className="space-y-4">
            {Object.entries(weights).map(([key, value]) => {
              const names: Record<string, string> = {
                ohasa: '오하아사',
                star: '별자리',
                saju: '사주',
                ddi: '띠'
              };
              
              return (
                <div key={key}>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-700">{names[key]}</span>
                    <span className="text-sm font-bold text-sky-600">{value}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={value}
                    onChange={(e) => {
                      const newValue = parseInt(e.target.value);
                      const total = Object.entries(weights)
                        .filter(([k]) => k !== key)
                        .reduce((sum, [, v]) => sum + v, 0);
                      
                      if (total + newValue <= 100) {
                        setWeights({...weights, [key]: newValue});
                      }
                    }}
                    className="w-full h-2 bg-sky-200 rounded-lg appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, #38bdf8 0%, #38bdf8 ${value}%, #e0f2fe ${value}%, #e0f2fe 100%)`
                    }}
                  />
                </div>
              );
            })}
          </div>
          
          <button
            onClick={() => setWeights({ ohasa: 40, star: 30, saju: 20, ddi: 10 })}
            className="mt-4 w-full py-2 px-4 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-xl transition-all text-sm"
          >
            기본값으로 초기화
          </button>
        </div>
      </main>
    </div>
  );
}