import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Category {
  idCategory: number
  name: string
  urlImagen: string
  active: boolean
}

interface CategoriesState {
  categories: Category[]
  isLoading: boolean
}

const initialState: CategoriesState = {
  categories: [],
  isLoading: false,
}

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    startLoadingCategories: (state) => {
      state.isLoading = true;
    },
    setCategories: (state, action: PayloadAction<Category[]>) => {
      state.categories = action.payload
      state.isLoading = false
    }
  },
})

export const { setCategories, startLoadingCategories } = categoriesSlice.actions