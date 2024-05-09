'use client'
import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import AttencionCard from './AttencionCard';
import HeaderAttention from '@/components/header/HeaderAttention';
import { Orden } from '@/interface/attencion';
import AttentionCountPeople from './AttentionCountPeople';
import Button from '@/components/button/Button';
import Modal from '@/components/modal/Modal';
import AttentionCreate from './AttentionCreate';
import AttentionMessage from './AttentionMessage';

const Attencion = () => {
  const pathname = usePathname();
  const idTable = pathname.split('/').pop() || '0';
  const [ordenes, setOrdenes] = useState<Orden[]>([]);
  const [countPeople, setCountPeople] = useState<number>(0);
  const [isCreateOrderModalOpen, setCreateOrderModalOpen] = useState(false);
  
  useEffect(() => {
    const storedOrdenes: Orden[] = JSON.parse(localStorage.getItem('ordenes') || '[]');
    const filteredOrdenes: Orden[] = storedOrdenes.filter((orden: Orden) => orden.idTable === idTable);
    setOrdenes(filteredOrdenes);
  }, [idTable]);

  const handleDeleteItem = (deletedOrdenId: string) => {
    const updatedOrdenes = ordenes.filter((orden: Orden) => !(orden.idDish === Number(deletedOrdenId) && orden.idTable === idTable));
    setOrdenes(updatedOrdenes);
  };

  const openCreateOrderModal = () => {
    setCreateOrderModalOpen(true);
  };

  const closeCreateOrdereModal = () => {
    setCreateOrderModalOpen(false);
  };

  return (
    <div className='px-6 mb-24 mt-20'>
      <HeaderAttention text={'Nueva Orden'}/>
      <div className='flex items-center justify-between mb-[5px]'>
        <h1 className='text-center  text-2xl font-medium'>Mesa N°{idTable}</h1>
      </div>
      <AttentionCountPeople idTable={idTable} setCountPeople={setCountPeople}/>
      {ordenes.map((orden: Orden, index: number) => (
        <AttencionCard key={`${orden.idDish}-${index}`} orden={orden} onDeleteItem={handleDeleteItem} />
      ))}

      <Button className='bg-green-600 hover:bg-green-800 text-white text-center text-xl rounded-lg w-full py-3 mt-4' onClick={openCreateOrderModal}>
        Agregar a Pedido
      </Button>

      <Modal isOpen={isCreateOrderModalOpen} onClose={closeCreateOrdereModal}>
         {countPeople!==0 && ordenes.length !== 0 ? <AttentionCreate  onClose={closeCreateOrdereModal} idTable={idTable}/> : <AttentionMessage  onClose={closeCreateOrdereModal}/>} 
      </Modal>

    </div>
  );
}

export default Attencion;