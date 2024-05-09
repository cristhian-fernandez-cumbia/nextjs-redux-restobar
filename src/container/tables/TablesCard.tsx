// TablesCard.tsx
import { ITable } from '@/interface/tables'
import React from 'react'
import imageTable from '@/assets/images/tables/comedor.png'
import Image from 'next/image'
import { Users } from '@/assets/icons'
import Link from 'next/link'

interface TablesCardProps extends ITable {
  numPersons: number;
}

const TablesCard: React.FC<TablesCardProps> = ({ idTable, numPersons, stateTable }) => {
  return (
    <Link href={`atencion/platos/${idTable}`}>
      <div className='card flex flex-col items-center overflow-hidden relative'>
          <h2 className='text-xl'>Mesa #{idTable}</h2>
          <Image 
            alt={`bohemia-${idTable}`} 
            src={imageTable} 
            className='w-14 flex justify-center'
            priority
          />
          <span className='flex border-2 px-2 items-center h-[25px] rounded-md absolute top-2 left-2'>
            <Users fill='white'/><p className='text-[15px] ml-1'>: {numPersons}</p>
          </span>
          <span className='flex items-center h-[25px] rounded-md absolute bottom-2 right-2 overflow-hidden'>
            <p className='text-[16px]'>
              {
                Number(numPersons) === 0 ? 
                <span className='bg-terciary-light p-2 text-gray-700'>Libre</span> : 
                <span className='bg-primary p-2 text-white'>Ocupado</span>
              }
            </p>
          </span>
      </div>
    </Link>
  )
}

export default TablesCard