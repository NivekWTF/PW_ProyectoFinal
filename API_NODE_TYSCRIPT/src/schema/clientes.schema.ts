import { z } from 'zod';

// Expresión regular para validar teléfonos (permite números, espacios, guiones y prefijos internacionales)
const telefonoRegex = /^\+?[0-9\s-]+$/;

// Esquema de validación con Zod
export const clienteSchema = z.object({
    nombre: z.string()
        .min(3, "El nombre debe tener al menos 3 caracteres")
        .max(200, "El nombre no debe exceder los 200 caracteres"),
    direccion: z.string()
        .min(5, "La dirección debe tener al menos 5 caracteres")
        .max(200, "La dirección no debe exceder los 200 caracteres"),
    telefono: z.string()
        .regex(telefonoRegex, "El teléfono contiene caracteres no permitidos"),
    correoElectronico: z.string()
        .email("El correo electrónico no es válido")
        .max(100, "El correo electrónico no debe exceder los 100 caracteres"),
    ciudad: z.string()
        .min(2, "La ciudad debe tener al menos 2 caracteres")
        .max(50, "La ciudad no debe exceder los 50 caracteres")
}).or(z.object({
    id: z.number().int().positive().min(1).max(9999)
    })
).or(z.object({
    telefono: z.string().min(7).max(15)
    })
);
