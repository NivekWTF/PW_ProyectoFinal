<template>
    <div class="container mt-5" v-if="articulos[0]">
        <div class="card">
            <div class="card-header">
                <h4>Editar personal</h4>
            </div>
                <div v-if="mensaje == 1" class="alert alert-success" role="alert">
                    Datos actualizados con éxito
                </div>
            <div class="card-body">
                <Form :validation-schema="ArticuloSchema" @submit="onTodoBien">
                    <div class="mb-3">
                        ID
                        <input type="text" class="form-control" v-model="articulos[0].id" disabled>
                    </div>
                    <div class="mb-3">
                        Descripcion
                        <Field name="descripcion" type="text" class="form-control" v-model="articulos[0].descripcion" />
                        <ErrorMessage name="descripcion" class="errorValidacion" />
                    </div>
                    <div class="mb-3">
                        Precio
                        <Field name="precio" type="text" class="form-control" v-model="articulos[0].precio" />
                        <ErrorMessage name="precio" class="errorValidacion" />
                    </div>
                    <div class="mb-3">
                        Cantidad en Almacen
                        <Field name="cantidad_almacen" type="text" class="form-control" v-model="articulos[0].cantidad_almacen" />
                        <ErrorMessage name="cantidad_almacen" class="errorValidacion" />
                    </div>
                    <div class="mb-3">
                        Fecha de Caducidad
                        <Field name="fecha_caducidad" type="text" class="form-control" v-model="articulos[0].fecha_caducidad" />
                        <ErrorMessage name="fecha_caducidad" class="errorValidacion" />
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
import { useArticulos } from '../controladores/useArticulos';
const {traeArticulosId, actualizarArticulos, mensaje, articulos} = useArticulos();
import { ArticuloSchema } from '../schemas/ArticulosSchema';
import {Field, Form, ErrorMessage} from 'vee-validate';

let idArticulo = 0;
const route = useRoute();

onMounted(async() => {
    idArticulo = Number(route.params.id);
    await traeArticulosId(Number(idArticulo));
    
});

const onTodoBien = async () => {
    await actualizarArticulos(articulos.value[0]);
}

</script>

<style scoped>
    .errorValidacion {
        color: red;
        font-weight: bold;
    }
</style>