'use client'
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import { DishesIcon, OrderIcon, PayOrderIcon, TableIcon } from '@/assets/icons';

const MenuAttention =  () => {
  const pathname = usePathname();
  const id = pathname.split('/').pop();

  const isActiveRoute = (route: string): boolean => {
    return pathname.includes(route);
  };
  
  return (
    <div className='fixed bottom-0 w-full shadow px-5 pb-2'>
      <div className='flex justify-around rounded-full overflow-hidden bg-green-300'>
        <Link href={`/atencion/platos/${id}`} className={`w-1/4 text-center py-4 text-base font-medium flex flex-col items-center justify-center ${isActiveRoute('platos') ? 'bg-primary text-white cursor-pointer' : 'border-gray-400 hover:bg-red-500'}`} passHref>
            <DishesIcon fill={isActiveRoute('platos') ? '#fff' : '#000'} className='h-10'/>
            <h3>Platos</h3>
        </Link>
        <Link href={`/atencion/orden/${id}`} className={`w-1/4 text-center py-4 text-base flex flex-col items-center ${
            isActiveRoute('orden') ? 'bg-primary text-white cursor-pointer' : 'border-gray-400 hover:bg-red-500'}`} passHref>
          <OrderIcon fill={isActiveRoute('orden') ? '#fff' : '#000'} className='h-10'/>
          <h3 >Orden</h3>
        </Link>
        <Link href={`/atencion/pedido/${id}`} className={`w-1/4 text-center py-4 text-base flex flex-col items-center ${isActiveRoute('pedido') ? 'bg-primary text-white cursor-pointer' : 'border-gray-400 hover:bg-red-500'}`} passHref>
          <PayOrderIcon fill={isActiveRoute('pedido') ? '#fff' : '#000'} className='h-10'/>
          <h3 >Pedido</h3>
        </Link>
        <Link  href={'/mesas'} className='w-1/4 text-center py-4 text-base flex flex-col items-center border-gray-400 hover:bg-red-500'>
          <TableIcon className='h-10'/>
          <h3 >Mesas</h3>
        </Link>
      </div>
    </div>
  )
}

export default MenuAttention