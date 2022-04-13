<template>
  <NavBarMenu />
  <LoaderComponent v-if="isLoading"/>
  <div class="container">
  <TravelsModalComponent 
    v-if="isOpenModal" 
    :showModal="showModal" 
    :getTravels="getTravels" 
    :selectedTravel="data.selectedTravel"
    :isCreate="data.isCreate"
    :onSetLoading="onSetLoading"/>

  <div class="margin-row">
  <div class="row"> 
    <div class="col-md-9">
      <h2>Trayectos</h2>
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
      <th scope="col">Origen</th>
      <th scope="col">Destino</th>
      <th scope="col">Opciones</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="travel in data.travels" :key="travel.id">
      <th scope="row">{{ travel.id }}</th>
      <td>{{ travel.origin }}</td>
      <td>{{ travel.destiny }}</td>
      <td>
        <button class="btn btn-primary" @click="onEditTravel(travel.id)">Editar</button>
        &nbsp;
        <button class="btn btn-danger" @click="onDeleteTravel(travel.id)">Eliminar</button>
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
  import { getTravelsList, deleteTravel} from '../actions';
  import TravelsModalComponent from '../components/TravelsModalComponent.vue';

  export default {
    name: 'AdmintTravels',
    components: {NavBarMenu, TravelsModalComponent, LoaderComponent},
    setup () {
      const isLoading = ref(false);
      const isOpenModal = ref(false);
      const data = reactive({travels: [], selectedTravel: {}, isCreate: true});
      const onSetLoading = (state) => isLoading.value = state;
      const getTravels = async () => {
        onSetLoading(true);
        data.travels = (await getTravelsList()).data;
        onSetLoading(false);
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
        onSetLoading,
        isLoading,
        showModal,
        getTravels,
        onEditTravel: (travelId) => {
          data.selectedTravel = data.travels.find(travel => travel.id === travelId); 
          showModal(false);
        },
        onDeleteTravel: (travelId) => {
          onSetLoading(true);
          deleteTravel(travelId)
          .then(() => getTravels())
          .catch(error => {
            onSetLoading(false);
            alert("Ocurrió un error: " + error)
          })
        },
      };
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
 