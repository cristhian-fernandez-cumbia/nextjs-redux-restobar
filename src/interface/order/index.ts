interface Dish {
  idDish: number;
  name: string;
  price: number;
  urlImagen: string | null;
  description: string | null;
  idCategory: number;
  active: boolean;
}

interface OrderDish {
  idOrderDish: number;
  idOrder: number;
  idDish: number;
  count: number;
  price: number;
  comment: string;
  Dishes: Dish;
}

interface Order {
  idOrder: number;
  idTable: number;
  fecha: string;
  total: number;
  numPersons: number;
  paymentType: string;
  orderType: string;
  status: string;
  active: boolean;
  OrdersDishes: OrderDish[];
}

export interface OrderItem {
  idPedido: number;
  fecha: string;
  dish: string;
  price: number;
  count: number;
  total: number;
  paymentType: string;
  idTable: number;
  numPersons: number;
}

export interface OrderListProps {
  orders: Order[];
  loading: boolean;
}

export interface OrderReportProps {
  orders: Order[];
}