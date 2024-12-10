<template>
    <div class="container mt-5">
        <div class="card">
            <div class="card-header">
                <h4>Lista de Registros</h4>
            </div>
            <div class="card-body">
                <div v-if="registros.length === 0" class="alert alert-info">
                    No hay registros disponibles.
                </div>
                <table v-else class="table table-striped">
                    <thead>
                        <tr>
                            <th>ID Personal</th>
                            <th>Fecha</th>
                            <th>Hora</th>
                            <th>Movimiento</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="registro in registros" :key="registro.idPersonal + registro.fecha + registro.hora">
                            <td>{{ registro.idPersonal }}</td>
                            <td>{{ registro.fecha }}</td>
                            <td>{{ registro.hora }}</td>
                            <td>{{ registro.movimiento }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <!-- FAB Button -->
        <button class="btn btn-primary fab-button" @click="irARegistroAdd">
            +
        </button>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useRegistro } from "../controladores/useRegistro";
import { useRouter } from "vue-router";

const { registros, traeRegistros } = useRegistro();
const router = useRouter();

// Llamar a la función para cargar los registros al montar el componente
onMounted(async () => {
    await traeRegistros();
});

// Navegación a la página de agregar registro
const irARegistroAdd = () => {
    router.push("/clientes/registro");
};
</script>

<style scoped>
.fab-button {
    position: fixed;
    bottom: 20px;
    right: 20px;
    border-radius: 50%;
    width: 60px;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
    z-index: 1000;
}

.fab-button i {
    font-size: 24px;
    color: white;
}
</style>
