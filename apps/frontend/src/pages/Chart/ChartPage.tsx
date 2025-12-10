import BarChart from '../../components/BarChart/BarChart';
import { usePurchaseFrequency } from '../../hooks/usePurchaseFrequency';
import s from './ChartPage.module.scss';
import classNames from 'classNames';
import dayjs from 'dayjs';
import { useState } from 'react';
import DatePicker from 'react-datepicker';

interface ParamProps {
  from: Date | null;
  to: Date | null;
}

function ChartPage() {
  const [from, setFrom] = useState<Date | null>(null);
  const [to, setTo] = useState<Date | null>(null);
  const [params, setParams] = useState<ParamProps>({
    from: null,
    to: null,
  });

  const { data, isLoading, isError, error } = usePurchaseFrequency({
    from: params.from ? dayjs(params.from).format('YYYY-MM-DD') : undefined,
    to: params.to ? dayjs(params.to).format('YYYY-MM-DD') : undefined,
  });

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) alert(error?.message);
  if (!data || data.length === 0) return <div>데이터 없음</div>;

  const handleSubmit = () => {
    if ((from && to) || (!from && !to)) {
      setParams({ from, to });
    } else {
      alert('시작날짜와 종료날짜를 모두 입력해주세요');
    }
  };

  return (
    <div className={s.ChartPage}>
      <h2 className={s.Title}>가격대별 구매 빈도 차트</h2>

      <div className={s.Filters}>
        <div className={s.Filter}>
          <div className={s.Label}>시작날짜</div>
          <div className={s.DateArea}>
            <DatePicker selected={from} onChange={(date) => setFrom(date)} />
          </div>
        </div>
        -
        <div className={s.Filter}>
          <div className={s.Label}>종료날짜</div>
          <div className={s.DateArea}>
            <DatePicker selected={to} onChange={(date) => setTo(date)} />
          </div>
        </div>
        <button
          className={classNames(s.Btn, 'bg-blue-100')}
          onClick={() => {
            setFrom(null);
            setTo(null);
          }}
        >
          초기화
        </button>
        <button
          className={classNames(s.Btn, 'bg-blue-500 text-white')}
          onClick={handleSubmit}
        >
          조회
        </button>
      </div>

      <BarChart data={data} />
    </div>
  );
}

export default ChartPage;
