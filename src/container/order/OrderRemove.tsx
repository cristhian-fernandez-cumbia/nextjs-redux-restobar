import Button from '@/components/button/Button';
import React from 'react'

interface OrderRemoveProps {
  handleDelete: () => void;
  onClose: () => void;
}

const OrderRemove: React.FC<OrderRemoveProps> = ({handleDelete, onClose}) => {
  return (
    <div className='flex flex-col mt-2'>
      <h2 className='text-green-600 font-bold'>Eliminar Plato del Pedido</h2>
      <p>¿Está seguro que desea eliminar este plato del Pedido?</p>
      <div className='flex gap-2 justify-end mt-10'>
        <Button className='bg-primary hover:bg-red-900 px-5 py-2 w-12 flex justify-center text-base font-semibold text-white rounded-lg' onClick={handleDelete}>SI</Button>
        <Button className='bg-primary hover:bg-red-900 px-5 py-2 w-12 flex justify-center text-base font-semibold text-white rounded-lg' onClick={onClose}>NO</Button>
      </div>
    </div>
  )
}

export default OrderRemove