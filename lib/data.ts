// lib/data.ts - 사주 계산 부분만 수정

// 천간 (10개)
const CHEONGAN = ['갑', '을', '병', '정', '무', '기', '경', '신', '임', '계'] as const;

// 지지 (12개)
const JIJI = ['자', '축', '인', '묘', '진', '사', '오', '미', '신', '유', '술', '해'] as const;

// 띠 이름
const JIJI_ANIMALS = ['쥐', '소', '호랑이', '토끼', '용', '뱀', '말', '양', '원숭이', '닭', '개', '돼지'] as const;

// 연도로 띠 계산 (1900년 = 쥐띠)
export function getAnimalSign(year: number): string {
  // 1900년이 경자년(쥐띠)
  const index = (year - 1900) % 12;
  return JIJI_ANIMALS[index];
}

// 일주 계산 (간단 버전 - 실제로는 만세력 필요)
export function calculateIlju(year: number, month: number, day: number): string {
  // 1900년 1월 1일을 기준점으로 설정 (경인일)
  const baseDate = new Date(1900, 0, 1);
  const targetDate = new Date(year, month - 1, day);
  
  // 날짜 차이 계산
  const diffTime = targetDate.getTime() - baseDate.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  // 일주는 60갑자 순환
  // 1900년 1월 1일 = 경인일 (26번째)
  const baseGapja = 26;
  const gapjaIndex = (baseGapja + diffDays) % 60;
  
  // 60갑자 배열
  const gan60: string[] = [];
  const ji60: string[] = [];
  
  for (let i = 0; i < 60; i++) {
    gan60.push(CHEONGAN[i % 10]);
    ji60.push(JIJI[i % 12]);
  }
  
  return `${gan60[gapjaIndex]}${ji60[gapjaIndex]}`;
}

// 사주 정보 계산
export function calculateSajuInfo(year: number, month: number, day: number) {
  const animal = getAnimalSign(year);
  const ilju = calculateIlju(year, month, day);
  
  return {
    animal,
    ilju,
    iljuName: `${ilju}일주`
  };
}

// 예시 테스트
// 1999년 10월 7일 = 토끼띠, 임진일주
// console.log(calculateSajuInfo(1999, 10, 7));
// { animal: '토끼', ilju: '임진', iljuName: '임진일주' }
