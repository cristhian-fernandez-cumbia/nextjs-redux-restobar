'use client'
import { useState, useEffect } from 'react';
import OrderFilter from '@/container/reports/orders/OrderFilter';
import OrderList from '@/container/reports/orders/OrderList';
import Header from '@/components/header/Header';

const OrdersPage: React.FC = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // const handleStartDateChange = (date: string) => {
  //   setStartDate(date);
  // };

  // const handleEndDateChange = (date: string) => {
  //   setEndDate(date);
  // };

  // const handleFilter = async () => {
  //   try {
  //     const response = await fetch(`/api/orders?date=${startDate}`);
  //     if (response.ok) {
  //       const data = await response.json();
  //       setOrders(data);
  //     } else {
  //       console.error('Error al obtener órdenes:', response.statusText);
  //     }
  //   } catch (error) {
  //     console.error('Error al obtener órdenes:', error);
  //   }
  // };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`/api/orders`);
        if (response.ok) {
          const data = await response.json();
          console.log('data::', data)
          setOrders(data);
          setLoading(false);
        } else {
          console.error('Error al obtener órdenes:', response.statusText);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error al obtener órdenes:', error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div>
      {/* <OrderFilter
        startDate={startDate}
        endDate={endDate}
        onStartDateChange={handleStartDateChange}
        onEndDateChange={handleEndDateChange}
        onFilter={handleFilter}
      /> */}
      <Header/>
      <OrderList orders={orders} loading={loading} />
    </div>
  );
};

export default OrdersPage;