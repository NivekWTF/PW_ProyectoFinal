import { toTypedSchema } from "@vee-validate/zod";
import zod from "zod";

export const ClienteSchema = toTypedSchema(
    zod.object({
        id: zod.number({ message: 'Requerido' })
            .int({ message: 'Debe ser un número entero' })
            .positive({ message: 'Debe ser un número positivo' }),
        nombre: zod.string()
            .min(3, { message: 'El nombre debe tener al menos 3 caracteres' })
            .max(200, { message: 'El nombre no debe exceder los 200 caracteres' }),
        direccion: zod.string()
            .min(5, { message: 'La dirección debe tener al menos 5 caracteres' })
            .max(200, { message: 'La dirección no debe exceder los 200 caracteres' }),
        telefono: zod.string()
            .min(7, { message: 'El teléfono debe tener al menos 7 dígitos' })
            .max(15, { message: 'El teléfono no debe exceder los 15 caracteres' })
            .regex(/^\+?[0-9\s-]+$/, { message: 'El teléfono debe contener solo números, espacios o guiones' }),
        correoElectronico: zod.string()
            .email({ message: 'El correo electrónico no es válido' })
            .max(100, { message: 'El correo electrónico no debe exceder los 100 caracteres' }),
        ciudad: zod.string()
            .min(2, { message: 'La ciudad debe tener al menos 2 caracteres' })
            .max(50, { message: 'La ciudad no debe exceder los 50 caracteres' })
    })
);
