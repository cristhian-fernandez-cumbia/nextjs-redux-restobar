'use client'
import React, { useState, useEffect } from 'react'
import OrderCard from './OrderCard'
import { usePathname } from 'next/navigation';
import { Orden } from '@/interface/attencion';
import HeaderAttention from '@/components/header/HeaderAttention';
import Modal from '@/components/modal/Modal';
import OrderCreate from './OrderCreate';
import Button from '@/components/button/Button';
import OrderWhatsapp from './OrderWhatsapp';

const Order = () => {
  const [isCreateOrderModalOpen, setCreateOrderModalOpen] = useState(false);
  const [isModalWhatsapp, setModalWhatsapp] = useState(false);
  const [ordenes, setOrdenes] = useState<Orden[]>([]);
  const pathname = usePathname();
  const idTable = pathname.split('/').pop() || '0';

  useEffect(() => {
    const storedOrders = localStorage.getItem('pedidos');
    if (storedOrders) {
      setOrdenes(JSON.parse(storedOrders));
    }
  }, []);

  const filteredOrdenes: Orden[] = ordenes.filter((orden: Orden) => orden.idTable === idTable);

  const priceTotal = filteredOrdenes.reduce((total: number, orden: Orden) => {
    return total + (Number(orden.count) * Number(orden.price));
  }, 0);

  const openCreateOrderModal = () => {
    setCreateOrderModalOpen(true);
  };

  const closeCreateOrdereModal = () => {
    setCreateOrderModalOpen(false);
  };

  const openModalWhatsapp = () => {
    setModalWhatsapp(true);
  };

  const closeModalWhatsapp = () => {
    setModalWhatsapp(false);
  };

  const handleReturnOrder = (orden: Orden) => {
    let currentPedidos: Orden[] = JSON.parse(localStorage.getItem('pedidos') || '[]');
    let currentOrdenes: Orden[] = JSON.parse(localStorage.getItem('ordenes') || '[]');
    
    const updatedPedidos = currentPedidos.filter(pedido => !(pedido.idDish === orden.idDish && pedido.idTable === orden.idTable));
    localStorage.setItem('pedidos', JSON.stringify(updatedPedidos));
    setOrdenes(updatedPedidos);
    
    const existingOrderIndex = currentOrdenes.findIndex(o => o.idDish === orden.idDish && o.idTable === orden.idTable);
    if (existingOrderIndex !== -1) {
      currentOrdenes[existingOrderIndex].count += orden.count;
    } else {
      currentOrdenes.push(orden);
    }
    
    localStorage.setItem('ordenes', JSON.stringify(currentOrdenes));
  };

  const updateOrders = () => {
    const storedOrders = localStorage.getItem('pedidos');
    if (storedOrders) {
      setOrdenes(JSON.parse(storedOrders));
    }
  };

  return (
    <>
      <div className='px-6 mb-28 mt-20'>
        <HeaderAttention text={'Pedido'} />
        <div className='flex items-center justify-between mb-[6px]'>
          <h1 className='text-center  text-2xl font-medium text-black'>Mesa N°{idTable}</h1>
        </div>
        {filteredOrdenes.map((orden: Orden, index: number) => (
          <OrderCard key={`${orden.idDish}-${index}`} orden={orden} handleReturnOrder={handleReturnOrder}/>
        ))}
        <div className='flex flex-row justify-between border-t-2 border-gray-500 py-3 px-6 mt-4'>
          <p className='text-3xl text-black'>Total</p>
          <div className='font-bold'>
            <span className='text-2xl text-black'>{priceTotal.toFixed(2)}</span>
            <span className='text-xs text-black'>.00</span>
          </div>
        </div>
        <Button className='bg-green-700 text-white w-full py-4 rounded-lg cursor-pointer hover:bg-green-600' onClick={openCreateOrderModal}>
          Cancelar Pedido
        </Button>
        <Button className='bg-green-900 text-white w-full py-4 rounded-lg cursor-pointer hover:bg-green-600 mt-4' onClick={openModalWhatsapp}>
          Enviar whatsapp
        </Button>
      </div>
      <Modal isOpen={isCreateOrderModalOpen} onClose={closeCreateOrdereModal}>
        <OrderCreate onClose={closeCreateOrdereModal} idTable={idTable} priceTotal={priceTotal} onUpdateOrders={updateOrders}/>
      </Modal>
      <Modal isOpen={isModalWhatsapp} onClose={closeModalWhatsapp}>
        <OrderWhatsapp onClose={closeModalWhatsapp} idTable={idTable} priceTotal={priceTotal}/>
      </Modal>
    </>
  )
}

export default Order;