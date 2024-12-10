<template>
    <div class="container mt-5" v-if="clientes[0]">
        <div class="card">
            <div class="card-header">
                <h4>Eliminar cliente</h4>
            </div>
                <div class="alert alert-warning" role="alert">
                    ¿Está seguro de eliminar la información?
                    <i class="fa fa-warning"></i>
                </div>
            <div class="card-body">
                    <div class="mb-3">
                        ID
                        <input type="text" class="form-control" v-model="clientes[0].id" disabled>
                    </div>
                    <div class="mb-3">
                        Nombre
                        <input type="text" class="form-control" v-model="clientes[0].nombre" />
                    </div>
                    <div class="mb-3">
                        Dirección
                        <input type="text" class="form-control" v-model="clientes[0].direccion" />
                    </div>
                    <div class="mb-3">
                        Telefono
                        <input type="text" class="form-control" v-model="clientes[0].telefono" />
                    </div>
                    <div class="mb-3">
                        Correo Electronico
                        <input type="text" class="form-control" v-model="clientes[0].correo_electronico  " />
                    </div>
                    <div class="mb-3">
                        Ciudad
                        <input type="text" class="form-control" v-model="clientes[0].ciudad  " />
                    </div>
                    <div class="mb-3">
                        <button class="btn btn-danger" @click="eliminarClientes(clientes[0])">Borrar</button>
                    </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useClientes } from '../controladores/useClientes';
const {traeClientesId, eliminarClientes, mensaje, clientes} = useClientes();

let idCliente = 0;
const route = useRoute();
const routeRedirect = useRouter();

watch(
    () => mensaje.value, 
    newID =>{
        routeRedirect.push('/clientes');
    }
);

onMounted(async() => {
    idCliente = Number(route.params.id);
    await traeClientesId(Number(idCliente));
});


</script>

<style scoped>
    .errorValidacion {
        color: red;
        font-weight: bold;
    }
</style>