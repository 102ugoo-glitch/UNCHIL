// lib/data.ts - 완전판

// 천간 (10개)
const CHEONGAN = ['갑', '을', '병', '정', '무', '기', '경', '신', '임', '계'] as const;

// 지지 (12개)
const JIJI = ['자', '축', '인', '묘', '진', '사', '오', '미', '신', '유', '술', '해'] as const;

// 띠 이름
const JIJI_ANIMALS = ['쥐', '소', '호랑이', '토끼', '용', '뱀', '말', '양', '원숭이', '닭', '개', '돼지'] as const;

// 오행
const CHEONGAN_OHANG = {
  '갑': '木', '을': '木',
  '병': '火', '정': '火',
  '무': '土', '기': '土',
  '경': '金', '신': '金',
  '임': '水', '계': '水'
};

const JIJI_OHANG = {
  '인': '木', '묘': '木',
  '사': '火', '오': '火',
  '진': '土', '술': '土', '축': '土', '미': '土',
  '신': '金', '유': '金',
  '자': '水', '해': '水'
};

// 타입 정의
export interface DailyScores {
  ohasa: number;
  star: number;
  saju: number;
  ddi: number;
}

export interface DailyData {
  date: string;
  scores: DailyScores;
  luckyTime: string;
  luckyColor: string;
}

export interface SajuInfo {
  ilgan: string;
  ilji: string;
  ilganOhang: string;
  iljiOhang: string;
  deficientOhang: string;
  excessiveOhang: string;
  luckyDirection: string;
  luckyNumber: number;
}

export interface BoosterMessage {
  bonusScore: number;
  boosterTip: string;
  complementaryGan?: string[];
}

// 연도로 띠 계산
export function getAnimalSign(year: number): string {
  const index = (year - 1900) % 12;
  return JIJI_ANIMALS[index];
}

// 일주 계산
export function calculateIlju(year: number, month: number, day: number): string {
  const baseDate = new Date(1900, 0, 1);
  const targetDate = new Date(year, month - 1, day);
  
  const diffTime = targetDate.getTime() - baseDate.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  const baseGapja = 26;
  // 음수 처리 추가
  const gapjaIndex = ((baseGapja + diffDays) % 60 + 60) % 60;
  
  const ganIndex = gapjaIndex % 10;
  const jiIndex = gapjaIndex % 12;
  
  return `${CHEONGAN[ganIndex]}${JIJI[jiIndex]}`;
}

// 사주 계산
export function calculateSaju(birthDate: Date): SajuInfo {
  const year = birthDate.getFullYear();
  const month = birthDate.getMonth() + 1;
  const day = birthDate.getDate();
  
  const ilju = calculateIlju(year, month, day);
  const ilgan = ilju[0];
  const ilji = ilju[1];
  
  const ilganOhang = CHEONGAN_OHANG[ilgan as keyof typeof CHEONGAN_OHANG];
  const iljiOhang = JIJI_OHANG[ilji as keyof typeof JIJI_OHANG];
  
  // 간단한 오행 부족/과다 판단 (실제로는 더 복잡)
  const ohangCount = { '木': 0, '火': 0, '土': 0, '金': 0, '水': 0 };
  ohangCount[ilganOhang]++;
  ohangCount[iljiOhang]++;
  
  const deficientOhang = Object.keys(ohangCount).find(k => ohangCount[k as keyof typeof ohangCount] === 0) || '土';
  const excessiveOhang = ilganOhang;
  
  return {
    ilgan,
    ilji,
    ilganOhang,
    iljiOhang,
    deficientOhang,
    excessiveOhang,
    luckyDirection: '동쪽',
    luckyNumber: Math.floor(Math.random() * 9) + 1
  };
}

// 날짜 기반 점수 생성 (의사 랜덤)
function generateDailyScore(date: Date, baseScore: number = 70): number {
  const seed = date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate();
  const random = Math.sin(seed) * 10000;
  const variance = (random - Math.floor(random)) * 40 - 20; // -20 ~ +20
  return Math.max(30, Math.min(100, baseScore + variance));
}

// 오늘 날짜
const today = new Date();
const yesterday = new Date(today);
yesterday.setDate(yesterday.getDate() - 1);

// 오늘의 점수
export const todayData: DailyData = {
  date: today.toISOString().split('T')[0],
  scores: {
    ohasa: generateDailyScore(today, 75),
    star: generateDailyScore(new Date(today.getTime() + 1000), 70),
    saju: generateDailyScore(new Date(today.getTime() + 2000), 80),
    ddi: generateDailyScore(new Date(today.getTime() + 3000), 73)
  },
  luckyTime: '19시 - 21시',
  luckyColor: '파란색'
};

// 어제의 점수
export const yesterdayData: DailyData = {
  date: yesterday.toISOString().split('T')[0],
  scores: {
    ohasa: generateDailyScore(yesterday, 70),
    star: generateDailyScore(new Date(yesterday.getTime() + 1000), 68),
    saju: generateDailyScore(new Date(yesterday.getTime() + 2000), 75),
    ddi: generateDailyScore(new Date(yesterday.getTime() + 3000), 72)
  },
  luckyTime: '14시 - 16시',
  luckyColor: '초록색'
};

// 7일 히스토리
export const mockHistoryData: DailyData[] = Array.from({ length: 7 }, (_, i) => {
  const date = new Date(today);
  date.setDate(date.getDate() - (6 - i));
  return {
    date: date.toISOString().split('T')[0],
    scores: {
      ohasa: generateDailyScore(date, 70),
      star: generateDailyScore(new Date(date.getTime() + 1000), 68),
      saju: generateDailyScore(new Date(date.getTime() + 2000), 75),
      ddi: generateDailyScore(new Date(date.getTime() + 3000), 72)
    },
    luckyTime: `${Math.floor(Math.random() * 12 + 6)}시 - ${Math.floor(Math.random() * 12 + 12)}시`,
    luckyColor: ['빨강', '파랑', '노랑', '초록', '보라'][Math.floor(Math.random() * 5)]
  };
});

// 하이라이트 생성
export function generateHighlights(scores: DailyScores): string[] {
  const sortedScores = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const bestCategory = sortedScores[0][0];
  const bestScore = sortedScores[0][1];
  
  const names: Record<string, string> = {
    ohasa: '오하아사',
    star: '별자리',
    saju: '사주',
    ddi: '띠'
  };
  
  return [
    `🏆 ${names[bestCategory]} 운세 ${bestScore.toFixed(1)}점으로 오늘 운을 리드!`,
    `⏰ 오늘의 베스트 타임: ${todayData.luckyTime}`,
    `🎨 행운의 색상: ${todayData.luckyColor}`
  ];
}

// 친구 부스터 메시지
export function getBoosterMessage(totalScore: number, userSaju: SajuInfo): BoosterMessage {
  let bonusScore = 5;
  if (totalScore >= 80) bonusScore = 5;
  else if (totalScore >= 60) bonusScore = 10;
  else bonusScore = 15;
  
  // 부족한 오행을 보완하는 천간
  const complementaryGan: string[] = [];
  Object.entries(CHEONGAN_OHANG).forEach(([gan, ohang]) => {
    if (ohang === userSaju.deficientOhang) {
      complementaryGan.push(gan);
    }
  });
  
  return {
    bonusScore,
    boosterTip: `${complementaryGan.join(', ')} 일주 친구와 함께하면 운이 상승해요!`,
    complementaryGan
  };
}

// Mock 사주 (예시용)
export const mockUserSaju: SajuInfo = {
  ilgan: '임',
  ilji: '진',
  ilganOhang: '水',
  iljiOhang: '土',
  deficientOhang: '火',
  excessiveOhang: '水',
  luckyDirection: '남쪽',
  luckyNumber: 7
};
