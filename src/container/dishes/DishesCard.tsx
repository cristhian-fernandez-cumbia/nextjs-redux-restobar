import React, { useState, useEffect } from 'react';
import imageLogo from '@/assets/images/logo/logo_bohemia.jpg';
import Image from 'next/image';
import { Start, StartFill } from '@/assets/icons';
import { Dish } from '@/interface/dishes';
import { Orden } from '@/interface/attencion';

interface DishesCardProps {
  dish: Dish;
  idTable: string;
  categoryName: string;
  updateFavorites: () => void;
}

const DishesCard = ({ dish, idTable, categoryName, updateFavorites }: DishesCardProps) => {
  const [added, setAdded] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const ordenes = JSON.parse(localStorage.getItem('ordenes') || '[]');
    const alreadyAdded = ordenes.some((orden: Orden) => orden.idDish === dish.idDish && orden.idTable === idTable);
    setAdded(alreadyAdded);

    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const alreadyFavorite = favorites.some((favorite: number) => favorite === dish.idDish);
    setIsFavorite(alreadyFavorite);
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

  const handleToggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    if (isFavorite) {
      const updatedFavorites = favorites.filter((favorite: number) => favorite !== dish.idDish);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    } else {
      favorites.push(dish.idDish);
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
    setIsFavorite(!isFavorite);
    updateFavorites();
  };

  return (
    <div className='flex w-full border-2 border-red-600 rounded-lg overflow-hidden items-center px-2 py-2 mb-2'>
      <div className='relative h-16 w-16 mr-2 rounded-lg overflow-hidden'>
        <Image src={imageLogo} alt={dish.name} className='h-16 w-16' priority/>
        <div className='absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
          <p className='text-white text-[10px] text-center font-bold transform -rotate-45'>{categoryName}</p>
        </div>
      </div>
      <div className='flex justify-between w-full items-center'>
        <div>
          <div className='flex items-center'>
            <p className='text-black'>{dish.name}</p>
            <div onClick={handleToggleFavorite} className='cursor-pointer'>
              {isFavorite ? <StartFill /> :<Start />}
            </div>
          </div>
          <p className='text-sm font-semibold text-black'>S/ {dish.price}.00</p>
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
