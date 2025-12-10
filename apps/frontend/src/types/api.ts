export interface Purchase {
  count: number;
  range: string;
}

export interface Customer {
  id: string;
  name: string;
  totalAmount: number;
  // 필요하면 더 필드 추가
}
