import Table, { DTableHeader } from '../../components/Table/Table';
import { useCustomerPurchases } from '../../hooks/useCustomerPurchases';
import useStore from '../../store/store';
import s from './DetailPage.module.scss';
import dayjs from 'dayjs';
import { useEffect, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';

function DetailPage() {
  const { id } = useParams();
  const { info } = useStore();

  const { data, isLoading, isError, error } = useCustomerPurchases(Number(id));

  useEffect(() => {
    if (isError && error?.message) {
      alert(error.message);
    }
  }, [isError, error]);

  if (isLoading) return <div>로딩 중...</div>;
  if (!data || data.length === 0) return <div>데이터 없음</div>;

  const headers: DTableHeader[] = [
    { key: 'date', name: '구매일' },
    { key: 'imgSrc', name: '제품이미지' },
    { key: 'product', name: '상품명' },
    { key: 'price', name: '가격' },
    { key: 'quantity', name: '수량' },
  ];

  const rows = useMemo(
    () =>
      (data ?? []).map(
        (item): Record<string, React.ReactNode> => ({
          ...item,
          date: dayjs(item.date).format('YYYY.MM.DD'),
          imgSrc: <img className={s.Thumbnail} src={item.imgSrc} />,
          price: `${item.price.toLocaleString()}원`,
          quantity: `${item.quantity.toLocaleString()}개`,
        }),
      ),
    [data],
  );

  return (
    <div className={s.DetailPage}>
      <h2 className={s.Title}>{info?.name}의 구매내역</h2>

      <Table headers={headers} items={rows} />

      <div className="flex gap-x-5">
        <Link to="/">메인페이지로 이동</Link>
        <Link to="/list">고객 리스트로 이동</Link>
      </div>
    </div>
  );
}

export default DetailPage;
