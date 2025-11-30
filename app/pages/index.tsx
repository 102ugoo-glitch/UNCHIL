// pages/index.tsx
import { GetServerSideProps } from 'next';

interface Props {
  data: any; // API에서 가져온 데이터의 타입을 정의할 수 있습니다.
}

// HomePage 컴포넌트 정의
const HomePage: React.FC<Props> = ({ data }) => {
  return (
    <div>
      <h1>Welcome to UNCHIL</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre> {/* 데이터를 JSON 형식으로 출력 */}
    </div>
  );
};

// 서버 측에서 데이터를 미리 가져오는 함수
export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch('https://api.example.com/data'); // API 호출
  const data = await res.json(); // JSON 데이터 파싱

  return {
    props: {
      data, // 페이지에 전달할 데이터
    },
  };
};

export default HomePage; // HomePage 컴포넌트를 기본 내보내기로 설정
