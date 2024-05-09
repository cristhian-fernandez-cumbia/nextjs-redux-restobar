export interface AttencionProps {
  params: {
    id: string;
  };
}

export interface Orden {
  idTable: string;
  idDish: number;
  name: string;
  price: number;
  urlImagen: string;
  count: number;
  annotation?: string;
}