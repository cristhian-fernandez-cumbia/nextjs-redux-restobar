import { setDishes, startLoadingDishes } from "."
import apiDishes from '@/app/api/apiDishes.json'

export const getAllDishes = () => {
  return async (dispatch:any) => {
    dispatch(startLoadingDishes())
    try {
      const response = apiDishes;
      const data = response.data.dishes
      dispatch(setDishes(data))
    } catch (error) {
      console.log(error);
    }
  }
}