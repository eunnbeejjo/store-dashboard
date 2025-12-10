// DTable.tsx
// import s from './DTable.module.scss';
import SortIcons from './SortIcons';
import classNames from 'classNames';
import { ReactNode } from 'react';

// 정렬 type
export const OrderDirectionTypeEnum = {
  asc: 'ASC',
  desc: 'DESC',
} as const;

export type OrderDirectionTypeEnum =
  (typeof OrderDirectionTypeEnum)[keyof typeof OrderDirectionTypeEnum];

export interface DTableHeader {
  name: ReactNode;
  key: string;
  width?: number;
  minWidth?: number;
  sortColumn?: boolean;
  alignRight?: boolean;
}

export interface DTableProps {
  headers: DTableHeader[];
  items?: Record<string, ReactNode>[];
  onClickRow?: (item: any) => void;
  sortDirection?: OrderDirectionTypeEnum | null;
  onSortChange?: (orderDirection: OrderDirectionTypeEnum) => void;
}

const Table = ({
  headers,
  items = [],
  onClickRow,
  sortDirection,
  onSortChange,
}: DTableProps) => {
  const handleRequestSort = () => {
    if (!onSortChange) return;

    const nextDirection =
      sortDirection === OrderDirectionTypeEnum.asc
        ? OrderDirectionTypeEnum.desc
        : OrderDirectionTypeEnum.asc;

    onSortChange(nextDirection);
  };

  return (
    <div className="relative flex flex-col flex-1 h-full bg-white border-b-[1px] border-b-gray-6">
      <div className="overflow-auto h-full flex flex-col flex-1">
        <table style={{ width: '100%', height: 'auto', whiteSpace: 'nowrap' }}>
          <thead>
            <tr>
              {headers.map((header) => (
                <th
                  key={header.key}
                  style={{
                    width: header.width,
                    minWidth: header.minWidth ?? header.width,
                    maxWidth: header.width,
                    textAlign: header.alignRight ? 'right' : 'unset',
                  }}
                >
                  {header.sortColumn ? (
                    <div
                      className={classNames(
                        'flex flex-row gap-[10px] items-center cursor-pointer',
                        { 'justify-end': header.alignRight },
                      )}
                      onClick={handleRequestSort}
                    >
                      {header.name}
                      <div className="flex flex-col">
                        {sortDirection === OrderDirectionTypeEnum.asc ? (
                          <SortIcons.SortAsc />
                        ) : sortDirection === OrderDirectionTypeEnum.desc ? (
                          <SortIcons.SortDesc />
                        ) : (
                          <SortIcons.SortDefault />
                        )}
                      </div>
                    </div>
                  ) : (
                    header.name
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr
                key={index}
                onClick={() => onClickRow?.(item)}
                className="cursor-pointer"
              >
                {headers.map((header) => (
                  <td
                    key={header.key}
                    style={{
                      maxWidth: header.width,
                      textAlign: header.alignRight ? 'right' : 'unset',
                      padding: '8px 4px',
                    }}
                  >
                    {item[header.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

Table.displayName = 'Table';

export default Table;
