import { configureStore } from '@reduxjs/toolkit'
import { tablesSlice } from '../slices/tables'
import { categoriesSlice } from '../slices/categories'
import { dishesSlice } from '../slices/dishes'

export const store = configureStore({
  reducer: {
    tables: tablesSlice.reducer,
    categories: categoriesSlice.reducer,  
    dishes: dishesSlice.reducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch