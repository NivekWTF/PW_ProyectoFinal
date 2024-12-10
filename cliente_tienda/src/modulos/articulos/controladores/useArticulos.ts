import { ref } from "vue"
import type { Articulos, ArticuloAgregar } from "../interfaces/articulos-interface"
import ArticulosAPI from "../api/articulosAPI"

export const useArticulos = () => {
    const articulos = ref<Articulos[]>([])
    let mensaje = ref(0);

    const traeArticulos = async () => {
        const respuesta = await ArticulosAPI.get<Articulos[]>('/')
        articulos.value = respuesta.data
        console.log(articulos.value)
    }

    const traeArticulosId = async (id:number) => {
        const respuesta = await ArticulosAPI.get<Articulos[]>('/'+id)
        articulos.value = respuesta.data
        console.log(articulos.value)
    }

    const agregarArticulos = async (articulos:ArticuloAgregar) => {
        const respuesta = await ArticulosAPI.post('/', articulos)
        console.log(respuesta.data)
        if(respuesta.data.affectedRows >= 1){
            console.log('1')
           mensaje.value = 1
           
        }
    }

    const actualizarArticulos = async (articulos:Articulos) => {
        const respuesta = await ArticulosAPI.put('/', articulos)
        if(respuesta.data.affectedRows >= 1){
            mensaje.value = 1
        }
    }

    const eliminarArticulos = async (articulos:Articulos) => {
        const respuesta = await ArticulosAPI.delete('/',{data: {id: articulos.id}})
        if(respuesta.data.fieldCount == 0){
            mensaje.value = 1
        }
    }

    return {
        articulos,
        mensaje,
        traeArticulos,
        agregarArticulos,
        traeArticulosId,
        actualizarArticulos,
        eliminarArticulos
    }
}