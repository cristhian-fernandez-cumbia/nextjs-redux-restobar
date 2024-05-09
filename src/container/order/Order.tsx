'use client'
import React, { useState } from 'react'
import OrderCard from './OrderCard'
import { usePathname, useRouter } from 'next/navigation';
import { Orden } from '@/interface/attencion';
import HeaderAttention from '@/components/header/HeaderAttention';
import Modal from '@/components/modal/Modal';
import OrderCreate from './OrderCreate';

const Order = () => {
  // const [priceTotal, setPriceTotal] = useState<Number>(0);
  const [isCreateOrderModalOpen, setCreateOrderModalOpen] = useState(false);
  const pathname = usePathname();
  // const router = useRouter();
  const idTable = pathname.split('/').pop() || '0';
  const ordenes: Orden[] = JSON.parse(localStorage.getItem('ordenes') || '[]');
  
  const filteredOrdenes: Orden[] = ordenes.filter((orden:Orden) => orden.idTable === idTable);

  const priceTotal = filteredOrdenes.reduce((total: number, orden: Orden) => {
    return total + (Number(orden.count) * Number(orden.price));
  }, 0);

  const handleCancelOrder = async () => {
    // console.log(filteredOrdenes);
    try {
      // Llamar a la API para guardar la orden
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(filteredOrdenes)
      });
      if (response.ok) {
        // Redireccionar a la página principal después de guardar la orden
        // router.push('/');
      } else {
        console.error('Error al guardar la orden:', response.statusText);
      }
    } catch (error) {
      console.error('Error al guardar la orden:', error);
    }
  };

  const openCreateOrderModal = () => {
    setCreateOrderModalOpen(true);
  };

  const closeCreateOrdereModal = () => {
    setCreateOrderModalOpen(false);
  };

  return (
    <>
      <div className='px-6 mb-24 mt-20'>
        <HeaderAttention text={'Pedido'}/>
        <div className='flex items-center justify-between mb-[6px]'>
          <h1 className='text-center  text-2xl font-medium'>Mesa N°{idTable}</h1>
        </div>
        {filteredOrdenes.map((orden: Orden, index: number) => (
          <OrderCard key={`${orden.idDish}-${index}`} orden={orden} />
        ))}
        <div className='flex flex-row justify-between border-t-2 border-gray-500 py-3 px-6 mt-4'>
          <p className='text-3xl'>Total</p>
          <div className='font-bold'>
            <span className='text-2xl'>{priceTotal.toFixed(2)}</span>
            <span className='text-xs'>.00</span>
          </div>
        </div>
        <button 
          type="button" 
          className='bg-green-700 text-white w-full py-4 rounded-lg cursor-pointer hover:bg-green-600'
          // onClick={handleCancelOrder}
          onClick={openCreateOrderModal}
        >Cancelar Pedido</button>
      </div>
      <Modal isOpen={isCreateOrderModalOpen} onClose={closeCreateOrdereModal}>
        <OrderCreate  onClose={closeCreateOrdereModal} idTable={idTable}/>
      </Modal>
    </>
  )
}

export default Order