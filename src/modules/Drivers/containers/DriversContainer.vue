<template>
  <NavBarMenu />
  <LoaderComponent v-if="isLoading"/>
   <div class="container">
  <DriversModalComponent 
    v-if="isOpenModal" 
    :showModal="showModal" 
    :getDrivers="getDrivers" 
    :selectedDriver="data.selectedDriver"
    :isCreate="data.isCreate"
    :onSetLoading="onSetLoading"/>


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
  import LoaderComponent from '../../../components/Loader.vue';
  import { onMounted, reactive, ref } from "vue";
  import { getDriversList, deleteDriver} from '../actions';
  import DriversModalComponent from '../components/DriversModalComponent.vue';
  import { basicAuth } from "@/modules/utils";
  import { notify } from "@kyvg/vue3-notification";

  export default {
    name: 'AdminDrivers',
    components: {NavBarMenu, DriversModalComponent, LoaderComponent},
    setup () {
      const isLoading = ref(false);
      const isOpenModal = ref(false);
      const data = reactive({drivers: [], selectedDriver: {}, isCreate: true});
      const onSetLoading = (state) => isLoading.value = state;
      const getDrivers = async () => {
        onSetLoading(true);
        data.drivers = (await getDriversList()).data;
        onSetLoading(false);
      };
      const showModal = (isCreate=true) => {
        data.isCreate = isCreate;
        if (isCreate) data.selectedDriver = {};
        isOpenModal.value = !isOpenModal.value;
      };
      onMounted (() => {basicAuth(); getDrivers()});
      return {
        isOpenModal,
        data,
        onSetLoading,
        isLoading,
        showModal,
        getDrivers,
        onEditDriver: (driverId) => {
          data.selectedDriver = data.drivers.find(driver => driver.id === driverId); 
          showModal(false);
        },
        onDeleteDriver: (driverId) => {
          onSetLoading(true);
          deleteDriver(driverId)
          .then(() => { 
            getDrivers();
            notify({title: "Choferes", text: "Chofer eliminado correctamente.", type: 'warn'});
          })
          .catch(() => {
            notify({
              title: "Ocurrió un error",
              text: "No se puede eliminar el chofer debidó a una relación con un trayecto",
              type: 'error'
            });
            onSetLoading(false);
          })
        },
      };
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
 