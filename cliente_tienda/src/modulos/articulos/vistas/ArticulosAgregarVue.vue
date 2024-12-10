<template>
    <div class="container mt-5">
        <div class="card">
            <div class="card-header">
                <h4>Agregar Articulos</h4>
            </div>
            <div v-if="mensaje == 1" class="alert alert-success" role="alert">
                Datos agregados con éxito
            </div>
            <div class="card-body">
                <Form :validation-schema="ArticuloSchema" @submit="onTodoBien">
                    <div class="mb-3">
                        Descripcion
                        <Field name="descripcion" type="text" class="form-control" v-model="articulo.descripcion" />
                        <ErrorMessage name="descripcion" class="errorValidacion" />
                    </div>
                    <div class="mb-3">
                        Precio
                        <Field name="precio" type="text" class="form-control" v-model="articulo.precio" />
                        <ErrorMessage name="precio" class="errorValidacion" />
                    </div>
                    <div class="mb-3">
                        Cantidad en Almacen
                        <Field name="cantidad_almacen" type="text" class="form-control" v-model="articulo.cantidad_almacen" />
                        <ErrorMessage name="cantidad_almacen" class="errorValidacion" />
                    </div>
                    <div class="mb-3">
                        Fecha de Caducidad
                        <Field name="fecha_caducidad" type="text" class="form-control" v-model="articulo.fecha_caducidad" />
                        <ErrorMessage name="fecha_caducidad" class="errorValidacion" />
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
import type { ArticuloAgregar } from '../interfaces/articulos-interface';
import { useArticulos } from '../controladores/useArticulos';
const {agregarArticulos, mensaje} = useArticulos();
import { ArticuloSchema } from '../schemas/ArticulosSchema';
import {Field, Form, ErrorMessage} from 'vee-validate';


    let articulo = ref<ArticuloAgregar>({
        descripcion: '',
        precio: 0,
        cantidad_almacen: 0,
        fecha_caducidad: '',
    });

    const onTodoBien = async () => {
        await agregarArticulos(articulo.value);
    }
</script>

<style scoped>
    .errorValidacion {
        color: red;
        font-weight: bold;
    }
</style>