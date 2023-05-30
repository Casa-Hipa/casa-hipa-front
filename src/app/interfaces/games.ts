export interface GameSearch {
  name: string;
}

export interface GameSaveCollecction {
  id_juego: string;
  id_coleccion: string;
}

export interface ColleccionSearch {
  id_coleccion: string;
}
export interface UpdateStore {
  stock: number;
  precio: number;
  id_juego: string;
}
