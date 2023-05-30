export interface User {
  apellido: string;
  email: string;
  estado: boolean;
  facebook: string;
  fecha_nacimiento: Date;
  foto_perfil: string;
  genero: number;
  id_dieta: number;
  id_rol: number;
  instagram: string;
  nombre: string;
  rol: string;
  ruta_foto_perfil: string;
  telefono: string;
}

export interface UserLogin {
  email: string;
  password: string;
}
export interface UserChangePass {
  email: string;
  password: string;
  nuevapassword: string;
  nuevapassword2: string;
}
