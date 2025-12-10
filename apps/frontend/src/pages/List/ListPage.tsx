import Table, {
  DTableHeader,
  OrderDirectionTypeEnum,
} from '../../components/Table/Table';
import { useCustomers } from '../../hooks/useCustomers';
import useStore from '../../store/store';
import s from './ListPage.module.scss';
import classNames from 'classNames';
import { useEffect, useMemo, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';

interface Props {
  name?: string;
}

function ListPage() {
  const navigate = useNavigate();

  const { setInfo } = useStore();

  const [name, setName] = useState<string>();
  const [sortDir, setSortDir] = useState<OrderDirectionTypeEnum | null>(null);
  const [params, setParams] = useState<Props>();

  const sortBy =
    sortDir === OrderDirectionTypeEnum.asc
      ? 'asc'
      : sortDir === OrderDirectionTypeEnum.desc
        ? 'desc'
        : undefined;

  const { data, isLoading, isError, error } = useCustomers({
    sortBy,
    name: params?.name,
  });

  const headers: DTableHeader[] = [
    { key: 'id', name: 'ID' },
    { key: 'name', name: '이름' },
    { key: 'count', name: '총 구매 횟수' },
    { key: 'totalAmount', name: '총 구매 금액', sortColumn: true },
  ];

  const rows = useMemo(
    () =>
      (data ?? []).map(
        (item): Record<string, React.ReactNode> => ({
          ...item,
          count: item.count.toLocaleString(),
          totalAmount: item.totalAmount.toLocaleString(),
        }),
      ),
    [data],
  );

  useEffect(() => {
    if (isError && error?.message) {
      alert(error.message);
    }
  }, [isError, error]);

  if (isLoading) return <div>로딩 중...</div>;
  if (!data || data.length === 0) return <div>데이터 없음</div>;

  const handleReset = () => {
    setSortDir(null);
    setName(undefined);
  };

  const handleSubmit = () => {
    setParams({
      name: name ?? '',
    });
  };

  return (
    <div className={s.ListPage}>
      <div className={s.Filters}>
        <div className={s.Filter}>
          <div className={s.Label}>고객이름</div>
          <div className={s.DateArea}>
            <input
              value={name ?? ''}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>
        <button
          className={classNames(s.Btn, 'bg-blue-100')}
          onClick={handleReset}
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

      <Table
        headers={headers}
        items={rows}
        sortDirection={sortDir}
        onSortChange={(orderDirection: OrderDirectionTypeEnum) => {
          setSortDir(orderDirection);
        }}
        onClickRow={(row) => {
          setInfo(row);
          navigate(`${row.id}`);
        }}
      />

      <div className="flex gap-x-5">
        <Link to="/">메인페이지로 이동</Link>
        <Link to="/chart">구매 빈도 차트 조회하러 가기</Link>
      </div>

      <Outlet />
    </div>
  );
}

export default ListPage;
