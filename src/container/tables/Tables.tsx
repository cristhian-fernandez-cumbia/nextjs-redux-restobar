'use client'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllTables } from '@/redux/slices/tables';
import { ITable } from '@/interface/tables';
import TablesCard from './TablesCard'
import { Orden } from '@/interface/attencion';

interface AttentionPerson {
  idTable: string;
  numPersons: number;
}

const Tables = () => {
  const { tables = [] , isLoading = false } = useSelector((state:any) => state.tables )
  const dispatch:any = useDispatch();
  
  useEffect(() => {
    dispatch(getAllTables())
  }, [dispatch])
  
  if(isLoading) {
    return (
      <>
        Loading ...
      </>
    )
  }

  const attentionPeople: AttentionPerson[] = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('attentionPeople') || '[]') : [];

  const ordenes:Orden[] = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('ordenes') || '[]') : [];

  return (
    <div className='pt-24 pb-10 bg-gray-800 min-h-screen flex items-center justify-center'>
      {
        tables.length === 0 ? (
          <div className='text-white text-2xl'>No hay mesas</div>
        ): (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 sm:gap-x-10 gap-y-5">
            {
              tables.map((table: ITable) => {
                const attentionTable = attentionPeople.find((attentionTable) => Number(attentionTable.idTable) === Number(table.idTable));
                const numPersons = attentionTable ? attentionTable.numPersons : 0;
                const isOccupied = ordenes.some((orden: any) => Number(orden.idTable) === Number(table.idTable));

                return (
                  <div className="flex justify-center" key={table.idTable}>
                    <TablesCard {...table} numPersons={numPersons} isOccupied={isOccupied}/>
                  </div>
                )
              })
            }
          </div>
        )
      }
    </div>
  )
}

export default Tables