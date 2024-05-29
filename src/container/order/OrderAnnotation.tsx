import React, { useState } from 'react';
import { Clock } from '@/assets/icons';
import Button from '@/components/button/Button';

interface OrderAnnotationProps {
  onClose: () => void;
  comment: string;
}

const OrderAnnotation: React.FC<OrderAnnotationProps> = ({ onClose, comment }) => {
  const currentDate = new Date().toLocaleDateString();

  return (
    <div className='flex flex-col mt-2'>
      <h2 className='text-green-600 font-bold'>Agregar Comentario</h2>
      <textarea
        className='border border-green-600 rounded-lg p-4 mt-2 outline-none bg-gray-300 text-gray-700'
        placeholder='Escribe un comentario aquí...'
        rows={4}
        value={comment}
        disabled
      ></textarea>
      <div className='flex items-center mt-2'>
        <Clock className='h-3' />
        <p className='text-xs font-semibold text-gray-500 relative top-[1px]'>{currentDate}</p>
      </div>
      <Button
        className='bg-red-600 hover:bg-red-800 text-white px-3 py-2 mt-2 rounded '
        onClick={onClose}
      >
        Cerrar
      </Button>
    </div>
  );
};

export default OrderAnnotation;