import React, { useState } from 'react';
import Button from '@/components/button/Button';
import { Orden } from '@/interface/attencion';

interface OrderCreateProps {
  idTable: string;
  onClose: () => void;
  priceTotal: number;
  onUpdateOrders: () => void;
}

const OrderCreate: React.FC<OrderCreateProps> = ({ onClose, idTable, priceTotal, onUpdateOrders }) => {
  const [paymentOption, setPaymentOption] = useState<'tarjeta' | 'yape' | 'efectivo'>('efectivo');
  const [isLoading, setIsLoading] = useState(false);
  const [isOrderGenerated, setIsOrderGenerated] = useState(false);

  const handleConfirmation = () => {
    setIsLoading(true);
    setTimeout(() => {
      let pedidos: Orden[] = JSON.parse(localStorage.getItem('pedidos') || '[]');
      pedidos = pedidos.filter(pedido => pedido.idTable !== idTable);
      localStorage.setItem('pedidos', JSON.stringify(pedidos));
      let attentionPeople = JSON.parse(localStorage.getItem('attentionPeople') || '[]');
      attentionPeople = attentionPeople.map((item: any) => {
        if (item.idTable === idTable) {
          return { ...item, numPersons: 0 };
        }
        return item;
      });
      localStorage.setItem('attentionPeople', JSON.stringify(attentionPeople));
      
      onUpdateOrders(); 
      setIsLoading(false);
      setIsOrderGenerated(true);
    }, 2000);
  };

  // const handleConfirmation = async () => {
  //   setIsLoading(true);

  //   let pedidos: Orden[] = JSON.parse(localStorage.getItem('pedidos') || '[]');
  //   const pedidosFiltrados = pedidos.filter(pedido => pedido.idTable === idTable);

  //   let attentionPeople = JSON.parse(localStorage.getItem('attentionPeople') || '[]');
  //   const tableInfo = attentionPeople.find((item: any) => item.idTable === idTable);
  //   const numPersons = tableInfo ? tableInfo.numPersons : 0;

  //   const orderData = {
  //     idTable: Number(idTable),
  //     numPersons: numPersons,
  //     paymentType: paymentOption,
  //     orderType: paymentOption,
  //     fecha: new Date(),
  //     total: parseFloat(getTotalPrice()),
  //     status: 'OPEN',
  //     active: true,
  //     dishes: pedidosFiltrados.map((pedido) => ({
  //       idDish: pedido.idDish,
  //       count: pedido.count,
  //       price: pedido.price,
  //       comment: pedido.annotation || ''
  //     }))
  //   };

  //   console.log('orderData:::', orderData)

  //   try {
  //     const response = await fetch('/api/orders', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify(orderData)
  //     });

  //     if (response.ok) {
  //       // Eliminar los pedidos locales y actualizar el estado
  //       pedidos = pedidos.filter(pedido => pedido.idTable !== idTable);
  //       localStorage.setItem('pedidos', JSON.stringify(pedidos));
  //       attentionPeople = attentionPeople.map((item: any) => {
  //         if (item.idTable === idTable) {
  //           return { ...item, numPersons: 0 };
  //         }
  //         return item;
  //       });
  //       localStorage.setItem('attentionPeople', JSON.stringify(attentionPeople));

  //       onUpdateOrders();
  //       setIsOrderGenerated(true);
  //     } else {
  //       console.error("Error al generar el pedido:", await response.text());
  //     }
  //   } catch (error) {
  //     console.error("Error al generar el pedido:", error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const handlePaymentOptionChange = (option: 'tarjeta' | 'yape' | 'efectivo') => {
    setPaymentOption(option);
  };

  const getCommissionAmount = () => {
    if (paymentOption === 'tarjeta') {
      if (priceTotal >= 0 && priceTotal < 30) return 0;
      if (priceTotal >= 30 && priceTotal < 50) return 2.50;
      if (priceTotal >= 50 && priceTotal < 100) return 3.00;
      if (priceTotal >= 100) return 5.00;
    }
    return 0;
  };

  const getTotalPrice = () => {
    const commission = getCommissionAmount();
    return (priceTotal + commission).toFixed(2);
  };

  const getCommission = () => {
    const commission = getCommissionAmount();
    return commission === 0 ? '(S/ 0.00 Comisión)': `(S/ ${commission.toFixed(2)} Comisión)`;
  };

  if (isOrderGenerated) {
    return (
      <div className='flex flex-col mt-2'>
        <h2 className='text-green-600 font-bold'>Pedido generado con éxito</h2>
        <div className='flex justify-end mt-10'>
          <Button className='bg-primary hover:bg-red-900 px-5 py-2 flex justify-center text-base font-semibold text-white rounded-lg' onClick={onClose}>Cerrar</Button>
        </div>
      </div>
    );
  }

  return (
    <div className='flex flex-col mt-2 text-black'>
      <h2 className='text-green-600 font-bold'>Cancelar Pedido</h2>
      <p>Elija la opción de pago</p>
      <div className='flex gap-2 mb-4'>
        <Button
          className={`px-5 py-2 rounded-lg ${paymentOption === 'tarjeta' ? 'bg-orange-500 text-white' : 'bg-gray-200'}`}
          onClick={() => handlePaymentOptionChange('tarjeta')}
        >
          Tarjeta
        </Button>
        <Button
          className={`px-5 py-2 rounded-lg ${paymentOption === 'yape' ? 'bg-orange-500 text-white' : 'bg-gray-200'}`}
          onClick={() => handlePaymentOptionChange('yape')}
        >
          Yape / Plin
        </Button>
        <Button
          className={`px-5 py-2 rounded-lg ${paymentOption === 'efectivo' ? 'bg-orange-500 text-white' : 'bg-gray-200'}`}
          onClick={() => handlePaymentOptionChange('efectivo')}
        >
          Efectivo
        </Button>
      </div>
      <p>¿Está seguro que desea confirmar pedido?</p>
      <p className='mt-4 font-bold'>Total a pagar:</p>
      <p className=''>
        S/{priceTotal.toFixed(2)} + {getCommission()} = <span className='font-bold text-xl'>S/{getTotalPrice()}</span>
      </p>
      <div className='flex gap-2 justify-end mt-10'>
        <Button 
          className='bg-green-500 hover:bg-green-700 px-5 py-2 flex justify-center text-base font-semibold text-white rounded-lg'
          onClick={handleConfirmation}
          disabled={isLoading}
        >
          {isLoading ? 'Generando...' : 'Generar Pedido'}
        </Button>
        <Button 
          className='bg-primary hover:bg-red-900 px-5 py-2 w-12 flex justify-center text-base font-semibold text-white rounded-lg' 
          onClick={onClose}
          disabled={isLoading}
        >
          NO
        </Button>
      </div>
    </div>
  );
};

export default OrderCreate;