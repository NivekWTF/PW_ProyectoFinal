import { toTypedSchema } from "@vee-validate/zod";
import zod from "zod";

export const ArticuloSchema = toTypedSchema(
    zod.object({
        id: zod.number({message: 'Requerido'}).int().positive('Debe ser un número positivo'),
        descripcion: zod.string().min(1, {message: 'Descripción requerida'}).max(200, {message: 'Máximo 200 caracteres'}),
        precio: zod.string().min(1, {message: 'Precio requerido'}).max(15, {message: 'Máximo 999,999,999.99'}),
        cantidad_almacen: zod.string().min(1, {message: 'Precio requerido'}).max(15, {message: 'Máximo 999,999,999.99'}),
        fecha_caducidad: zod.string()
            .optional()
            .refine(
                (value) => !value || /^\d{4}-\d{2}-\d{2}$/.test(value),
                { message: 'Formato de fecha inválido (AAAA-MM-DD)' }
            )
            .refine(
                (value) => !value || new Date(value) > new Date(),
                { message: 'La fecha de caducidad debe ser futura' }
            ),
    }).or(
        zod.object({
        descripcion: zod.string().min(1, {message: 'Descripción requerida'}).max(200, {message: 'Máximo 200 caracteres'}),
        precio: zod.string().min(1, {message: 'Precio requerido'}).max(15, {message: 'Máximo 999,999,999.99'}),
        cantidad_almacen: zod.string().min(1, {message: 'Cantidad requerida'}).max(15, {message: 'Máximo 999,999,999.99'}),
        fecha_caducidad: zod.string()
            .optional()
            .refine(
                (value) => !value || /^\d{4}-\d{2}-\d{2}$/.test(value),
                { message: 'Formato de fecha inválido (AAAA-MM-DD)' }
            )
            .refine(
                (value) => !value || new Date(value) > new Date(),
                { message: 'La fecha de caducidad debe ser futura' }
            ),
    }))
);
