<template>
    <div class="container mt-5" v-if="articulos[0]">
        <div class="card">
            <div class="card-header">
                <h4>Editar personal</h4>
            </div>
                <div class="alert alert-warning" role="alert">
                    ¿Está seguro de eliminar la información?
                    <i class="fa fa-warning"></i>
                </div>
            <div class="card-body">
                    <div class="mb-3">
                        ID
                        <input type="text" class="form-control" v-model="articulos[0].id" disabled>
                    </div>
                    <div class="mb-3">
                        Descripcion
                        <input type="text" class="form-control" v-model="articulos[0].descripcion" disabled/>
                    </div>
                    <div class="mb-3">
                        Precio
                        <input type="text" class="form-control" v-model="articulos[0].precio" disabled/>
                    </div>
                    <div class="mb-3">
                        Cantidad en Almacen
                        <input type="text" class="form-control" v-model="articulos[0].cantidad_almacen" disabled/>
                    </div>
                    <div class="mb-3">
                        Fecha de Caducidad
                        <input type="text" class="form-control" v-model="articulos[0].fecha_caducidad" disabled/>
                    </div>
                    <div class="mb-3">
                        <button class="btn btn-danger" @click="eliminarArticulos(articulos[0])">Borrar</button>
                    </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useArticulos } from '../controladores/useArticulos';
const {traeArticulosId, eliminarArticulos, mensaje, articulos} = useArticulos();

let idArticulo = 0;
const route = useRoute();
const routeRedirect = useRouter();

watch(
    () => mensaje.value, 
    newID =>{
        routeRedirect.push('/articulos');
    }
);

onMounted(async() => {
    idArticulo = Number(route.params.id);
    await traeArticulosId(Number(idArticulo));
    
});


</script>

<style scoped>
    .errorValidacion {
        color: red;
        font-weight: bold;
    }
</style>