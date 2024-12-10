import { ref } from "vue";
import type { Registro } from "../interfaces/registro-interface";
import registroAPI from "../api/registroAPI";

export const useRegistro = () => {
    const registros = ref<Registro[]>([]);
    let mensaje = ref(0);

    // Obtener todos los registros
    const traeRegistros = async () => {
        const respuesta = await registroAPI.get<Registro[]>('/');
        registros.value = respuesta.data;
        console.log(registros.value);
    };

    // Obtener un registro por ID del personal
    const traeRegistroPorIdPersonal = async (idPersonal: string) => {
        const respuesta = await registroAPI.get<Registro[]>('/' + idPersonal);
        registros.value = respuesta.data;
    };

    // Agregar un nuevo registro
    const registrarMovimiento = async (registro: Registro) => {
        const respuesta = await registroAPI.post('/', registro);
        if (respuesta.data.affectedRows >= 1) {
            mensaje.value = 1; // Indica éxito
        }
    };

    // Actualizar un registro (si fuera necesario)
    const actualizarRegistro = async (registro: Registro) => {
        const respuesta = await registroAPI.put('/', registro);
        if (respuesta.data.affectedRows >= 1) {
            mensaje.value = 1;
        }
    };

    // Eliminar un registro por ID (opcional)
    const eliminarRegistro = async (idPersonal: string) => {
        const respuesta = await registroAPI.delete('/', { data: { idPersonal } });
        if (respuesta.data.fieldCount === 0) {
            mensaje.value = 1;
        }
    };

    return {
        registros,
        mensaje,
        traeRegistros,
        traeRegistroPorIdPersonal,
        registrarMovimiento,
        actualizarRegistro,
        eliminarRegistro,
    };
};
