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

export interface Detail {
  date: string;
  quantity: number;
  product: string;
  price: number;
  imgSrc: string;
}
