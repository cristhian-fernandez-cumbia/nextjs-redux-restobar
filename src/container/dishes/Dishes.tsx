'use client'
import React, { useEffect, useState } from 'react';
import DishesCard from './DishesCard';
import Categories from '../categories/Categories';
import { useDispatch, useSelector } from 'react-redux';
import { getAllDishes, setSearchTerm, setSelectedCategory } from '@/redux/slices/dishes';
import { Dish } from '@/interface/dishes';
import { usePathname } from 'next/navigation';
import HeaderAttention from '@/components/header/HeaderAttention';
import { getAllCategories } from '@/redux/slices/categories';
import { Category } from '@/interface/categories';

const Dishes = () => {
  const { dishes = [], isLoading = false, searchTerm, selectedCategory } = useSelector((state: any) => state.dishes);
  const { categories = [] } = useSelector((state: any) => state.categories);
  const dispatch: any = useDispatch();
  const pathname = usePathname();
  const idTable = pathname.split('/').pop() || '0';
  const [showFavorites, setShowFavorites] = useState(false);
  const [favorites, setFavorites] = useState<Dish[]>([]);

  useEffect(() => {
    dispatch(getAllDishes());
    dispatch(getAllCategories());
  }, [dispatch, selectedCategory]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavorites(dishes.filter((dish: Dish) => storedFavorites.includes(dish.idDish)));
  }, [dishes]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchTerm(e.target.value));
  };

  const handleCategoryChange = (categoryId: string) => {
    dispatch(setSelectedCategory(categoryId));
  };

  const updateFavorites = () => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavorites(dishes.filter((dish: Dish) => storedFavorites.includes(dish.idDish)));
  };

  const toggleShowFavorites = () => {
    setShowFavorites(!showFavorites);
  };

  const getCategoryNameById = (idCategory: number) => {
    const category = categories.find((category: Category) => category.idCategory === idCategory);
    return category ? category.name : '';
  };

  if (isLoading) {
    return <>Loading ...</>;
  }

  return (
    <div className='px-6 mb-28 mt-20'>
      <HeaderAttention text={'Platos de Comida'}/>
      <div className='flex items-center justify-between mb-[12px] mt-4'>
        <h1 className='text-center text-2xl font-medium'>Mesa N°{idTable}</h1>
        <button
          onClick={toggleShowFavorites}
          className={`text-white py-2 px-4 rounded-md cursor-pointer ${!showFavorites ? 'bg-yellow-500 hover:bg-yellow-700': 'bg-red-500 hover:bg-red-700'}`}
        >
          {!showFavorites ? 'Ver Favoritos' : 'Ocultar Favoritos'}
        </button>
      </div>

      {showFavorites ? (
        <div>
          <h2 className='text-2xl text-center font-semibold mb-4'>Favoritos</h2>
          {favorites.length === 0 ? (
            <p className='text-center'>No hay favoritos</p>
          ) : (
            favorites.map((dish: Dish) => (
              <div key={dish.idDish}>
                <DishesCard dish={dish} idTable={idTable} categoryName={getCategoryNameById(parseInt(dish.idCategory))} updateFavorites={updateFavorites} />
              </div>
            ))
          )}
        </div>
      ) : (
        <>
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
                    <DishesCard dish={dish} idTable={idTable} categoryName={getCategoryNameById(parseInt(dish.idCategory))} updateFavorites={updateFavorites} />
                  </div>
                ))
              ) : (
                dishes.map((dish: Dish) => {
                  if (dish.idCategory === selectedCategory) {
                    return (
                      <div key={dish.idDish}>
                        <DishesCard dish={dish} idTable={idTable} categoryName={getCategoryNameById(parseInt(dish.idCategory))} updateFavorites={updateFavorites} />
                      </div>
                    );
                  }
                  return null;
                })
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Dishes;