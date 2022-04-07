<template>
  <div class="modal">
    <div class="content">
    <button class="close" @click="showModals">x</button>
    <h3>Agregar Trayectos</h3>
    <form @submit.prevent="isTravelCreate ? onSaveTravel() : onUpdateTravel()">
      <input type="text" placeholder="Origen" v-model="data.travel.origin">
      <input type="text" placeholder="Destino" v-model="data.travel.destiny">
      <select v-model="data.travel.bus">
        <option v-for="item in data.buses" :key="item.id" v-bind:value="item.id">{{ item.brand }}</option>
      </select>
      <select v-model="data.travel.driver">
        <option v-for="item in data.drivers" :key="item.id" :value="item.id">{{ item.first_name }}</option>
      </select>
      <input type="datetime-local" placeholder="Destino" v-model="data.travel.start_date">
      <input type="datetime-local" placeholder="Destino" v-model="data.travel.end_date">
      <button type="submit">{{ isTravelCreate ? "Guardar" : "Actualizar" }}</button>
    </form>
    </div>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity';
import { onMounted } from 'vue';
import { createTravel, updateTravel } from '../actions';
import { getBusesList } from '../../Buses/actions';
import { getDriversList } from '../../Drivers/actions';
// import SelectComponent from '../../../components/SelectComponent.vue';

export default {
  name: "TravelModalComponent",
  // components: {SelectComponent},
  props: {
    showModal: Function,
    getTravels: Function,
    selectedTravel: Object,
    isCreate: Boolean
  },
  setup (props) {
    const data = reactive({travel: {id: "", origin: "", destiny: "", bus: "", driver: "", start_date: "", end_date: ""}, buses: [], drivers: []});
    onMounted (async () => {
      const travel = props.selectedTravel;
      if (Object.keys(travel).length > 0) {
        data.travel.id = travel.id;
        data.travel.origin = travel.origin;
        data.travel.destiny = travel.destiny;
        data.travel.bus = travel.bus.id;
        data.travel.driver = travel.driver.id;
        data.travel.start_date = (new Date(travel.start_date)).toISOString().substring(0, 16);
        data.travel.end_date = (new Date(travel.end_date)).toISOString().substring(0, 16);
      }
      data.buses = (await getBusesList()).data;
      data.drivers = (await getDriversList()).data;
    });
    return {
      data,
      showModals: props.showModal,
      isTravelCreate: props.isCreate,
      onSaveTravel: () => {
        const dataTravel = JSON.parse(JSON.stringify(data.travel));
        createTravel(dataTravel)
        .then(() => {
          props.getTravels();
          props.showModal();
          alert("Trayecto creado correctamente");
        })
        .catch(error => alert("Ocurrió un error: " + error));
      },
      onUpdateTravel: () => {
        const dataTravel = JSON.parse(JSON.stringify(data.travel));
        updateTravel(dataTravel)
        .then(() => {
          props.getTravels();
          props.showModal();
          alert("Trayecto actualizado correctamente");
        })
        .catch(error => alert("Ocurrió un error: " + error));
      }
    }
  }
};
</script>

<style scoped>
  .modal {
    position: absolute;
    top: 0px;
    left: 0px;
    bottom: 0px;
    right: 0px;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;
  }

  .content {
    position: relative;
    width: 300px;
    height: 300px;
    z-index: 30;
    background-color: #fff;
    margin-top: -10rem;
  }
</style>