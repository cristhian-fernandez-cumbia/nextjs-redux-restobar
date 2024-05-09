import { setCategories, startLoadingCategories } from "."
import apiCategories from '@/app/api/apiCategories.json'

// export const getAllCategories = () => {
//   return async (dispatch:any) => {
//     dispatch(startLoadingCategories())
//     try {
//       const response = apiCategories;
//       const data = response.data.categories
//       window.localStorage.setItem('categories', JSON.stringify(response.data.categories));
//       dispatch(setCategories(data))
//     } catch (error) {
//       console.log(error);
//     }
//   }
// }

export const getAllCategories = () => {
  return async (dispatch: any) => {
    dispatch(startLoadingCategories());
    try {
      // const storedData = localStorage.getItem('categories');
      // if (storedData) {
      //   const data = JSON.parse(storedData);
      //   dispatch(setCategories(data));
      // } else {
      //   const response = apiCategories;
      //   const data = response.data.categories
      //   window.localStorage.setItem('categories', JSON.stringify(response.data.categories));
      //   dispatch(setCategories(data))
      // }
      const response = apiCategories;
      const data = response.data.categories
      dispatch(setCategories(data))
    } catch (error) {
      console.log(error);
    }
  };
};