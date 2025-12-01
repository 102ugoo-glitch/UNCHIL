// lib/data.ts

// ============================================
// 📊 타입 정의
// ============================================

export interface DailyScores {
  ohasa: number;
  star: number;
  saju: number;
  ddi: number;
}

export interface HistoryData {
  date: string;
  total: number;
  scores: DailyScores;
  luckyTime?: string;
  luckyColor?: string;
}

export interface Weights {
  ohasa: number;
  star: number;
  saju: number;
  ddi: number;
}

export interface SajuInfo {
  ilgan: string; // 일간 (天干)
  ilji: string;  // 일지 (地支)
  ohang: string; // 오행
  deficientOhang: string; // 부족한 오행
  excessiveOhang: string; // 과한 오행
  luckyDirection: string; // 행운의 방향
  luckyNumber: number; // 행운의 숫자
}

export interface ZodiacInfo {
  sign: string;
  element: string;
  luckyDay: string;
}

// ============================================
// 🌟 오행(五行) 시스템
// ============================================

const OHANG = {
  木: { name: '나무', color: '#10b981', emoji: '🌲' },
  火: { name: '불', color: '#ef4444', emoji: '🔥' },
  土: { name: '흙', color: '#f59e0b', emoji: '⛰️' },
  金: { name: '쇠', color: '#94a3b8', emoji: '⚔️' },
  水: { name: '물', color: '#3b82f6', emoji: '💧' },
} as const;

const OHANG_CYCLE = {
  생: { 木: '水', 火: '木', 土: '火', 金: '土', 水: '金' }, // 상생
  극: { 木: '土', 火: '金', 土: '水', 金: '木', 水: '火' }, // 상극
} as const;

// 천간(天干) - 10개
const CHEONGAN = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'] as const;
const CHEONGAN_OHANG: Record<string, keyof typeof OHANG> = {
  '甲': '木', '乙': '木',
  '丙': '火', '丁': '火',
  '戊': '土', '己': '土',
  '庚': '金', '辛': '金',
  '壬': '水', '癸': '水',
};

// 지지(地支) - 12개 (띠)
const JIJI = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'] as const;
const JIJI_ANIMALS = ['쥐', '소', '호랑이', '토끼', '용', '뱀', '말', '양', '원숭이', '닭', '개', '돼지'] as const;
const JIJI_OHANG: Record<string, keyof typeof OHANG> = {
  '子': '水', '亥': '水',
  '寅': '木', '卯': '木',
  '巳': '火', '午': '火',
  '申': '金', '酉': '金',
  '辰': '土', '戌': '土', '丑': '土', '未': '土',
};

// ============================================
// 🎲 동적 점수 생성 (실제 날짜 기반)
// ============================================

function generateDailyScore(date: Date, baseScore: number = 70): number {
  // 날짜를 시드로 사용한 의사 랜덤
  const seed = date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate();
  const random = Math.abs(Math.sin(seed) * 10000) % 31; // 0-30 범위
  return Math.max(30, Math.min(100, baseScore + (random - 15))); // 30-100 범위
}

export function generateTodayScores(birthDate?: Date): DailyScores {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const hour = today.getHours();
  
  // 요일별 가중치 (일요일=0, 토요일=6)
  const dayWeights = [1.1, 0.9, 1.0, 1.05, 0.95, 1.0, 1.05]; // 일요일과 주말에 약간 높음
  const dayWeight = dayWeights[dayOfWeek];
  
  // 시간대별 가중치 (아침 시간대 높음)
  const hourWeight = hour >= 6 && hour <= 10 ? 1.15 : 
                     hour >= 11 && hour <= 14 ? 1.0 : 
                     hour >= 15 && hour <= 18 ? 1.05 : 0.95;
  
  return {
    ohasa: Math.round(generateDailyScore(today, 70) * hourWeight),
    star: Math.round(generateDailyScore(new Date(today.getTime() + 1), 65) * dayWeight),
    saju: Math.round(generateDailyScore(new Date(today.getTime() + 2), 75)),
    ddi: Math.round(generateDailyScore(new Date(today.getTime() + 3), 68)),
  };
}

// ============================================
// 📈 7일 히스토리 생성 (실제 날짜 기반)
// ============================================

export function generateHistoryData(days: number = 7): HistoryData[] {
  const history: HistoryData[] = [];
  const today = new Date();
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    const scores = {
      ohasa: generateDailyScore(date, 70),
      star: generateDailyScore(new Date(date.getTime() + 1), 65),
      saju: generateDailyScore(new Date(date.getTime() + 2), 75),
      ddi: generateDailyScore(new Date(date.getTime() + 3), 68),
    };
    
    const total = scores.ohasa + scores.star + scores.saju + scores.ddi;
    
    // 행운의 시간대 계산 (최고 점수 기반)
    const maxScore = Math.max(...Object.values(scores));
    const luckyTimeRanges = ['6-9시', '9-12시', '12-15시', '15-18시', '18-21시'];
    const luckyTime = luckyTimeRanges[Math.floor(maxScore / 20) % luckyTimeRanges.length];
    
    // 행운의 색상 (오행 기반)
    const luckyColors = ['#10b981', '#ef4444', '#f59e0b', '#94a3b8', '#3b82f6'];
    const luckyColor = luckyColors[Math.floor(total / 80) % luckyColors.length];
    
    history.push({
      date: `${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`,
      total,
      scores,
      luckyTime,
      luckyColor,
    });
  }
  
  return history;
}

// Mock 데이터는 실제 생성 함수로 대체
export const mockHistoryData = generateHistoryData(7);
export const todayData = mockHistoryData[mockHistoryData.length - 1];
export const yesterdayData = mockHistoryData[mockHistoryData.length - 2];

// ============================================
// ⚖️ 가중치 시스템
// ============================================

export const defaultWeights: Weights = {
  ohasa: 0.4,  // 오하아사가 가장 중요
  star: 0.3,   // 별자리
  saju: 0.2,   // 사주
  ddi: 0.1,    // 띠
};

// 사용자 커스텀 가중치 (선호도에 따라 조정 가능)
export function createCustomWeights(preferences: Partial<Weights>): Weights {
  const weights = { ...defaultWeights, ...preferences };
  
  // 가중치 합이 1.0이 되도록 정규화
  const total = Object.values(weights).reduce((sum, w) => sum + w, 0);
  if (total !== 1.0) {
    Object.keys(weights).forEach(key => {
      weights[key as keyof Weights] /= total;
    });
  }
  
  return weights;
}

export const calculateTotalScore = (scores: DailyScores, weights: Weights): number => {
  const total =
    scores.ohasa * weights.ohasa +
    scores.star * weights.star +
    scores.saju * weights.saju +
    scores.ddi * weights.ddi;
  return Math.round(total);
};

// ============================================
// 💡 하이라이트 생성 (고도화)
// ============================================

export const generateHighlights = (scores: DailyScores) => {
  const highlights: string[] = [];
  const maxScore = Math.max(...Object.values(scores));
  const minScore = Math.min(...Object.values(scores));
  
  const sourceName: Record<keyof DailyScores, string> = {
    ohasa: "오하아사",
    star: "별자리",
    saju: "사주",
    ddi: "띠",
  };
  
  const maxSource = Object.keys(scores).find((key) => scores[key as keyof DailyScores] === maxScore) as keyof DailyScores;
  const minSource = Object.keys(scores).find((key) => scores[key as keyof DailyScores] === minScore) as keyof DailyScores;
  
  // 최고 점수 하이라이트
  if (maxScore >= 90) {
    highlights.push(`🌟 ${sourceName[maxSource]} 운세 ${maxScore}점! 완벽한 하루예요!`);
  } else if (maxScore >= 80) {
    highlights.push(`🏆 ${sourceName[maxSource]} 운세 ${maxScore}점으로 오늘 운을 리드!`);
  } else {
    highlights.push(`💪 ${sourceName[maxSource]} 운세가 ${maxScore}점으로 가장 좋아요!`);
  }
  
  // 최저 점수 경고
  if (minScore <= 50) {
    highlights.push(`⚠️ ${sourceName[minSource]} 운세가 ${minScore}점으로 낮아요. 신중하게 행동하세요.`);
  } else if (minScore <= 65) {
    highlights.push(`💡 ${sourceName[minSource]} 운세가 보통이에요. 큰 결정은 내일로 미루는 게 좋아요.`);
  }
  
  // 시간대 추천 (동적 계산)
  const now = new Date();
  const currentHour = now.getHours();
  const luckyHour = (currentHour + Math.floor(maxScore / 10)) % 24;
  const luckyEndHour = (luckyHour + 2) % 24;
  highlights.push(`⏰ 오늘의 베스트 타임: ${luckyHour}시 - ${luckyEndHour}시`);
  
  return highlights;
};

// ============================================
// 🎯 사주 정보 생성 (생년월일 기반)
// ============================================

export function calculateSaju(birthDate: Date): SajuInfo {
  const year = birthDate.getFullYear();
  const month = birthDate.getMonth() + 1;
  const day = birthDate.getDate();
  
  // 간지 계산 (간단한 버전)
  const ilganIndex = (year + month + day) % 10;
  const iljiIndex = (year + month + day) % 12;
  
  const ilgan = CHEONGAN[ilganIndex];
  const ilji = JIJI[iljiIndex];
  const ohang = CHEONGAN_OHANG[ilgan];
  
  // 부족한 오행 계산 (반대 오행)
  const ohangKeys = Object.keys(OHANG) as Array<keyof typeof OHANG>;
  const currentIndex = ohangKeys.indexOf(ohang);
  const deficientOhang = ohangKeys[(currentIndex + 2) % 5]; // 상극 관계
  const excessiveOhang = ohangKeys[(currentIndex + 3) % 5];
  
  // 행운의 방향 (오행별)
  const directions: Record<keyof typeof OHANG, string> = {
    '木': '동쪽', '火': '남쪽', '土': '중앙', '金': '서쪽', '水': '북쪽'
  };
  
  // 행운의 숫자 (오행별)
  const luckyNumbers: Record<keyof typeof OHANG, number> = {
    '木': 3, '火': 2, '土': 5, '金': 4, '水': 1
  };
  
  return {
    ilgan: `${ilgan} (${ohang})`,
    ilji: `${ilji} (${JIJI_ANIMALS[iljiIndex]})`,
    ohang,
    deficientOhang,
    excessiveOhang,
    luckyDirection: directions[ohang],
    luckyNumber: luckyNumbers[ohang],
  };
}

// Mock 사용자 사주 (실제로는 사용자 생년월일로 계산)
export const mockUserSaju = calculateSaju(new Date(1990, 4, 15)); // 1990년 5월 15일

// ============================================
// 🤝 친구 부스터 시스템
// ============================================

export const getBoosterMessage = (totalScore: number, userSaju: SajuInfo = mockUserSaju) => {
  const { deficientOhang, ohang } = userSaju;
  const ohangInfo = OHANG[deficientOhang as keyof typeof OHANG];
  
  let message = `오늘 내 운세는 **${totalScore}점**! `;
  let shareBonus = 0;
  
  // 점수에 따른 부스터 효과
  if (totalScore >= 80) {
    message += `이미 좋은 운세지만, `;
    shareBonus = 5;
  } else if (totalScore >= 60) {
    message += `괜찮은 운세예요. `;
    shareBonus = 10;
  } else {
    message += `운이 조금 낮네요. `;
    shareBonus = 15;
  }
  
  // 오행 기반 부스터
  message += `${ohangInfo.emoji} **${OHANG[deficientOhang as keyof typeof OHANG].name}(${deficientOhang}) 기운**이 부족해요. `;
  
  // 추천 친구 일간
  const complementaryGan = Object.entries(CHEONGAN_OHANG)
    .filter(([_, o]) => o === deficientOhang)
    .map(([gan]) => gan);
  
  message += `**${complementaryGan.join('/')}** 일주 친구에게 공유하면 **+${shareBonus}점** 부스터!`;
  
  return {
    shareText: `🎲 오늘 내 운세 ${totalScore}점! 너랑 합치면 ${totalScore + shareBonus}점 만들 수 있을 것 같아! UNCHIL에서 확인해봐!`,
    boosterTip: message,
    bonusScore: shareBonus,
    complementaryElements: [deficientOhang],
    complementaryGan,
  };
};

// ============================================
// 📊 통계 분석 함수들
// ============================================

export function getWeeklyStats(history: HistoryData[]) {
  const scores = history.map(d => d.total);
  
  return {
    average: Math.round(scores.reduce((a, b) => a + b, 0) / scores.length),
    max: Math.max(...scores),
    min: Math.min(...scores),
    trend: scores[scores.length - 1] - scores[0],
    volatility: Math.round(
      Math.sqrt(
        scores.reduce((sum, s, i, arr) => {
          const avg = arr.reduce((a, b) => a + b, 0) / arr.length;
          return sum + Math.pow(s - avg, 2);
        }, 0) / scores.length
      )
    ),
  };
}

export function predictTomorrow(history: HistoryData[]): number {
  // 간단한 이동평균 예측
  const recent = history.slice(-3).map(d => d.total);
  const trend = recent[recent.length - 1] - recent[0];
  const avgRecent = recent.reduce((a, b) => a + b, 0) / recent.length;
  
  return Math.round(Math.max(30, Math.min(100, avgRecent + trend * 0.3)));
}
