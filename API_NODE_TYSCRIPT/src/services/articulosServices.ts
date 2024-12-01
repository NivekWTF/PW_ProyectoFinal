import { Articulos,ArticulosNuevo } from '../typesArticulos';
import mysql from 'mysql2/promise';
import { articuloSchema } from '../schema/articulos.schema';


const conexion = mysql.createPool({
    host: "localhost",
    user: "pw",
    password: "1234",
    database: "pw2024",
    multipleStatements: false
});

export const obtieneArticulos = async () => {
    try{
        const [results] = await conexion.query('SELECT * FROM articulos');
        return results;
    }
    catch(error){
        return {error: "No se pudieron obtener los articulos"};
    }
}

export const encuentraArticulos = async (id: number) => {
    try{
        const identificador = {id: id}
        const validacion = articuloSchema.safeParse(identificador);

        if (!validacion.success) {
            return {error: validacion.error};
        }

        const [results] = await conexion.query('SELECT * FROM articulos WHERE id = ? LIMIT 1', id);
        return results;
    }
    catch(error){
        return {error: "No se pudieron obtener los articulos"};
    }    
}

export const encuentraArticuloDescripcion = async (descripcion: string) => {
    try{
        // const [results] = await conexion.query(consulta);
        const desc = {descripcion: descripcion}
        const validacion = articuloSchema.safeParse(desc);
        
        if (!validacion.success) {
            return {error: validacion.error};
        }
        const [results] = await conexion.query('SELECT * FROM articulos WHERE descripcion = ?', desc);
        return results;
    }
    catch(error){
        return {error: "No se pudo obtener el personal"};
    }    
}

export const agregarArticulo = async (nuevo: ArticulosNuevo) => {
    try {
        const validacion = articuloSchema.safeParse(nuevo);
        if (!validacion.success) {
            return {error: validacion.error};
        }
        const [results] = await conexion.query('INSERT INTO articulos (descripcion, precio, cantidad_almacen, fecha_caducidad) VALUES (?, ?, ?, ?)', 
            [nuevo.descripcion, nuevo.precio, nuevo.cantidad_almacen, nuevo.fecha_caducidad]);

        return results;
    } catch (error) {
        return {error: "No se pudo insertar el articulo"};
    }
}

export const modificarArticulo = async (modificado: Articulos) => {
    try {
        const [results] = await conexion.query('UPDATE articulos SET descripcion = ?, precio = ?, cantidad_almacen = ?, fecha_caducidad = ? WHERE id = ?', 
            [modificado.descripcion, modificado.precio, modificado.cantidad_almacen, modificado.fecha_caducidad, modificado.id]);

        return results;
    } catch (error) {
        return {error: "No se pudo actualizar el articulo"};
    }
}

export const borrarArticulo = async (id: number) => {
    try {
        const [results] = await conexion.query('DELETE FROM articulos WHERE id = ?', id);

        return results;
    } catch (error) {
        return {error: "No se pudo eliminar el articulo"};
    }
}
