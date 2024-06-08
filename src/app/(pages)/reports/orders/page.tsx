'use client'
import { useState, useEffect } from 'react';
import OrderFilter from '@/container/reports/orders/OrderFilter';
import OrderList from '@/container/reports/orders/OrderList';
import Header from '@/components/header/Header';
import OrderReport from '@/container/reports/orders/OrderReportExcel';
import { formatDatecurrent } from '@/utils/functions';

const OrdersPage: React.FC = () => {
  const [startDate, setStartDate] = useState(formatDatecurrent(new Date()));
  const [endDate, setEndDate] = useState(formatDatecurrent(new Date()));
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleStartDateChange = (date: string) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date: string) => {
    setEndDate(date);
  };

  const handleFilter = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/orders?startDate=${startDate}&endDate=${endDate}`);
      if (response.ok) {
        const data = await response.json();
        setOrders(data);
      } else {
        console.error('Error al obtener órdenes:', response.statusText);
      }
    } catch (error) {
      console.error('Error al obtener órdenes:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`/api/orders?startDate=${startDate}&endDate=${endDate}`);
        if (response.ok) {
          const data = await response.json();
          // console.log('data::', data)
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
      <Header/>
      <div className="container mx-auto px-4 mt-24">
        <div className='flex flex-row justify-between items-center mb-2'>
          <h2 className="text-2xl font-semibold mb-4">Lista de Órdenes</h2>
          <OrderReport orders={orders} />
        </div>
        <OrderFilter
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={handleStartDateChange}
          onEndDateChange={handleEndDateChange}
          onFilter={handleFilter}
        />
      </div>
      <OrderList orders={orders} loading={loading} />
    </div>
  );
};

export default OrdersPage;