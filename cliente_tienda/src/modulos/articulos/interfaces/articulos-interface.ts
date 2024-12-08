export interface Articulos {
    id: number;
    descripcion: string;
    precio: number;
    cantidad_almacen: string;
    fecha_caducidad: string;
}

export type ArticuloAgregar = Omit<Articulos, 'id'>;