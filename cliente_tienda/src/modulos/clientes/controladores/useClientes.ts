import { ref } from "vue"
import type { Clientes, ClienteAgregar } from "../interfaces/clientes-interface"
import ClientesAPI from "../api/clientesAPI"

export const useClientes = () => {
    const clientes = ref<Clientes[]>([])
    let mensaje = ref(0);

    const traeClientes = async () => {
        const respuesta = await ClientesAPI.get<Clientes[]>('/')
        clientes.value = respuesta.data
        console.log(clientes.value)
    }

    const traeClientesId = async (id:number) => {
        const respuesta = await ClientesAPI.get<Clientes[]>('/'+id)
        clientes.value = respuesta.data
    }

    const agregarClientes = async (clientes:ClienteAgregar) => {
        const respuesta = await ClientesAPI.post('/', clientes)
        if(respuesta.data.affectedRows >= 1){
           mensaje.value = 1
        }
    }

    const actualizarClientes = async (clientes:Clientes) => {
        const respuesta = await ClientesAPI.put('/', clientes)
        if(respuesta.data.affectedRows >= 1){
            mensaje.value = 1
        }
    }

    const eliminarClientes = async (clientes:Clientes) => {
        const respuesta = await ClientesAPI.delete('/',{data: {id: clientes.id}})
        if(respuesta.data.fieldCount == 0){
            mensaje.value = 1
        }
    }

    return {
        clientes,
        mensaje,
        traeClientes,
        agregarClientes,
        traeClientesId,
        actualizarClientes,
        eliminarClientes
    }
}