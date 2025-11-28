// lib/data.ts

export const mockHistoryData = [
  {
    date: "03-18",
    total: 68,
    scores: { ohasa: 60, star: 75, saju: 65, ddi: 72 },
  },
  {
    date: "03-19",
    total: 85,
    scores: { ohasa: 95, star: 80, saju: 75, ddi: 90 },
  },
  {
    date: "03-20",
    total: 72,
    scores: { ohasa: 80, star: 65, saju: 70, ddi: 75 },
  },
  {
    date: "03-21",
    total: 55,
    scores: { ohasa: 45, star: 50, saju: 60, ddi: 65 },
  },
  {
    date: "03-22",
    total: 78,
    scores: { ohasa: 70, star: 85, saju: 80, ddi: 75 },
  },
  {
    date: "03-23",
    total: 92,
    scores: { ohasa: 100, star: 90, saju: 85, ddi: 95 },
  },
  {
    date: "03-24",
    total: 75,
    scores: { ohasa: 88, star: 72, saju: 55, ddi: 68 },
  },
];

export const todayData = mockHistoryData[mockHistoryData.length - 1];
export const yesterdayData = mockHistoryData[mockHistoryData.length - 2];

export interface Weights {
  ohasa: number;
  star: number;
  saju: number;
  ddi: number;
}

export const defaultWeights: Weights = {
  ohasa: 0.4,
  star: 0.3,
  saju: 0.2,
  ddi: 0.1,
};

export const calculateTotalScore = (scores: any, weights: Weights): number => {
  const total =
    scores.ohasa * weights.ohasa +
    scores.star * weights.star +
    scores.saju * weights.saju +
    scores.ddi * weights.ddi;
  return Math.round(total);
};

export const generateHighlights = (scores: any) => {
  const highlights = [];

  const maxScore = Math.max(...Object.values(scores));
  const sourceName: any = {
    ohasa: "오하아사",
    star: "별자리",
    saju: "사주",
    ddi: "띠",
  };

  const maxSource = Object.keys(scores).find((key) => scores[key] === maxScore);

  if (maxScore >= 85) {
    highlights.push(
      `🏆 ${sourceName[maxSource!]} 운세 ${maxScore}점으로 오늘 운을 리드!`,
    );
  }

  const minScore = Math.min(...Object.values(scores));
  if (minScore <= 60) {
    const minSource = Object.keys(scores).find(
      (key) => scores[key] === minScore,
    );
    highlights.push(
      `⚠️ ${sourceName[minSource!]} 운세가 낮아요. 신중함이 필요합니다.`,
    );
  }

  highlights.push("💡 오늘은 오후 2시 - 4시 사이가 베스트 타임입니다.");

  return highlights;
};

export const mockUserSaju = {
  ilgan: "庚 (경금)",
  ohang: "金",
  deficientOhang: "火",
};

export const getBoosterMessage = (totalScore: number) => {
  const { deficientOhang } = mockUserSaju;

  let message = `오늘 내 운세 **${totalScore}점**!`;

  if (deficientOhang === "火") {
    message += ` 하지만 🔥 **火 기운**이 부족해요. **丙/丁(화)** 일주 친구에게 공유하고 **열정**을 더하세요!`;
  }

  return {
    shareText: `오늘 내 운세 ${totalScore}점! 너랑 합치면 150점 만들 수 있을 것 같아 🎲 UNCHIL에서 확인해봐!`,
    boosterTip: message,
  };
};
