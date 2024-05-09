export interface Dish {
  idDish: number;
  name: string;
  price: number;
  urlImagen: string;
  idCategory: number;
  active: boolean;
}

export interface DishesState {
  dishes: Dish[];
  allDishes: Dish[];
  isLoading: boolean;
}