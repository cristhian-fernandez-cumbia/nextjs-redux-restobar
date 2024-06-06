import React, { useState } from 'react'
import imageFood from '@/assets/images/products/bohemia_lomo_saltado.png'
import Image from 'next/image'
import { Orden } from '@/interface/attencion'
import { Annotation, Return } from '@/assets/icons'
import Button from '@/components/button/Button'
import Modal from '@/components/modal/Modal'
import OrderAnnotation from './OrderAnnotation'
import OrderRemove from './OrderRemove'

interface OrderCardProps {
  orden: Orden;
  handleReturnOrder: (orden: Orden) => void;
}

const OrderCard: React.FC<OrderCardProps> = ({ orden, handleReturnOrder }) => {
  const [isAnnotationModalOpen, setAnnotationModalOpen] = useState(false);
  const [isRemoveModalOpen, setRemoveModalOpen] = useState(false);

  const openAnnotationModal = () => {
    setAnnotationModalOpen(true);
  };

  const closeAnnotationModal = () => {
    setAnnotationModalOpen(false);
  };

  const openRemoveModal = () => {
    setRemoveModalOpen(true);
  };

  const closeRemoveModal = () => {
    setRemoveModalOpen(false);
  };

  const handleDelete = () => {
    handleReturnOrder(orden)
  };

  return (
    <>
      <div className='flex w-full border-2 border-red-600 rounded-lg overflow-hidden items-center px-2 py-2 mb-2'>
        <div className='flex flex-col sm:flex-row'>
          <Button onClick={openRemoveModal} className='cursor-pointer'>
            <Return />
          </Button>
          {
            orden.annotation && orden.annotation.length !== 0 ? 
            <Button onClick={openAnnotationModal} className='relative cursor-pointer'>
              <Annotation className='mr-2' fill={'red'} />
              <span className='absolute -top-1 right-1 bg-red-600 w-4 h-4 text-[11px] rounded-full flex justify-center items-center text-white'>
                  1
              </span>
            </Button> : <Annotation className='mr-2' fill={'#ccc'} />
          }
        </div>
        <Image src={imageFood} alt='bohemia_comidas' className='h-16 w-16 mr-2'/>
        <div className='flex justify-between w-full items-center'>
          <div>
            <div className='flex items-center'>
              <p>{orden.name}</p>
            </div>
            <p className='text-sm font-semibold'>S/ {orden.price}.00</p>
          </div>
          <div className='flex flex-row items-center text-black'>
            <div className=' border-gray-300 border-r-2 pr-2'>
              <h4 className='font-semibold text-xs'>Cant</h4>
              <p className='text-center leading-3'>{orden.count}</p>
            </div>
            <div className='mr-2 w-20 font-semibold text-right text-black'>
              <span className='text-2xl'>{Number(orden.count)*Number(orden.price)}</span>
              <span className='text-xs'>.00</span>
            </div>
          </div>
        </div>
      </div>
      <Modal isOpen={isRemoveModalOpen} onClose={closeRemoveModal}>
        <OrderRemove handleDelete={handleDelete} onClose={closeRemoveModal} />
      </Modal>
      <Modal isOpen={isAnnotationModalOpen} onClose={closeAnnotationModal}>
        <OrderAnnotation onClose={closeAnnotationModal} comment={orden.annotation || ''}/>
      </Modal>
    </>
  )
}

export default OrderCard