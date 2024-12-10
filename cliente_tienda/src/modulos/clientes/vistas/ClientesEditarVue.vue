<template>
    <div class="container mt-5" v-if="clientes[0]">
        <div class="card">
            <div class="card-header">
                <h4>Editar cliente</h4>
            </div>
                <div v-if="mensaje == 1" class="alert alert-success" role="alert">
                    Datos actualizados con éxito
                </div>
            <div class="card-body">
                <Form :validation-schema="ClienteSchema" @submit="onTodoBien">
                    <div class="mb-3">
                        ID
                        <input type="text" class="form-control" v-model="clientes[0].id" disabled>
                    </div>
                    <div class="mb-3">
                        Nombre
                        <Field name="nombre" type="text" class="form-control" v-model="clientes[0].nombre" />
                        <ErrorMessage name="nombre" class="errorValidacion" />
                    </div>
                    <div class="mb-3">
                        Dirección
                        <Field name="direccion" type="text" class="form-control" v-model="clientes[0].direccion" />
                        <ErrorMessage name="direccion" class="errorValidacion" />
                    </div>
                    <div class="mb-3">
                        Telefono
                        <Field name="telefono" type="text" class="form-control" v-model="clientes[0].telefono" />
                        <ErrorMessage name="telefono" class="errorValidacion" />
                    </div>
                    <div class="mb-3">
                        Correo Electronico
                        <Field name="correo_electronico" type="text" class="form-control" v-model="clientes[0].correo_electronico  " />
                        <ErrorMessage name="correo_electronico" class="errorValidacion" />
                    </div>
                    <div class="mb-3">
                        Ciudad
                        <Field name="ciudad" type="text" class="form-control" v-model="clientes[0].ciudad  " />
                        <ErrorMessage name="ciudad" class="errorValidacion" />
                    </div>
                    <div class="mb-3">
                        <button class="btn btn-primary" type="submit">Actualizar</button>
                    </div>
                </Form>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useClientes } from '../controladores/useClientes';
const {traeClientesId, actualizarClientes, mensaje, clientes} = useClientes();
import { ClienteSchema } from '../schemas/clientesSchema';
import {Field, Form, ErrorMessage} from 'vee-validate';

let idCliente = 0;
const route = useRoute();

onMounted(async() => {
    idCliente = Number(route.params.id);
    await traeClientesId(Number(idCliente));
    
});

const onTodoBien = async () => {
    console.log(clientes.value[0]);
    await actualizarClientes(clientes.value[0]);
}

</script>

<style scoped>
    .errorValidacion {
        color: red;
        font-weight: bold;
    }
</style>