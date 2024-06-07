import React, { useState } from 'react';

interface Order {
  idOrder: number;
  fecha: string;
  total: number;
  OrdersDishes: {
    idOrderDish: number;
    idDish: number;
    count: number;
    comment: string;
    price: number;
    Dishes: {
      idDish: number;
      name: string;
      price: number;
      urlImagen: string | null;
      description: string | null;
      idCategory: number;
      active: boolean;
    };
  }[];
}

interface OrderListProps {
  orders: Order[];
  loading: boolean;
}

const OrderList: React.FC<OrderListProps> = ({ orders, loading }) => {
  const [expandedOrder, setExpandedOrder] = useState<number | null>(null);

  const toggleOrderDetail = (orderId: number) => {
    if (expandedOrder === orderId) {
      setExpandedOrder(null);
    } else {
      setExpandedOrder(orderId);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 mt-28 text-center">
        <div className='flex justify-center mt-32'>
          <span className="loader"></span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 mt-24">
      <h2 className="text-2xl font-semibold mb-4">Lista de Órdenes</h2>
      <ul>
        {orders.map((order, index) => (
          <li key={order.idOrder} className="mb-4">
            <div className="border-b pb-2">
              <div className="flex justify-between items-center">
                <div>
                  <span className='mr-2 font-bold'>Pedido #{index + 1}</span>
                  <span className="font-semibold">Fecha:</span> {order.fecha}
                </div>
                <div>
                  <span className="font-semibold">Total:</span> S/ {order.total}.00
                </div>
                <button
                  onClick={() => toggleOrderDetail(order.idOrder)}
                  className="px-2 py-1 bg-green-600 text-white rounded hover:bg-green-800 focus:outline-none"
                >
                  {expandedOrder === order.idOrder ? 'Cerrar Detalle' : 'Detalle'}
                </button>
              </div>
              {expandedOrder === order.idOrder && (
                <div className="mt-2">
                  <h4 className="text-lg font-semibold ">Detalle:</h4>
                  <ul>
                    {order.OrdersDishes.map((orderDish) => (
                      <div key={orderDish.idOrderDish} className="flex justify-between border-t border-gray-200 py-2">
                        <span>{orderDish.Dishes.name}</span>
                        <span>Cant: {orderDish.count}</span>
                        <span>Precio: {orderDish.price}</span>
                        <span>SubTotal: {Number(orderDish.price) * Number(orderDish.count)}.00</span>
                      </div>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderList;