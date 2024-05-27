import React, { useState } from 'react';
import Button from '@/components/button/Button';
import { Orden } from '@/interface/attencion';

interface OrderCreateProps {
  idTable: string;
  onClose: () => void;
  priceTotal: number;
}

const OrderCreate: React.FC<OrderCreateProps> = ({ onClose, idTable, priceTotal }) => {
  const [paymentOption, setPaymentOption] = useState<'tarjeta' | 'yape' | 'efectivo'>('efectivo');

  const handleConfirmation = () => {
    // Obtiene las órdenes del localStorage
    let ordenes: Orden[] = JSON.parse(localStorage.getItem('pedidos') || '[]');
    
    // Filtra las órdenes que pertenecen al idTable actual
    ordenes = ordenes.filter(orden => orden.idTable !== idTable);
    
    // Guarda las nuevas órdenes en el localStorage
    localStorage.setItem('pedidos', JSON.stringify(ordenes));

    // Obtiene la variable attentionPeople del localStorage
    let attentionPeople = JSON.parse(localStorage.getItem('attentionPeople') || '[]');

    // Busca el objeto con el idTable actual y actualiza su numPersons a 0
    attentionPeople = attentionPeople.map((item: any) => {
      if (item.idTable === idTable) {
        return { ...item, numPersons: 0 };
      }
      return item;
    });

    // Guarda la variable attentionPeople actualizada en el localStorage
    localStorage.setItem('attentionPeople', JSON.stringify(attentionPeople));
    
    onClose();
  };

  const handlePaymentOptionChange = (option: 'tarjeta' | 'yape' | 'efectivo') => {
    setPaymentOption(option);
  };

  const getTotalPrice = () => {
    if (paymentOption === 'tarjeta') {
      return (priceTotal * 1.05).toFixed(2); 
    }
    return priceTotal.toFixed(2);
  };

  const getCommission = () => {
    if (paymentOption === 'tarjeta') {
      return '5% Comisión';
    }
    return '0% Comisión';
  };

  return (
    <div className='flex flex-col mt-2'>
      <h2 className='text-green-600 font-bold'>Cancelar Pedido</h2>
      <p>Elija la opción de pago</p>
      <div className='flex gap-2 mb-4'>
        <Button
          className={`px-5 py-2 rounded-lg ${paymentOption === 'tarjeta' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => handlePaymentOptionChange('tarjeta')}
        >
          Tarjeta
        </Button>
        <Button
          className={`px-5 py-2 rounded-lg ${paymentOption === 'yape' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => handlePaymentOptionChange('yape')}
        >
          Yape / Plin
        </Button>
        <Button
          className={`px-5 py-2 rounded-lg ${paymentOption === 'efectivo' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
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
        <Button className='bg-green-500 hover:bg-green-700 px-5 py-2 w-12 flex justify-center text-base font-semibold text-white rounded-lg' onClick={handleConfirmation}>Generar Pedido</Button>
        <Button className='bg-primary hover:bg-red-900 px-5 py-2 w-12 flex justify-center text-base font-semibold text-white rounded-lg' onClick={onClose}>NO</Button>
      </div>
    </div>
  );
};

export default OrderCreate;