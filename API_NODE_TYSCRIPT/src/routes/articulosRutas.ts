import express,{Request, Response} from 'express';
import * as articulosServices from '../services/articulosServices';
const router = express.Router();

//http://localhost:3001/api/articulos/ 
router.get('/', async (_req: Request, res:Response) => {
    let articulos = await articulosServices.obtieneArticulos();
    res.send(articulos)
})
//http://localhost:3001/api/articulos/1
router.get('/:id', async (req: Request, res:Response) => {
    let articulos = await articulosServices.encuentraArticulos(Number(req.params.id));
    res.send(articulos)
})

//http://localhost:3001/api/articulos/descrip/refresco
router.get('/descrip/:descrip', async (req: Request, res:Response) => {
    let articulos = await articulosServices.encuentraArticuloDescripcion(req.params.descrip);
    res.send(articulos)
})

router.post('/', async (req: Request, res:Response) => {
    try{
        const {descripcion, precio, cantidad_almacen, fecha_caducidad} = req.body;
        const nuevo = await articulosServices.agregarArticulo({
            descripcion,
            precio,
            cantidad_almacen,
            fecha_caducidad
        });
        res.send(nuevo);
    }
    catch(error){
        res.status(400).send("No se pudo insertar el articulo");
    }
})

//Modificar datos
router.put('/', async (req: Request, res:Response) => {
    try{
        const {id,descripcion, precio, cantidad_almacen, fecha_caducidad} = req.body;
        const modificado = await articulosServices.modificarArticulo({
            id,
            descripcion,
            precio,
            cantidad_almacen,
            fecha_caducidad
        });
        res.send(modificado);
    }
    catch(error){
        res.status(400).send("No se pudo actualizar el articulo");
    }
})

//Eliminar o borrar datos de articulos
router.delete('/', async (req: Request, res:Response) => {
    try{
        const {id} = req.body;
        const eliminado = await articulosServices.borrarArticulo(Number(id));
        res.send(eliminado);
    }
    catch(error){
        res.status(400).send("No se pudo eliminar el articulo");
    }
})



export default router;