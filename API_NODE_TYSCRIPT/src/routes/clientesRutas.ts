import express,{Request, Response} from 'express';
import * as clientesServices from '../services/clientesServices';
const router = express.Router();

//http://localhost:3001/api/clientes/ 
router.get('/', async (_req: Request, res:Response) => {
    let clientes = await clientesServices.obtieneClientes();
    res.send(clientes)
})
//http://localhost:3001/api/clientes/1
router.get('/:id', async (req: Request, res:Response) => {
    let clientes = await clientesServices.encuentraClientes(Number(req.params.id));
    res.send(clientes)
})

//http://localhost:3001/api/clientes/descrip/refresco
router.get('/descrip/:descrip', async (req: Request, res:Response) => {
    let clientes = await clientesServices.encuentraClientesNombre(req.params.descrip);
    res.send(clientes)
})

router.post('/', async (req: Request, res:Response) => {
    try{
        const {nombre, direccion, telefono, correoElectronico, ciudad} = req.body;
        const nuevo = await clientesServices.agregarCliente({
            nombre, 
            direccion, 
            telefono, 
            correoElectronico, 
            ciudad
        });
        res.send(nuevo);
    }
    catch(error){
        res.status(400).send("No se pudo insertar el cliente");
    }
})

//Modificar datos
router.put('/', async (req: Request, res:Response) => {
    try{
        const {id,nombre, direccion, telefono, correoElectronico, ciudad} = req.body;
        const modificado = await clientesServices.modificarCliente({
            id,
            nombre, 
            direccion, 
            telefono, 
            correoElectronico, 
            ciudad
        });
        res.send(modificado);
    }
    catch(error){
        res.status(400).send("No se pudo actualizar el clientes");
    }
})

//Eliminar o borrar datos de clientes
router.delete('/', async (req: Request, res:Response) => {
    try{
        const {id} = req.body;
        const eliminado = await clientesServices.borrarCliente(Number(id));
        res.send(eliminado);
    }
    catch(error){
        res.status(400).send("No se pudo eliminar el cliente");
    }
})



export default router;