import Button from '@/components/button/Button';
import { Orden } from '@/interface/attencion';
import React from 'react';

interface OrderCreateProps {
  idTable: string;
  onClose: () => void;
}

const OrderCreate: React.FC<OrderCreateProps> = ({ onClose, idTable }) => {
  const handleConfirmation = () => {
    // Obtiene las órdenes del localStorage
    let ordenes: Orden[] = JSON.parse(localStorage.getItem('ordenes') || '[]');
    
    // Filtra las órdenes que pertenecen al idTable actual
    ordenes = ordenes.filter(orden => orden.idTable !== idTable);
    
    // Guarda las nuevas órdenes en el localStorage
    localStorage.setItem('ordenes', JSON.stringify(ordenes));

    // Obtiene la variable attentionPeople del localStorage
    let attentionPeople = JSON.parse(localStorage.getItem('attentionPeople') || '[]');

    // Busca el objeto con el idTable actual y actualiza su numPersons a 0
    attentionPeople = attentionPeople.map((item:any) => {
      if (item.idTable === idTable) {
        return { ...item, numPersons: 0 };
      }
      return item;
    });

    // Guarda la variable attentionPeople actualizada en el localStorage
    localStorage.setItem('attentionPeople', JSON.stringify(attentionPeople));
    
    // Cierra el componente
    onClose();
  };

  return (
    <div className='flex flex-col mt-2'>
      <h2 className='text-green-600 font-bold'>Cancelar Pedido</h2>
      <p>¿Está seguro que desea confirmar pedido?</p>
      <div className='flex gap-2 justify-end mt-10'>
        <Button className='bg-primary hover:bg-red-900 px-5 py-2 w-12 flex justify-center text-base font-semibold text-white rounded-lg' onClick={handleConfirmation}>SI</Button>
        <Button className='bg-primary hover:bg-red-900 px-5 py-2 w-12 flex justify-center text-base font-semibold text-white rounded-lg' onClick={onClose}>NO</Button>
      </div>
    </div>
  );
};

export default OrderCreate;