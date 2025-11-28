// lib/gemini.ts
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

export async function generateInsights(historyData: any[], todayScores: any) {
  try {
    const prompt = `당신은 운세 전문가입니다. 다음 7일간의 운세 데이터를 분석해주세요:

7일 데이터: ${JSON.stringify(historyData)}
오늘 점수: 오하아사 ${todayScores.ohasa}점, 별자리 ${todayScores.star}점, 사주 ${todayScores.saju}점, 띠 ${todayScores.ddi}점

다음 형식으로 3가지 인사이트를 제공해주세요:
1. 가장 높은 점수를 받은 운세 소스와 그 의미
2. 주의가 필요한 부분  
3. 오늘의 추천 행동

각 인사이트는 한 문장으로, 이모지를 포함해서 작성해주세요.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // 줄바꿈으로 분리해서 배열로 반환
    return text.split("\n").filter((line) => line.trim());
  } catch (error) {
    console.error("Gemini API Error:", error);
    // 에러 시 기본 하이라이트 반환
    return [
      "🏆 오하아사 운세로 오늘 운을 리드!",
      "⚠️ 사주 운세가 낮아요. 신중함이 필요합니다.",
      "💡 오늘은 오후 2시 - 4시 사이가 베스트 타임입니다.",
    ];
  }
}

export async function analyzeWeeklyPattern(historyData: any[]) {
  try {
    const prompt = `운세 전문가로서 이 사용자의 7일 운세 패턴을 분석해주세요:

데이터: ${JSON.stringify(historyData)}

다음 내용을 포함해서 분석해주세요:
1. 전반적인 운세 흐름 (상승세/하락세/안정)
2. 가장 좋았던 날과 그 이유
3. 다음 주에 주의할 점
4. 운세를 개선하기 위한 구체적 조언

자연스러운 한국어로 4-5문장 정도로 작성해주세요.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "운세 분석 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.";
  }
}
