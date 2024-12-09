import { z } from 'zod';

// Expresión regular para validar teléfonos (permite números, espacios, guiones y prefijos internacionales)
const telefonoRegex = /^\+?[0-9\s-]+$/;

// Esquema de validación con Zod
export const clienteSchema = z.object({
    id: z.number()
        .int("El ID debe ser un número entero")
        .positive("El ID debe ser un número positivo"),
    nombre: z.string()
        .min(3, "El nombre debe tener al menos 3 caracteres")
        .max(200, "El nombre no debe exceder los 200 caracteres"),
    direccion: z.string()
        .min(5, "La dirección debe tener al menos 5 caracteres")
        .max(200, "La dirección no debe exceder los 200 caracteres"),
    telefono: z.string()
        .min(7, "El teléfono debe tener al menos 7 caracteres")
        .max(15, "El teléfono no debe exceder los 15 caracteres")
        .regex(telefonoRegex, "El teléfono contiene caracteres no permitidos"),
    correoElectronico: z.string()
        .email("El correo electrónico no es válido")
        .max(100, "El correo electrónico no debe exceder los 100 caracteres"),
    ciudad: z.string()
        .min(2, "La ciudad debe tener al menos 2 caracteres")
        .max(50, "La ciudad no debe exceder los 50 caracteres")
});
