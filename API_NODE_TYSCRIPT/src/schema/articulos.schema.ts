import { z } from 'zod';

// Expresión regular para validar descripciones (opcional, aquí es libre)
const descripcionRegex = /^[\w\s.,-]{3,255}$/;

// Esquema de validación con Zod
export const articuloSchema = z.object({
    id: z.number().int().positive().optional(), // Campo opcional (para nuevos registros sin ID)
    descripcion: z.string()
        .min(3, "La descripción debe tener al menos 3 caracteres")
        .max(255, "La descripción no debe exceder los 255 caracteres")
        .regex(descripcionRegex, "La descripción contiene caracteres no permitidos"),
    precio: z.number()
        .positive("El precio debe ser un número positivo")
        .max(99999999.99, "El precio no puede exceder 99,999,999.99"),
    cantidad_almacen: z.number()
        .int("La cantidad en almacén debe ser un número entero")
        .min(0, "La cantidad en almacén no puede ser negativa"),
    fecha_caducidad: z.string()
        .datetime({ offset: true })
        .or(z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Formato de fecha inválido (debe ser AAAA-MM-DD)"))
        .optional()
}).refine(data => data.fecha_caducidad == null || new Date(data.fecha_caducidad) > new Date(), {
    message: "La fecha de caducidad debe ser futura",
    path: ["fecha_caducidad"]
});
