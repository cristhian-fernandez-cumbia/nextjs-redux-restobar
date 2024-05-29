import React, { useState, useEffect } from 'react';
import Button from '@/components/button/Button';
import { Orden } from '@/interface/attencion';
import { OrderIcon } from '@/assets/icons';

interface AttentionCreateProps {
  idTable: string;
  onClose: () => void;
  onUpdateOrders: () => void; // Añadir esta línea
}

const AttentionCreate: React.FC<AttentionCreateProps> = ({ onClose, idTable, onUpdateOrders }) => {
  const [existingOrder, setExistingOrder] = useState<Orden | null>(null);
  const [orders, setOrders] = useState<Orden[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExistingOrder = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/orders?idtable=${idTable}`);
        const data = await response.json();
        if (data && !data.error) {
          setExistingOrder(data);
        }
      } catch (error) {
        console.error('Error al obtener la orden:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchExistingOrder();
  }, [idTable]);

  useEffect(() => {
    const fetchOrders = () => {
      try {
        const ordersStr = localStorage.getItem('ordenes');
        if (ordersStr) {
          const parsedOrders = JSON.parse(ordersStr);
          const filteredOrders = parsedOrders.filter((order: Orden) => order.idTable === idTable);
          setOrders(filteredOrders);
        }
      } catch (error) {
        console.error('Error al obtener las órdenes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [idTable]);

  // const handleConfirmation = () => {
  //   try {
  //     const existingOrdersStr = localStorage.getItem('pedidos');
  //     const existingOrders = existingOrdersStr ? JSON.parse(existingOrdersStr) : [];
  //     const updatedOrders = [...existingOrders, ...orders];
  //     localStorage.setItem('pedidos', JSON.stringify(updatedOrders));

  //     const ordersStr = localStorage.getItem('ordenes');
  //     if (ordersStr) {
  //       const parsedOrders = JSON.parse(ordersStr);
  //       const remainingOrders = parsedOrders.filter((order: Orden) => order.idTable !== idTable);
  //       localStorage.setItem('ordenes', JSON.stringify(remainingOrders));
  //     }

  //     onUpdateOrders();

  //     onClose();
  //   } catch (error) {
  //     console.error('Error al manejar la confirmación:', error);
  //   }
  // };

  const handleConfirmation = () => {
    try {
      const existingOrdersStr = localStorage.getItem('pedidos');
      const existingOrders = existingOrdersStr ? JSON.parse(existingOrdersStr) : [];
      const updatedOrders = orders.reduce((acc, order) => {
        const existingOrderIndex = acc.findIndex(o => o.idDish === order.idDish && o.idTable === order.idTable);
        if (existingOrderIndex !== -1) {
          acc[existingOrderIndex].count += order.count;
        } else {
          acc.push(order);
        }
        return acc;
      }, [...existingOrders]);

      localStorage.setItem('pedidos', JSON.stringify(updatedOrders));

      const ordersStr = localStorage.getItem('ordenes');
      if (ordersStr) {
        const parsedOrders = JSON.parse(ordersStr);
        const remainingOrders = parsedOrders.filter((order: Orden) => order.idTable !== idTable);
        localStorage.setItem('ordenes', JSON.stringify(remainingOrders));
      }

      onUpdateOrders();
      onClose();
    } catch (error) {
      console.error('Error al manejar la confirmación:', error);
    }
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (existingOrder) {
    return (
      <div className='flex flex-col mt-2'>
        <h2 className='text-green-600 font-bold'>Actualizar Pedido en la Mesa N°{idTable}</h2>
        <p>Hay un pedido pendiente en esta mesa N°{idTable} con lo siguiente:</p>
        <div className='flex gap-2 justify-end mt-10'>
          <Button className='bg-primary hover:bg-red-900 px-5 py-2 w-12 flex justify-center text-base font-semibold text-white rounded-lg' onClick={handleConfirmation}>SI</Button>
          <Button className='bg-primary hover:bg-red-900 px-5 py-2 w-12 flex justify-center text-base font-semibold text-white rounded-lg' onClick={onClose}>NO</Button>
        </div>
      </div>
    );
  } else {
    return (
      <div className='flex flex-col mt-2'>
        <h2 className='text-green-600 font-bold'>Crear Pedido en la Mesa N°{idTable}</h2>
        <p>Crea un nuevo pedido en esta mesa N°{idTable} con lo siguientes plato(s):</p>
        {orders.length > 0 && (
          <div>
            <ul>
              {orders.map((order, index) => (
                <li key={index} className='flex items-center'>
                  <OrderIcon className='inline w-4 h-4'/><span className=' text-green-600 font-bold mx-1'>( {order.count} )</span>{order.name} 
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className='flex gap-2 justify-end mt-10'>
          <Button className='bg-green-500 hover:bg-green-700 px-5 py-2 w-12 flex justify-center text-base font-semibold text-white rounded-lg' onClick={handleConfirmation}>SI</Button>
          <Button className='bg-primary hover:bg-red-900 px-5 py-2 w-12 flex justify-center text-base font-semibold text-white rounded-lg' onClick={onClose}>NO</Button>
        </div>
      </div>
    );
  }
};

export default AttentionCreate;
