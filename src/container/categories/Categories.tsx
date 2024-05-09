import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategories } from '@/redux/slices/categories';
import { setSelectedCategory } from '@/redux/slices/dishes';
import { Category } from '@/interface/categories';
import { ArrowLeft, ArrowRight } from '@/assets/icons';

interface CategoriesProps {
  handleCategoryChange: (categoryId: string) => void;
}

const Categories = ({ handleCategoryChange }: CategoriesProps) => {
  const { categories = [], isLoading = false } = useSelector((state: any) => state.categories);
  const selectedCategory = useSelector((state: any) => state.dishes.selectedCategory);
  const dispatch: any = useDispatch();
  const containerRef = useRef<HTMLDivElement>(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCategories, setVisibleCategories] = useState(3);
  const [startX, setStartX] = useState(0);

  useEffect(() => {
    dispatch(getAllCategories());

    const handleResize = () => {
      const width = window.innerWidth;
      if (width <= 500) {
        setVisibleCategories(2);
      } else if (width <= 640) {
        setVisibleCategories(3);
      } else if (width <= 768) {
        setVisibleCategories(4);
      } else if (width <= 1024) {
        setVisibleCategories(5);
      } else if (width <= 1280) {
        setVisibleCategories(6);
      } else if (width <= 1536) {
        setVisibleCategories(8);
      } else {
        setVisibleCategories(12);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [dispatch]);

  const nextCategory = () => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + visibleCategories;
      return nextIndex >= categories.length ? 0 : nextIndex;
    });
  };

  const prevCategory = () => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex - visibleCategories;
      return nextIndex < 0 ? categories.length - visibleCategories : nextIndex;
    });
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!startX || !containerRef.current) return;
    const x = e.touches[0].clientX;
    const difference = startX - x;
    if (Math.abs(difference) > 30) {
      difference > 0 ? nextCategory() : prevCategory();
      setStartX(0);
    }
  };

  if (isLoading) {
    return <>Loading ...</>;
  }

  return (
    <div className="flex items-center justify-between">
      <button onClick={prevCategory} className="bg-red-400 px-2 py-2 rounded-full hover:bg-primary">
        <ArrowLeft />
      </button>
      <div
        ref={containerRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        className="overflow-hidden"
      >
        <ul className='flex flex-row my-3'>
          {categories.slice(currentIndex, currentIndex + visibleCategories).map((category: Category) => (
            <div className="flex justify-center" key={category.idCategory}>
              <li
                className={`flex justify-center cursor-pointer ${
                  category.idCategory.toString() === selectedCategory ? 'bg-red-600 text-white' : 'bg-gray-300 text-gray-600'
                } px-4 py-2 rounded-2xl mr-3 items-center w-[100px] h-16 text-base text-center`}
                onClick={() => {
                  dispatch(setSelectedCategory(category.idCategory.toString()));
                  handleCategoryChange(category.idCategory.toString());
                }}
              >
                {category.name}
              </li>
            </div>
          ))}
        </ul>
      </div>
      <button onClick={nextCategory} className="bg-red-400 px-2 py-2 rounded-full hover:bg-primary">
        <ArrowRight />
      </button>
    </div>
  );
};

export default Categories;