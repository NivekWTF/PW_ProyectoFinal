export interface Clientes {
    id: number;
    nombre: string;
    direccion: string; 
    telefono: string; 
    correo_electronico: string; 
    ciudad: string;
}

export type ClienteAgregar = Omit<Clientes, 'id'>;
