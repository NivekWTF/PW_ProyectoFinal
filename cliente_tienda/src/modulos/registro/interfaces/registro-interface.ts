export interface Registro {
    idPersonal: string; // ID del personal asociado al movimiento
    fecha: string; // Fecha del movimiento (formato: 'YYYY-MM-DD')
    hora: string; // Hora del movimiento (formato: 'HH:mm')
    movimiento: 'entrada' | 'salida'; // Tipo de movimiento
}
