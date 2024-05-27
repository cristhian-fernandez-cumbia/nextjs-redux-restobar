import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Annotation, Minus, Plus, Trash } from '@/assets/icons';
import { Orden } from '@/interface/attencion';
import imageFood from '@/assets/images/products/bohemia_lomo_saltado.png';
import Modal from '@/components/modal/Modal';
import Button from '@/components/button/Button';
import AttentionAnnotation from './AttentionAnnotation';
import AttentionRemove from './AttentionRemove';

interface AttencionCardProps {
  orden: Orden;
  onDeleteItem: (deletedOrdenId: string) => void;
}

const AttencionCard: React.FC<AttencionCardProps> = ({ orden, onDeleteItem }) => {
  const [count, setCount] = useState(orden.count);
  const [isRemoveModalOpen, setRemoveModalOpen] = useState(false);
  const [isAnnotationModalOpen, setAnnotationModalOpen] = useState(false);
  const [comment, setComment] = useState(orden.annotation || '');

  const openRemoveModal = () => {
    setRemoveModalOpen(true);
  };

  const closeRemoveModal = () => {
    setRemoveModalOpen(false);
  };

  const openAnnotationModal = () => {
    setAnnotationModalOpen(true);
  };

  const closeAnnotationModal = () => {
    setAnnotationModalOpen(false);
  };

  const handleIncrement = () => {
    const updatedCount = count + 1;
    setCount(updatedCount);
    updateOrderCount(updatedCount);
  };

  const handleDecrement = () => {
    if (count > 1) {
      const updatedCount = count - 1;
      setCount(updatedCount);
      updateOrderCount(updatedCount);
    }
  };

  const handleDelete = () => {
    onDeleteItem(orden.idDish.toString());
    removeFromLocalStorage(orden.idDish.toString());
  };

  const removeFromLocalStorage = (deletedOrdenId: string) => {
    const ordenes = JSON.parse(localStorage.getItem('ordenes') || '[]');
    const updatedOrdenes = ordenes.filter((orden: Orden) => !(orden.idDish === Number(deletedOrdenId)));
    localStorage.setItem('ordenes', JSON.stringify(updatedOrdenes));
  };

  const updateOrderCount = (newCount: number) => {
    const updatedOrden = { ...orden, count: newCount, annotation: comment };
    const ordenes = JSON.parse(localStorage.getItem('ordenes') || '[]');
    const updatedOrdenes = ordenes.map((o: Orden) => {
      if (o.idDish === updatedOrden.idDish && o.idTable === updatedOrden.idTable) {
        return updatedOrden;
      }
      return o;
    });
    localStorage.setItem('ordenes', JSON.stringify(updatedOrdenes));
  };

  return (
    <>
      <div className='flex w-full border-2 border-red-600 rounded-lg overflow-hidden items-center px-2 py-2 mb-2'>
        <div className='cursor-pointer mr-1' onClick={openRemoveModal}>
          <Trash />
        </div>
        <Button onClick={openAnnotationModal} className='relative'>
          <Annotation className='mr-2' fill={comment.length !== 0 ? 'red' : undefined} />
          {comment.length !== 0 && (
            <span className='absolute -top-1 right-1 bg-red-600 w-4 h-4 text-[11px] rounded-full flex justify-center items-center text-white'>
              1
            </span>
          )}
        </Button>

        <Image src={imageFood} alt='bohemia_comidas' className='h-16 w-16 mr-2' />
        <div className='flex justify-between w-full'>
          <div>
            <p>{orden.name}</p>
            <p className='text-sm font-semibold'>S/ {orden.price}.00</p>
          </div>
          <div className='flex items-center pr-1'>
            <div className='border-green-500 border-2 p-1 rounded-md bg-green-500 cursor-pointer' onClick={handleIncrement}>
              <Plus fill='#FFF' />
            </div>
            <div className='mx-1 w-6 flex justify-center font-semibold'>{count}</div>
            <div className='border-red-500 border-2 p-1 rounded-md bg-red-500 cursor-pointer' onClick={handleDecrement}>
              <Minus fill='#FFF' />
            </div>
          </div>
        </div>
      </div>
      <Modal isOpen={isRemoveModalOpen} onClose={closeRemoveModal}>
        <AttentionRemove handleDelete={handleDelete} onClose={closeRemoveModal}/>
      </Modal>
      <Modal isOpen={isAnnotationModalOpen} onClose={closeAnnotationModal}>
        <AttentionAnnotation setComment={setComment} comment={comment} updateOrderCount={updateOrderCount}/>
      </Modal>
    </>
  );
};

export default AttencionCard;