export interface Articulos {
    id: number;
    descripcion: string;
    precio: number;
    cantidad_almacen: number;
    fecha_caducidad: string;
}

export type ArticulosNuevo = Omit<Articulos, 'id'>;