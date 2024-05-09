import React, { useState, useEffect } from 'react';
import imageFood from '@/assets/images/products/bohemia_lomo_saltado.png';
import Image from 'next/image';
import { Start } from '@/assets/icons';
import { Dish } from '@/interface/dishes';
import { Orden } from '@/interface/attencion';

interface DishesCardProps {
  dish: Dish;
  idTable: string;
}

const DishesCard = ({ dish, idTable }: DishesCardProps) => {
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const ordenes = JSON.parse(localStorage.getItem('ordenes') || '[]');
    const alreadyAdded = ordenes.some((orden: Orden) => orden.idDish === dish.idDish && orden.idTable === idTable);
    setAdded(alreadyAdded);
  }, [dish.idDish, idTable]);

  const handleAddToOrden = () => {
    if (!added) { 
      const ordenes = JSON.parse(localStorage.getItem('ordenes') || '[]');
      const orden = {
        idTable: idTable,
        idDish: dish.idDish,
        name: dish.name,
        price: dish.price,
        urlImagen: dish.urlImagen,
        count: 1, 
      };
      ordenes.push(orden);
      localStorage.setItem('ordenes', JSON.stringify(ordenes));
      setAdded(true);
    }
  };

  return (
    <div className='flex w-full border-2 border-red-600 rounded-lg overflow-hidden items-center px-2 py-2 mb-2'>
      <Image src={imageFood} alt='bohemia_comidas' className='h-16 w-16 mr-2' priority/>
      <div className='flex justify-between w-full items-center'>
        <div>
          <div className='flex items-center'>
            <p>{dish.name}</p>
            <Start/>
          </div>
          <p className='text-sm font-semibold'>S/ {dish.price}.00</p>
        </div>
        <button
          className={`bg-blue-600 text-white py-1 px-3 rounded-lg hover:bg-blue-900 cursor-pointer ${added && 'opacity-50 cursor-not-allowed'}`}
          onClick={handleAddToOrden}
          disabled={added}
        >
          {added ? 'Agregado' : 'Agregar'}
        </button>
      </div>
    </div>
  );
};

export default DishesCard;
