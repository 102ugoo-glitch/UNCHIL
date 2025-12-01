// lib/gemini.ts
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

export async function generateInsights(historyData: any[], todayScores: any) {
  try {
    const prompt = `당신은 20년 경력의 운세 전문가이자 데이터 분석가입니다. 사용자의 운세를 따뜻하고 공감적인 톤으로 분석해주세요.

📊 7일간의 운세 추이:
${JSON.stringify(historyData, null, 2)}

🎯 오늘의 상세 점수:
- 오하아사: ${todayScores.ohasa}점
- 별자리: ${todayScores.star}점  
- 사주: ${todayScores.saju}점
- 띠: ${todayScores.ddi}점
- 총점: ${todayScores.ohasa + todayScores.star + todayScores.saju + todayScores.ddi}점

다음 3가지 인사이트를 **정확히 이 형식**으로 제공해주세요:

1. [이모지] [가장 높은 점수 소스명]: [구체적인 의미와 오늘의 행운 키워드]
2. [이모지] 주의사항: [가장 낮은 점수 영역과 구체적인 조언]
3. [이모지] 추천 행동: [오늘 꼭 해야 할 한 가지 행동, 시간대 포함]

규칙:
- 각 인사이트는 **한 줄**로 작성
- 반드시 **이모지로 시작**
- 구체적이고 실행 가능한 조언 제공
- 긍정적이면서도 현실적인 톤 유지
- 숫자와 시간을 구체적으로 언급`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // 줄바꿈으로 분리하고 빈 줄 제거
    const insights = text
      .split("\n")
      .map(line => line.trim())
      .filter(line => line && /^[0-9]\./.test(line))
      .map(line => line.replace(/^[0-9]\.\s*/, ''));
    
    // 정확히 3개의 인사이트가 없으면 기본값 반환
    if (insights.length !== 3) {
      return [
        "🏆 오하아사 운세로 오늘 운을 리드하세요! 아침 일찍 중요한 결정을 내리면 좋습니다.",
        "⚠️ 주의사항: 사주 운세가 낮으니 계약이나 중요한 약속은 내일로 미루세요.",
        "💡 추천 행동: 오후 2-4시 사이에 평소 미루던 일을 처리하면 좋은 결과가 있을 거예요.",
      ];
    }
    
    return insights;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return [
      "🏆 오하아사 운세로 오늘 운을 리드하세요! 아침 일찍 중요한 결정을 내리면 좋습니다.",
      "⚠️ 주의사항: 사주 운세가 낮으니 계약이나 중요한 약속은 내일로 미루세요.",
      "💡 추천 행동: 오후 2-4시 사이에 평소 미루던 일을 처리하면 좋은 결과가 있을 거예요.",
    ];
  }
}

export async function analyzeWeeklyPattern(historyData: any[]) {
  try {
    // 점수 변화 계산
    const scores = historyData.map(d => d.total);
    const avgScore = scores.reduce((a, b) => a + b, 0) / scores.length;
    const trend = scores[scores.length - 1] - scores[0];
    const maxScore = Math.max(...scores);
    const minScore = Math.min(...scores);
    const maxDay = historyData[scores.indexOf(maxScore)].date;
    const minDay = historyData[scores.indexOf(minScore)].date;
    
    const prompt = `당신은 따뜻하고 공감적인 운세 전문가입니다. 사용자가 한 주를 돌아보며 위로받고 힘을 얻을 수 있도록 분석해주세요.

📊 7일간의 운세 데이터:
${JSON.stringify(historyData, null, 2)}

📈 통계 요약:
- 평균 점수: ${avgScore.toFixed(1)}점
- 최고 점수: ${maxScore}점 (${maxDay})
- 최저 점수: ${minScore}점 (${minDay})
- 전체 트렌드: ${trend > 0 ? '상승세 ↗️' : trend < 0 ? '하락세 ↘️' : '안정세 →'}

다음 구조로 **4-5문장**의 자연스러운 분석을 작성해주세요:

1. **오프닝 (1문장)**: 전반적인 운세 흐름을 긍정적으로 요약하며 시작
2. **하이라이트 (1-2문장)**: 가장 좋았던 날의 의미와 그날의 특징 분석
3. **주의사항 (1문장)**: 낮았던 날이나 앞으로 조심해야 할 점을 부드럽게 조언
4. **다음 주 전망 (1-2문장)**: 희망적이고 구체적인 개선 방안 제시

톤 가이드:
- 친구가 조언하듯 따뜻하고 공감적으로
- "~했어요", "~해보세요" 같은 친근한 말투
- 데이터를 근거로 하되, 수치보다는 의미 중심으로
- 마지막은 반드시 격려와 희망의 메시지로 마무리
- 이모지는 적절히 사용 (과하지 않게 2-3개)`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // 응답이 너무 짧거나 없으면 기본값 반환
    if (!text || text.length < 50) {
      return `이번 주는 평균 ${avgScore.toFixed(1)}점으로 꾸준한 흐름을 보였어요. 특히 ${maxDay}에 ${maxScore}점으로 최고점을 찍으며 좋은 에너지를 받았네요! ✨ ${minDay}에는 조금 낮았지만, 이런 날도 있는 법이에요. 다음 주에는 아침 루틴을 조금만 더 신경 써보세요. 분명 더 좋은 흐름이 올 거예요! 💪`;
    }
    
    return text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "이번 주도 고생 많으셨어요! 운세는 오르락내리락하지만, 중요한 건 꾸준히 긍정적인 마음을 유지하는 거예요. 다음 주에는 더 좋은 운이 찾아올 거예요! ✨";
  }
}

export async function generateDailyBooster(todayScore: number, userName?: string) {
  try {
    const name = userName || "당신";
    const scoreLevel = todayScore >= 80 ? "매우 높음" : todayScore >= 60 ? "양호" : todayScore >= 40 ? "보통" : "낮음";
    
    const prompt = `당신은 친구처럼 따뜻한 운세 상담가입니다. 오늘의 운세 점수를 바탕으로 힘이 되는 메시지를 작성해주세요.

👤 사용자: ${name}
📊 오늘 점수: ${todayScore}점 (${scoreLevel})

다음 2가지를 제공해주세요:

1. **격려 메시지**: ${name}님에게 오늘의 운세에 맞는 한 줄 응원 메시지 (이모지 포함)
2. **친구 부스터 팁**: 친구와 공유하면 운이 상승하는 이유를 재미있고 구체적으로 설명 (2-3문장)

톤:
- 친구가 말하듯 따뜻하고 유쾌하게
- 점수가 낮아도 긍정적인 관점 유지
- "~해봐요", "~거예요" 같은 친근한 말투

형식:
격려: [한 줄 메시지]
부스터: [2-3문장 설명]`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // 텍스트 파싱
    const lines = text.split('\n').filter(line => line.trim());
    const encouragement = lines.find(line => line.includes('격려'))?.replace(/^격려:\s*/, '') || 
                         `오늘도 ${name}님의 하루를 응원해요! 💙`;
    const boosterTip = lines.find(line => line.includes('부스터'))?.replace(/^부스터:\s*/, '') || 
                      "친구와 운세를 나누면 긍정 에너지가 2배가 되어 돌아와요! 행운은 나눌수록 커진다는 사실, 잊지 마세요! ✨";
    
    return {
      encouragement,
      boosterTip
    };
  } catch (error) {
    console.error("Gemini API Error:", error);
    return {
      encouragement: "오늘도 좋은 하루 보내세요! 💙",
      boosterTip: "친구와 운세를 공유하면 행운이 2배가 되어 돌아온다고 해요! 같이 행복을 나눠보세요! ✨"
    };
  }
}
