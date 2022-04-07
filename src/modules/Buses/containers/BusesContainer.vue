<template>
  <NavBarMenu />
  <BusesModalComponent 
    v-if="isOpenModal" 
    :showModal="showModal" 
    :getBuses="getBuses" 
    :selectedBus="data.selectedBus"
    :isCreate="data.isCreate"/>
  <h2>Autobuses</h2>
  <button @click="showModal">Agregar</button>
  <table class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Marca</th>
      <th scope="col">Modelo</th>
      <th scope="col">Año</th>
      <th scope="col">Capacidad</th>
      <th scope="col">Acciones</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="bus in data.buses" :key="bus.id">
      <th scope="row">{{ bus.id }}</th>
      <td>{{ bus.brand }}</td>
      <td>{{ bus.model }}</td>
      <td>{{ bus.year }}</td>
      <td>{{ bus.capacity }}</td>
      <td><button @click="onEditBus(bus.id)">Editar</button><button @click="onDeleteBus(bus.id)">Eliminar</button></td>
    </tr>
 
  </tbody>
</table>

</template>

<script>
  import NavBarMenu from '../../../components/NavBarMenu.vue';
  import { onMounted, reactive, ref } from "vue";
  import { getBusesList, deleteBus} from '../actions';
  import BusesModalComponent from '../components/BusesModalComponent.vue';

  export default {
    name: 'AdminBuses',
    components: {NavBarMenu, BusesModalComponent},
    setup () {
      const isOpenModal = ref(false);
      const data = reactive({buses: [], selectedBus: {}, isCreate: true});
      const getBuses = async () => {
        data.buses = (await getBusesList()).data;
      };
      const showModal = (isCreate=true) => {
        data.isCreate = isCreate;
        if (isCreate) data.selectedBus = {};
        isOpenModal.value = !isOpenModal.value;
      };
      onMounted (() => getBuses());
      return {
        isOpenModal,
        data,
        confirm: () => {}, 
        cancel: () => {}, 
        showModal,
        getBuses,
        onEditBus: (busId) => {
          data.selectedBus = data.buses.find(bus => bus.id === busId); 
          showModal(false);
        },
        onDeleteBus: (busId) => {
          deleteBus(busId)
          .then(() => getBuses())
          .catch(error => alert("Ocurrió un error: " + error))
        },
      };
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
 