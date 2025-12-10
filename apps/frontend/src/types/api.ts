export interface Purchase {
  count: number;
  range: string;
}

export interface Customer {
  id: string;
  name: string;
  count: number | string;
  totalAmount: number | string;
}
