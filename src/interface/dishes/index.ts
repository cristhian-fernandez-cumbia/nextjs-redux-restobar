export interface Dish {
  idDish: number;
  name: string;
  price: number | string;
  urlImagen: string;
  description: string;
  idCategory: number;
  active: boolean;
}

export interface DishesState {
  dishes: Dish[];
  allDishes: Dish[];
  isLoading: boolean;
}