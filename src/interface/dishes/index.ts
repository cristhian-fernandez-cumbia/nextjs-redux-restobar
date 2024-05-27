export interface Dish {
  idDish: number;
  name: string;
  price: number;
  urlImagen: string;
  description: string;
  idCategory: string;
  active: boolean;
}

export interface DishesState {
  dishes: Dish[];
  allDishes: Dish[];
  isLoading: boolean;
}