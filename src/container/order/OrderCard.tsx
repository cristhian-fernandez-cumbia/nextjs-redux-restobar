import React from 'react'
import imageFood from '@/assets/images/products/bohemia_lomo_saltado.png'
import Image from 'next/image'
import { Orden } from '@/interface/attencion'

const OrderCard = ({ orden }: { orden: Orden }) => {
  return (
    <div className='flex w-full border-2 border-red-600 rounded-lg overflow-hidden items-center px-2 py-2 mb-2'>
    <Image src={imageFood} alt='bohemia_comidas' className='h-16 w-16 mr-2'/>
    <div className='flex justify-between w-full items-center'>
      <div>
        <div className='flex items-center'>
          <p>{orden.name}</p>
        </div>
        <p className='text-sm font-semibold'>S/ {orden.price}.00</p>
      </div>
      <div className='flex flex-row items-center'>
        <div className=' border-gray-300 border-r-2 pr-2'>
          <h4 className='font-semibold text-xs'>Cantidad</h4>
          <p className='text-center leading-3'>{orden.count}</p>
        </div>
        <div className='mr-2 w-20 font-semibold text-right'>
          <span className='text-2xl'>{Number(orden.count)*Number(orden.price)}</span>
          <span className='text-xs'>.00</span>
        </div>
      </div>
    </div>
  </div>
  )
}

export default OrderCard