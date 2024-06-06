import React, { useState } from 'react';
import Image from 'next/image';
import { Annotation, Minus, Money, Plus, Trash } from '@/assets/icons';
import { Orden } from '@/interface/attencion';
import imageFood from '@/assets/images/products/bohemia_lomo_saltado.png';
import Modal from '@/components/modal/Modal';
import Button from '@/components/button/Button';
import AttentionAnnotation from './AttentionAnnotation';
import AttentionRemove from './AttentionRemove';
import AttentionPrice from './AttentionPrice';

interface AttencionCardProps {
  orden: Orden;
  onDeleteItem: (deletedOrdenId: string) => void;
}

const AttencionCard: React.FC<AttencionCardProps> = ({ orden, onDeleteItem }) => {
  const [count, setCount] = useState(orden.count);
  const [isRemoveModalOpen, setRemoveModalOpen] = useState(false);
  const [isAnnotationModalOpen, setAnnotationModalOpen] = useState(false);
  const [comment, setComment] = useState<string>(orden.annotation || '');
  const [commentOrder, setCommentOrder] = useState<string>(orden.annotation || '');
  const [isPriceModalOpen, setPriceModalOpen] = useState(false);
  const [newPrice, setNewPrice] = useState<number>(orden.price);

  const openRemoveModal = () => {
    setRemoveModalOpen(true);
  };

  const closeRemoveModal = () => {
    setRemoveModalOpen(false);
  };

  const openAnnotationModal = () => {
    setComment(commentOrder)
    setAnnotationModalOpen(true);
  };

  const closeAnnotationModal = () => {
    setAnnotationModalOpen(false);
  };

  const openPriceModal = () => {
    setPriceModalOpen(true);
  };

  const closePriceModal = () => {
    setPriceModalOpen(false);
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
    const updatedOrden = { ...orden, count: newCount, annotation: comment, price: newPrice};
    const ordenes = JSON.parse(localStorage.getItem('ordenes') || '[]');
    const updatedOrdenes = ordenes.map((o: Orden) => {
      if (o.idDish === updatedOrden.idDish && o.idTable === updatedOrden.idTable) {
        return updatedOrden;
      }
      return o;
    });
    localStorage.setItem('ordenes', JSON.stringify(updatedOrdenes));
  };

  const updateOrderCommet = () => {
    setCommentOrder(comment)
    const updatedOrden = { ...orden, count: count, annotation: comment, price: newPrice };
    const ordenes = JSON.parse(localStorage.getItem('ordenes') || '[]');
    const updatedOrdenes = ordenes.map((o: Orden) => {
      if (o.idDish === updatedOrden.idDish && o.idTable === updatedOrden.idTable) {
        return updatedOrden;
      }
      return o;
    });
    localStorage.setItem('ordenes', JSON.stringify(updatedOrdenes));
  };

  const updateOrderPrice = (newPrice: number) => {
    setNewPrice(newPrice);
    const updatedOrden = { ...orden, count: count, annotation: comment, price: newPrice };
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
      <div className='flex col w-full border-2 border-red-600 rounded-lg overflow-hidden items-center px-2 py-2 mb-2'>
        <div className='flex flex-col sm:flex-row'>
          <div className='cursor-pointer mr-1' onClick={openRemoveModal}>
            <Trash />
          </div>
          <Button onClick={openAnnotationModal} className='relative'>
            <Annotation className='mr-2' fill={commentOrder.length !== 0 ? 'red' : undefined} />
            {commentOrder.length !== 0 && (
              <span className='absolute -top-1 right-1 bg-red-600 w-4 h-4 text-[11px] rounded-full flex justify-center items-center text-white'>
                1
              </span>
            )}
          </Button>
        </div>

        <Image src={imageFood} alt='bohemia_comidas' className='h-16 w-16 mr-2' />
        <div className='flex justify-between w-full'>
          <div>
            <p className='text-black'>{orden.name}</p>
            <div className='flex flex-row' onClick={openPriceModal}>
              <Money className='relative -top-[5px] cursor-pointer' fill='green'/>
              <p className='text-sm font-semibold text-black'>S/ {newPrice}.00</p>
            </div>
          </div>
          <div className='flex items-center pr-1'>
            <div className='border-green-500 border-2 p-1 rounded-md bg-green-500 cursor-pointer' onClick={handleIncrement}>
              <Plus fill='#FFF' />
            </div>
            <div className='mx-1 w-6 flex justify-center font-semibold text-black'>{count}</div>
            <div className='border-red-500 border-2 p-1 rounded-md bg-red-500 cursor-pointer' onClick={handleDecrement}>
              <Minus fill='#FFF' />
            </div>
          </div>
        </div>
      </div>
      <Modal isOpen={isRemoveModalOpen} onClose={closeRemoveModal}>
        <AttentionRemove handleDelete={handleDelete} onClose={closeRemoveModal} />
      </Modal>
      <Modal isOpen={isAnnotationModalOpen} onClose={closeAnnotationModal}>
        <AttentionAnnotation onClose={closeAnnotationModal} setComment={setComment} comment={comment}  updateOrderCommet={updateOrderCommet}/>
      </Modal>
      <Modal isOpen={isPriceModalOpen} onClose={closePriceModal}>
        <AttentionPrice onClose={closePriceModal} setNewPrice={updateOrderPrice} currentPrice={newPrice} />
      </Modal>
    </>
  );
};

export default AttencionCard;