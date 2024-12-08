import { toTypedSchema } from "@vee-validate/zod";
import zod from "zod";

export const ArticuloSchema = toTypedSchema(
    zod.object({
        id: zod.number({ message: 'Requerido' })
            .int({ message: 'Debe ser un número entero' })
            .positive({ message: 'Debe ser un número positivo' }),
        descripcion: zod.string()
            .min(3, { message: 'La descripción debe tener al menos 3 caracteres' })
            .max(255, { message: 'La descripción no debe exceder los 255 caracteres' }),
        precio: zod.number({ message: 'Requerido' })
            .positive({ message: 'El precio debe ser un número positivo' })
            .max(99999999.99, { message: 'El precio no puede exceder 99,999,999.99' }),
        cantidad_almacen: zod.number({ message: 'Requerido' })
            .int({ message: 'Debe ser un número entero' })
            .min(0, { message: 'La cantidad no puede ser negativa' }),
        fecha_caducidad: zod.string()
            .optional()
            .refine(
                (value) => !value || /^\d{4}-\d{2}-\d{2}$/.test(value),
                { message: 'Formato de fecha inválido (AAAA-MM-DD)' }
            )
            .refine(
                (value) => !value || new Date(value) > new Date(),
                { message: 'La fecha de caducidad debe ser futura' }
            )
    }).or(
        zod.object({
            descripcion: zod.string()
                .min(3, { message: 'La descripción debe tener al menos 3 caracteres' })
                .max(255, { message: 'La descripción no debe exceder los 255 caracteres' }),
            precio: zod.number({ message: 'Requerido' })
                .positive({ message: 'El precio debe ser un número positivo' })
                .max(99999999.99, { message: 'El precio no puede exceder 99,999,999.99' }),
        })
    )
);
