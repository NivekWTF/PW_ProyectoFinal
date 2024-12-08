<template>
    <section>
        <h3></h3>
        <h3>Articulos</h3>
        <div>
        <RouterLink :to="{path: '/articulos/agregar/'}">
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
                <th>Descripcion</th>
                <th>Precio</th>
                <th>Cantidad en Almacen</th>
                <th>Fecha de Caducidad</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            <tr v-if="articulos.length == 0">
                <td class="centrado" colspan="6">
                    Sin articulos registrados
                </td>
            </tr>
            <tr v-else v-for="articulo in articulos" :key="articulo.id">
                <td>{{articulo.id}}</td>
                <td>{{articulo.descripcion}}</td>
                <td>{{articulo.precio}}</td>
                <td>{{articulo.cantidad_almacen}}</td>
                <td>{{articulo.fecha_caducidad}}</td>
                <td class="centrado">
                    <div class="btn-group" role="group" aria-label="Basic outlined example"></div>
                    <button type="button" class="btn btn-sm btn-outline-primary">
                        <RouterLink class="nav-link item" :to="{path: '/articulos/'+articulo.id+'/editar'}"><i class="fa fa-pencil"></i></RouterLink>
                    </button>
                    <button type="button" class="btn btn-sm btn-outline-danger">
                        <RouterLink class="nav-link item" :to="{path: '/articulos/'+articulo.id+'/eliminar'}"><i class="fa fa-trash"></i></RouterLink>
                    </button>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script setup lang="ts">
    import { onMounted } from 'vue';
    import { useArticulos } from '../controladores/useArticulos';
    const { traeArticulos, articulos} = useArticulos();
    onMounted(async() => {
       await traeArticulos();
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
