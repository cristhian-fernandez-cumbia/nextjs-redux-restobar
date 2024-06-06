import Button from '@/components/button/Button'
import React from 'react'

interface AttentionMessageProps {
  onClose: () => void;
}

const AttentionMessage: React.FC<AttentionMessageProps> = ({ onClose }) => {
  return (
    <div className='flex flex-col mt-2'>
    <h2 className='text-red-600 font-bold text-xl mb-2'>Mensaje Error</h2>
    <p className='text-black'>Para crear un pedido necesita seleccionar una cantidad de personas o seleccionar platos al pedido</p>
    <div className='flex gap-2 justify-end mt-5'>
      <Button className='bg-primary hover:bg-red-900 px-5 py-2 flex justify-center text-base font-semibold text-white rounded-lg' onClick={onClose}>CERRAR</Button>
    </div>
  </div>
  )
}

export default AttentionMessage