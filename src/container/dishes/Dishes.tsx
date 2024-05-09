'use client'
import React, { useEffect } from 'react';
import DishesCard from './DishesCard';
import Categories from '../categories/Categories';
import { useDispatch, useSelector } from 'react-redux';
import { getAllDishes, setSearchTerm, setSelectedCategory } from '@/redux/slices/dishes';
import { Dish } from '@/interface/dishes';
import { usePathname } from 'next/navigation';
import HeaderAttention from '@/components/header/HeaderAttention';

const Dishes = () => {
  const { dishes = [], isLoading = false, searchTerm, selectedCategory } = useSelector((state: any) => state.dishes);
  const dispatch: any = useDispatch();
  const pathname = usePathname();
  const idTable = pathname.split('/').pop() || '0';

  useEffect(() => {
    dispatch(getAllDishes());
  }, [dispatch, selectedCategory]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchTerm(e.target.value));
  };

  const handleCategoryChange = (categoryId: string) => {
    dispatch(setSelectedCategory(categoryId));
  };

  useEffect(() => {
    dispatch(setSelectedCategory('0'));
    dispatch(setSearchTerm(''));
  }, []);

  if (isLoading) {
    return <>Loading ...</>;
  }

  return (
    <div className='px-6 mb-24 mt-20'>
      <HeaderAttention text={'Platos de Comida2'}/>
      <div className='flex items-center justify-between mb-[6px]'>
        <h1 className='text-center  text-2xl font-medium'>Mesa N°{idTable}</h1>
      </div>
      <input
        type="text"
        name="search"
        id="search"
        value={searchTerm}
        onChange={handleSearchChange}
        className='border-terciary border-[1px] rounded-md py-2 px-3 w-full'
        placeholder='Buscar platos ...'
      />
      <Categories handleCategoryChange={handleCategoryChange} />

      {dishes.length === 0 ? (
        <div>No hay platos</div>
      ) : (
        <>
          {selectedCategory === '0' ? (
            dishes.map((dish: Dish) => (
              <div key={dish.idDish}>
                <DishesCard dish={dish} idTable={idTable} />
              </div>
            ))
          ) : (
            dishes.map((dish: Dish) => {
              if (dish.idCategory === parseInt(selectedCategory)) {
                return (
                  <div key={dish.idDish}>
                    <DishesCard dish={dish} idTable={idTable}/>
                  </div>
                );
              }
              return null;
            })
          )}
        </>
      )}
    </div>
  );
};

export default Dishes;
