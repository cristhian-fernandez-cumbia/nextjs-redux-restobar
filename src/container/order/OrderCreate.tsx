import React, { useState } from 'react';
import Button from '@/components/button/Button';
import { Orden } from '@/interface/attencion';
import { formatDate } from '@/utils/functions';

interface OrderCreateProps {
  idTable: string;
  onClose: () => void;
  priceTotal: number;
  onUpdateOrders: () => void;
}

const OrderCreate: React.FC<OrderCreateProps> = ({ onClose, idTable, priceTotal, onUpdateOrders }) => {
  const [paymentOption, setPaymentOption] = useState<'tarjeta' | 'yape/plin' | 'efectivo'>('efectivo');
  const [orderType, setOrderType] = useState<'En Restobar' | 'Delivery'>('En Restobar');
  const [numTapers, setNumTapers] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isOrderGenerated, setIsOrderGenerated] = useState(false);

  const handleConfirmation = async () => {
    setIsLoading(true);

    let pedidos: Orden[] = JSON.parse(localStorage.getItem('pedidos') || '[]');
    const pedidosFiltrados = pedidos.filter(pedido => pedido.idTable === idTable);

    let attentionPeople = JSON.parse(localStorage.getItem('attentionPeople') || '[]');
    const tableInfo = attentionPeople.find((item: any) => item.idTable === idTable);
    const numPersons = tableInfo ? tableInfo.numPersons : 0;

    const orderData = {
      idTable: Number(idTable),
      numPersons: numPersons,
      paymentType: paymentOption,
      orderType: orderType,
      fecha: formatDate(new Date()),
      total: parseFloat(getTotalPrice()),
      status: 'CLOSE',
      active: true,
      dishes: pedidosFiltrados.map((pedido) => ({
        idDish: pedido.idDish,
        count: pedido.count,
        price: pedido.price,
        comment: pedido.annotation || ''
      }))
    };

    console.log('orderData:::', orderData)

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderData)
      });

      if (response.ok) {
        pedidos = pedidos.filter(pedido => pedido.idTable !== idTable);
        localStorage.setItem('pedidos', JSON.stringify(pedidos));
        attentionPeople = attentionPeople.map((item: any) => {
          if (item.idTable === idTable) {
            return { ...item, numPersons: 0 };
          }
          return item;
        });
        localStorage.setItem('attentionPeople', JSON.stringify(attentionPeople));

        onUpdateOrders();
        setIsOrderGenerated(true);
      } else {
        console.error("Error al generar el pedido:", await response.text());
      }
    } catch (error) {
      console.error("Error al generar el pedido:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePaymentOptionChange = (option: 'tarjeta' | 'yape/plin' | 'efectivo') => {
    setPaymentOption(option);
  };

  const handleOrderTypeChange = (type: 'En Restobar' | 'Delivery') => {
    setOrderType(type);
    if (type === 'En Restobar') {
      setNumTapers(0);
    }
  };

  const handleIncrementTapers = () => {
    setNumTapers(numTapers + 1);
  };

  const handleDecrementTapers = () => {
    if (numTapers > 0) {
      setNumTapers(numTapers - 1);
    }
  };

  const getCommissionAmount = () => {
    if (paymentOption === 'tarjeta') {
      if (priceTotal > 0 && priceTotal < 30) return 2.50;
      if (priceTotal >= 30 && priceTotal < 50) return 2.50;
      if (priceTotal >= 50 && priceTotal < 100) return 3.00;
      if (priceTotal >= 100) return 5.00;
    }
    return 0;
  };

  const getTotalPrice = () => {
    const commission = getCommissionAmount();
    const taperCost = numTapers * 1;
    return (priceTotal + commission + taperCost).toFixed(2);
  };

  const getCommission = () => {
    const commission = getCommissionAmount();
    return commission === 0 ? '(S/ 0.00 Comisión)' : `(S/ ${commission.toFixed(2)} Comisión)`;
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
          className={`px-5 py-2 rounded-lg ${paymentOption === 'yape/plin' ? 'bg-orange-500 text-white' : 'bg-gray-200'}`}
          onClick={() => handlePaymentOptionChange('yape/plin')}
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
      <p>Seleccione el tipo de pedido</p>
      <div className='flex gap-2 mb-4'>
        <Button
          className={`px-5 py-2 rounded-lg ${orderType === 'En Restobar' ? 'bg-orange-500 text-white' : 'bg-gray-200'}`}
          onClick={() => handleOrderTypeChange('En Restobar')}
        >
          En Restobar
        </Button>
        <Button
          className={`px-5 py-2 rounded-lg ${orderType === 'Delivery' ? 'bg-orange-500 text-white' : 'bg-gray-200'}`}
          onClick={() => handleOrderTypeChange('Delivery')}
        >
          Delivery
        </Button>
      </div>
      {orderType === 'Delivery' && (
        <div className='flex items-center gap-2 mb-4'>
          <p>Tapers:</p>
          <Button
            className='bg-green-600 rounded-md font-bold text-2xl text-white w-8 h-8 flex justify-center items-center'
            onClick={handleDecrementTapers}
            disabled={numTapers === 0}
          >
            -
          </Button>
          <span>{numTapers}</span>
          <Button
            className=' bg-red-600 rounded-md font-bold text-2xl text-white w-8 h-8 flex justify-center items-center'
            onClick={handleIncrementTapers}
          >
            +
          </Button>
          <p>(S/ {numTapers})</p>
        </div>
      )}
      <p>¿Está seguro que desea confirmar pedido?</p>
      <p className='mt-4 font-bold'>Total a pagar:</p>
      <p className=''>
        S/{priceTotal.toFixed(2)} + {getCommission()} + {orderType === 'Delivery' && `S/ ${numTapers.toFixed(2)} (Tapers)`} = <span className='font-bold text-xl'>S/{getTotalPrice()}</span>
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