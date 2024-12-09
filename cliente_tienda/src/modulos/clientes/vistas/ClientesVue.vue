<template>
    <section>
        <h3></h3>
        <h3>Clientes</h3>
        <div>
        <RouterLink :to="{path: '/clientes/agregar/'}">
            <button class="btn btn-sm btn-primary">
                Agregar <i class="fa fa-plus"></i>
            </button>
        </RouterLink>
        </div>
    </section>
    <table class="table table-striped table-hover">
        <thead>
            <tr>
                <th>Clave</th>
                <th>Nombre</th>
                <th>Direccion</th>
                <th>Telefono</th>
                <th>Correo Electrónico</th>
                <th>Ciudad</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            <tr v-if="clientes.length == 0">
                <td class="centrado" colspan="6">
                    Sin clientes registrados
                </td>
            </tr>
            <tr v-else v-for="cliente in clientes" :key="cliente.id">
                <td>{{cliente.id}}</td>
                <td>{{cliente.nombre}}</td>
                <td>{{cliente.direccion}}</td>
                <td>{{cliente.telefono}}</td>
                <td>{{cliente.correoElectronico}}</td>
                <td>{{cliente.ciudad}}</td>
                <td class="centrado">
                    <div class="btn-group" role="group" aria-label="Basic outlined example"></div>
                    <button type="button" class="btn btn-sm btn-outline-primary">
                        <RouterLink class="nav-link item" :to="{path: '/clientes/'+cliente.id+'/editar'}"><i class="fa fa-pencil"></i></RouterLink>
                    </button>
                    <button type="button" class="btn btn-sm btn-outline-danger">
                        <RouterLink class="nav-link item" :to="{path: '/clientes/'+cliente.id+'/eliminar'}"><i class="fa fa-trash"></i></RouterLink>
                    </button>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script setup lang="ts">
    import { onMounted } from 'vue';
    import { useClientes } from '../controladores/useClientes';
    const { traeClientes, clientes} = useClientes();
    onMounted(async() => {
       await traeClientes();
    });
</script>

<style scoped>

    section{
        display: flex;
        flex-flow: row wrap;
        justify-content: space-around;
        margin-top: 20px;
    }
    .centrado {
        text-align: center;
    }
</style>
