import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="flex flex-col gap-y-4">
      <Link to="chart">구매 빈도 차트</Link>
      <Link to="list">고객 리스트</Link>
    </div>
  );
}

export default HomePage;
