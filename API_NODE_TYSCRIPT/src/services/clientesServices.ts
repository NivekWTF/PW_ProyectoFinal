import { Clientes,ClienteNuevo } from '../typesClientes';
import mysql from 'mysql2/promise';
import { clienteSchema } from '../schema/clientes.schema';


const conexion = mysql.createPool({
    host: "localhost",
    user: "pw",
    password: "1234",
    database: "pw2024",
    multipleStatements: false
});

export const obtieneClientes = async () => {
    try{
        const [results] = await conexion.query('SELECT * FROM clientes');
        return results;
    }
    catch(error){
        return {error: "No se pudieron obtener los clientes"};
    }
}

export const encuentraClientes = async (id: number) => {
    try{
        const identificador = {id: id}
        const validacion = clienteSchema.safeParse(identificador);

        if (!validacion.success) {
            return {error: validacion.error};
        }

        const [results] = await conexion.query('SELECT * FROM clientes WHERE id = ? LIMIT 1', id);
        return results;
    }
    catch(error){
        return {error: "No se pudieron obtener los clientes"};
    }    
}

export const encuentraClientesNombre = async (descripcion: string) => {
    try{
        // const [results] = await conexion.query(consulta);
        const desc = {descripcion: descripcion}
        const validacion = clienteSchema.safeParse(desc);
        
        if (!validacion.success) {
            return {error: validacion.error};
        }
        const [results] = await conexion.query('SELECT * FROM clientes WHERE nombre = ?', desc);
        return results;
    }
    catch(error){
        return {error: "No se pudo obtener el cliente"};
    }    
}

export const agregarCliente = async (nuevo: ClienteNuevo) => {
    try {
        const validacion = clienteSchema.safeParse(nuevo);
        if (!validacion.success) {
            return {error: validacion.error};
        }
        const [results] = await conexion.query('INSERT INTO clientes (nombre, direccion, telefono, correo_electronico, ciudad) VALUES (?, ?, ?, ?, ?)', 
            [nuevo.nombre, nuevo.direccion, nuevo.telefono, nuevo.correoElectronico, nuevo.ciudad]);

        return results;
    } catch (error) {
        return {error: "No se pudo insertar el cliente"};
    }
}

export const modificarCliente = async (modificado: Clientes) => {
    try {
        const [results] = await conexion.query('UPDATE clientes SET nombre = ?, precio = ?, direccion = ?, telefono = ?, correo_electronico = ?, ciudad = ? WHERE id = ?', 
            [modificado.nombre, modificado.direccion, modificado.telefono, modificado.correoElectronico, modificado.ciudad , modificado.id]);

        return results;
    } catch (error) {
        return {error: "No se pudo actualizar el cliente"};
    }
}

export const borrarCliente = async (id: number) => {
    try {
        const [results] = await conexion.query('DELETE FROM clientes WHERE id = ?', id);

        return results;
    } catch (error) {
        return {error: "No se pudo eliminar el cliente"};
    }
}
