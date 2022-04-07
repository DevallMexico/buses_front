<template>
  <NavBarMenu />
  <TravelsModalComponent 
    v-if="isOpenModal" 
    :showModal="showModal" 
    :getTravels="getTravels" 
    :selectedTravel="data.selectedTravel"
    :isCreate="data.isCreate"/>
  <h2>Trayectos</h2>
  <button @click="showModal">Agregar</button>
  <table class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Origen</th>
      <th scope="col">Destino</th>
      <th scope="col">Conductor</th>
      <th scope="col">Autobús</th>
      <th scope="col">Fecha y hora de Salida</th>
      <th scope="col">Fecha y hora de Llegada</th>
      <th scope="col">Opciones</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="travel in data.travels" :key="travel.id">
      <th scope="row">{{ travel.id }}</th>
      <td>{{ travel.origin }}</td>
      <td>{{ travel.destiny }}</td>
      <td>{{ travel.driver.first_name }}</td>
      <td>{{ travel.bus.brand }}</td>
      <td>{{ travel.start_date }}</td>
      <td>{{ travel.end_date }}</td>
      <td><button @click="onEditTravel(travel.id)">Editar</button><button @click="onDeleteTravel(travel.id)">Eliminar</button></td>
    </tr>
 
  </tbody>
</table>

</template>

<script>
  import NavBarMenu from '../../../components/NavBarMenu.vue';
  import { onMounted, reactive, ref } from "vue";
  import { getTravelsList, deleteTravel} from '../actions';
  import TravelsModalComponent from '../components/TravelsModalComponent.vue';

  export default {
    name: 'AdmintTravels',
    components: {NavBarMenu, TravelsModalComponent},
    setup () {
      const isOpenModal = ref(false);
      const data = reactive({travels: [], selectedTravel: {}, isCreate: true});
      const getTravels = async () => {
        data.travels = (await getTravelsList()).data;
      };
      const showModal = (isCreate=true) => {
        data.isCreate = isCreate;
        if (isCreate) data.selectedTravel = {};
        isOpenModal.value = !isOpenModal.value;
      };
      onMounted (() => getTravels());
      return {
        isOpenModal,
        data,
        showModal,
        getTravels,
        onEditTravel: (travelId) => {
          data.selectedTravel = data.travels.find(travel => travel.id === travelId); 
          showModal(false);
        },
        onDeleteTravel: (travelId) => {
          deleteTravel(travelId)
          .then(() => getTravels())
          .catch(error => alert("Ocurrió un error: " + error))
        },
      };
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
 