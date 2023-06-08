export interface CheckoutEvent {
  title: string;
  price: number;
}
export interface Asistente {
  email_usuario: string;
  id_evento: string;
}

export interface DetalleVenta {
  cantidad: number;
  id_juego: string;
  precio: number
}



export interface Venta {
  email_usuario: string;
  detalles: DetalleVenta[];
}
