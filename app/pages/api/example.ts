// pages/api/example.ts
import type { NextApiRequest, NextApiResponse } from 'next';

// API 핸들러 함수 정의
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // 외부 API 호출
    const response = await fetch('https://api.example.com/data');
    
    // 응답이 정상인지 확인
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    // JSON 데이터 파싱
    const data = await response.json();
    
    // 클라이언트에 데이터 전송
    res.status(200).json(data);
  } catch (error) {
    // 에러 발생 시 로그 출력 및 500 상태 코드 반환
    console.error('Error fetching data:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
