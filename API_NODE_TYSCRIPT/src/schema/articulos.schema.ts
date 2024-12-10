import { z } from 'zod';

// Expresión regular para validar descripciones (opcional, aquí es libre)
const precioRegex = /^(?:\d+|\d*\.\d{1,2})$/;
const cantidadAlmacenRegex = /^\d+$/;

// Esquema de validación con Zod
export const articuloSchema = z.object({
    descripcion: z.string()
        .min(3, "La descripción debe tener al menos 3 caracteres")
        .max(255, "La descripción no debe exceder los 255 caracteres"),
    precio: z.string().regex(precioRegex, "El precio debe ser un número válido (ejemplo: 123, 123.45, .99)"),
    cantidad_almacen: z.string().min(1, "Cantidad requerida").max(15, "Máximo 999,999,999.99")
        .regex(cantidadAlmacenRegex, "La cantidad debe ser un número entero no negativo"),
    fecha_caducidad: z.string()
        .datetime({ offset: true })
        .or(z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Formato de fecha inválido (debe ser AAAA-MM-DD)"))
        .optional()
}).refine(data => data.fecha_caducidad == null || new Date(data.fecha_caducidad) > new Date(), {
    message: "La fecha de caducidad debe ser futura",
    path: ["fecha_caducidad"]
}).or(
    z.object({
        id: z.number().int().positive().min(1).max(9999)
    })
).or(z.object({
    precio: z.string().min(1, "Precio requerido").max(15, "Máximo 999,999,999.99")
    })
);
