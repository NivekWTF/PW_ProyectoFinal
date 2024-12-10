<template>
    <div class="container mt-5">
        <div class="card">
            <div class="card-header">
                <h4>Agregar Clientes</h4>
            </div>
            <div v-if="mensaje == 1" class="alert alert-success" role="alert">
                Datos agregados con éxito
            </div>
            <div class="card-body">
                <Form :validation-schema="ClienteSchema" @submit="onTodoBien">
                    <div class="mb-3">
                        Nombre
                        <Field name="nombre" type="text" class="form-control" v-model="cliente.nombre" />
                        <ErrorMessage name="nombre" class="errorValidacion" />
                    </div>
                    <div class="mb-3">
                        Direccion
                        <Field name="direccion" type="text" class="form-control" v-model="cliente.direccion" />
                        <ErrorMessage name="direccion" class="errorValidacion" />
                    </div>
                    <div class="mb-3">
                        Telefono
                        <Field name="telefono" type="text" class="form-control" v-model="cliente.telefono" />
                        <ErrorMessage name="telefono" class="errorValidacion" />
                    </div>
                    <div class="mb-3">
                        Correo electronico
                        <Field name="correo_electronico" type="text" class="form-control" v-model="cliente.correo_electronico" />
                        <ErrorMessage name="correo_electronico" class="errorValidacion" />
                    </div>
                    <div class="mb-3">
                        Ciudad
                        <Field name="ciudad" type="text" class="form-control" v-model="cliente.ciudad" />
                        <ErrorMessage name="ciudad" class="errorValidacion" />
                    </div>
                    <div class="mb-3">
                        <!-- <button class="btn btn-primary" @click="agregarPersonal(personal)" >Agregar</button> -->
                        <button class="btn btn-primary" type="submit" >Agregar</button>
                    </div>
                </Form>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { ClienteAgregar } from '../interfaces/clientes-interface';
import { useClientes } from '../controladores/useClientes';
const {agregarClientes, mensaje} = useClientes();
import { ClienteSchema } from '../schemas/clientesSchema';
import {Field, Form, ErrorMessage} from 'vee-validate';


    let cliente = ref<ClienteAgregar>({
        nombre: '',
        direccion: '',
        telefono: '',
        correo_electronico: '',
        ciudad: '',
    });

    const onTodoBien = async () => {
        await agregarClientes(cliente.value);
        console.log('aquisi');
    }
</script>

<style scoped>
    .errorValidacion {
        color: red;
        font-weight: bold;
    }
</style>