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
  precio: number;
  id_mecanica: string;
  nombre_juego: string;
}



export interface Venta {
  email_usuario: string;
  detalles: DetalleVenta[];
}
export interface FechasBarras {
  fecha_ini: string;
  fecha_fin: string;
}