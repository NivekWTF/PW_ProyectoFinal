export interface Clientes {
    id: number;
    nombre: string;
    direccion: string; 
    telefono: string; 
    correoElectronico: string; 
    ciudad: string;
}

export type ClienteNuevo = Omit<Clientes, 'id'>;
