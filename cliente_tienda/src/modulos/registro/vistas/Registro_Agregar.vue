<template>
    <div class="container mt-5">
        <div class="card">
            <div class="card-header">
                <h4>Agregar Registro</h4>
            </div>
            <div v-if="mensaje === 1" class="alert alert-success" role="alert">
                Registro agregado con éxito
            </div>
            <div class="card-body">
                <Form @submit="onSubmit" :validation-schema="RegistroSchema">
                    <!-- ID del Personal -->
                    <div class="mb-3">
                        <label for="idPersonal" class="form-label">ID del Personal</label>
                        <Field
                            name="idPersonal"
                            type="number"
                            class="form-control"
                            v-model="registro.idPersonal"
                        />
                        <ErrorMessage name="idPersonal" class="errorValidacion" />
                    </div>

                    <!-- Fecha (no editable) -->
                    <div class="mb-3">
                        <label for="fecha" class="form-label">Fecha</label>
                        <input
                            type="text"
                            class="form-control"
                            :value="fechaActual"
                            readonly
                        />
                    </div>

                    <!-- Hora (no editable) -->
                    <div class="mb-3">
                        <label for="hora" class="form-label">Hora</label>
                        <input
                            type="text"
                            class="form-control"
                            :value="horaActual"
                            readonly
                        />
                    </div>

                    <!-- Movimiento -->
                    <div class="mb-3">
                        <label for="movimiento" class="form-label">Movimiento</label>
                        <Field
                            name="movimiento"
                            as="select"
                            class="form-control"
                            v-model="registro.movimiento"
                        >
                            <option value="Entrada">Entrada</option>
                            <option value="Salida">Salida</option>
                        </Field>
                        <ErrorMessage name="movimiento" class="errorValidacion" />
                    </div>

                    <!-- Botón para enviar -->
                    <div class="mb-3">
                        <button class="btn btn-primary" type="submit">Agregar</button>
                    </div>
                </Form>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import { Field, Form, ErrorMessage } from "vee-validate";
import { useRegistro } from "../controladores/useRegistro";
import { toTypedSchema } from "@vee-validate/zod";
import zod from "zod";

// Esquema de validación para el formulario
const RegistroSchema = toTypedSchema(
    zod.object({
        idPersonal: zod.number({ message: "El ID del personal es obligatorio." }).positive("Debe ser un número positivo."),
        movimiento: zod.string({ message: "Debe seleccionar un movimiento." }).min(1, "Movimiento requerido."),
    })
);

const { registrarMovimiento, mensaje } = useRegistro();

const registro = ref({
    idPersonal: null,
    movimiento: "Entrada",
});

// Fecha y hora actualizadas dinámicamente
const fechaActual = ref(new Date().toLocaleDateString());
const horaActual = ref(new Date().toLocaleTimeString());

let intervalId: NodeJS.Timer;

onMounted(() => {
    intervalId = setInterval(() => {
        const ahora = new Date();
        fechaActual.value = ahora.toLocaleDateString();
        horaActual.value = ahora.toLocaleTimeString();
    }, 1000);
});

onBeforeUnmount(() => {
    clearInterval(intervalId); // Detiene el intervalo cuando el componente se desmonta
});

const onSubmit = async (values: any) => {
    const ahora = new Date();
    registro.value.fecha = ahora.toLocaleDateString();
    registro.value.hora = ahora.toLocaleTimeString();
    registro.value.idPersonal = values.idPersonal;
    registro.value.movimiento = values.movimiento;
    await registrarMovimiento(registro.value);
};
</script>

<style scoped>
.errorValidacion {
    color: red;
    font-weight: bold;
    margin-top: 5px;
}
</style>
