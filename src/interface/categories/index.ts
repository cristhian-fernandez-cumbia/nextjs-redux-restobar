export interface Category {
  idCategory: number;
  name: string;
  urlImagen: string;
  active: boolean;
}

export interface CategoriesState {
  categories: Category[];
  isLoading: boolean;
}