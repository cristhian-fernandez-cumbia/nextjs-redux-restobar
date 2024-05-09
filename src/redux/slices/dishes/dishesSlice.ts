import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Dish, DishesState } from '@/interface/dishes';

interface SearchAndCategoryState {
  searchTerm: string;
  selectedCategory: string;
}

const initialSearchAndCategoryState: SearchAndCategoryState = {
  searchTerm: '',
  selectedCategory: '0',
};

const initialState: DishesState & SearchAndCategoryState = {
  dishes: [],
  allDishes: [],
  isLoading: false,
  ...initialSearchAndCategoryState,
};

export const dishesSlice = createSlice({
  name: 'dishes',
  initialState,
  reducers: {
    startLoadingDishes: (state) => {
      state.isLoading = true;
    },
    setDishes: (state, action: PayloadAction<Dish[]>) => {
      state.dishes = action.payload;
      state.allDishes = action.payload;
      // state.dishes = action.payload.filter(dish => {
      //   const isInSearch = dish.name.toLowerCase().includes(state.searchTerm.toLowerCase());
      //   const isInCategory = state.selectedCategory === '0' || dish.idCategory.toString() === state.selectedCategory;
      //   return isInSearch && isInCategory;
      // });
      state.isLoading = false;
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
      state.selectedCategory = '0';
      state.dishes = state.allDishes.filter(dish => {
        const isInSearch = dish.name.toLowerCase().includes(state.searchTerm.toLowerCase());
        return isInSearch;
      });
    },
    setSelectedCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;

      // state.dishes = state.allDishes.filter(dish => {
      //   const isInCategory = state.selectedCategory === '0' || dish.idCategory.toString() === state.selectedCategory;
      //   return isInCategory;
      // });
    },
  },
});

export const { setDishes, startLoadingDishes, setSearchTerm, setSelectedCategory } = dishesSlice.actions;