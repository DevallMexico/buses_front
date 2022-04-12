<template>
  <NavBarMenu />
   <div class="container">
  <DriversModalComponent 
    v-if="isOpenModal" 
    :showModal="showModal" 
    :getDrivers="getDrivers" 
    :selectedDriver="data.selectedDriver"
    :isCreate="data.isCreate"/>


  <div class="margin-row">
  <div class="row"> 
    <div class="col-md-9">
      <h2>Conductores</h2>
    </div>
    <div class="col-md-3 text-center">
      <button class="btn btn-success add-button" @click="showModal">+ Agregar</button>
    </div>
  </div>
  </div>
  <div class="margin-row">
  <div class="row ">
    <div class="table-responsive">
  <table class="table table-hover">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Nombre(s)</th>
      <th scope="col">Apellidos</th>
      <th scope="col">Edad</th>
      <th scope="col">Télefono Celular</th>
      <th scope="col">Acciones</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="driver in data.drivers" :key="driver.id">
      <th scope="row">{{ driver.id }}</th>
      <td>{{ driver.first_name }}</td>
      <td>{{ driver.last_name }}</td>
      <td>{{ driver.age }}</td>
      <td>{{ driver.cel_phone }}</td>
      <td>
        <button class="btn btn-primary" @click="onEditDriver(driver.id)">Editar</button>
         &nbsp;
        <button class="btn btn-danger" @click="onDeleteDriver(driver.id)">Eliminar</button>
      </td>
    </tr>
 
  </tbody>
</table>
    </div>
  </div>
  </div>
   </div>

</template>

<script>
  import NavBarMenu from '../../../components/NavBarMenu.vue';
  import { onMounted, reactive, ref } from "vue";
  import { getDriversList, deleteDriver} from '../actions';
  import DriversModalComponent from '../components/DriversModalComponent.vue';

  export default {
    name: 'AdminDrivers',
    components: {NavBarMenu, DriversModalComponent},
    setup () {
      const isOpenModal = ref(false);
      const data = reactive({drivers: [], selectedDriver: {}, isCreate: true});
      const getDrivers = async () => {
        data.drivers = (await getDriversList()).data;
      };
      const showModal = (isCreate=true) => {
        data.isCreate = isCreate;
        if (isCreate) data.selectedDriver = {};
        isOpenModal.value = !isOpenModal.value;
      };
      onMounted (() => getDrivers());
      return {
        isOpenModal,
        data,
        showModal,
        getDrivers,
        onEditDriver: (driverId) => {
          data.selectedDriver = data.drivers.find(driver => driver.id === driverId); 
          showModal(false);
        },
        onDeleteDriver: (driverId) => {
          deleteDriver(driverId)
          .then(() => getDrivers())
          .catch(error => alert("Ocurrió un error: " + error))
        },
      };
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
 