<template>
  <div class="modal">
    <div class="content">
    <button class="close" @click="showModals">x</button>
    <h3>Agregar Autobuses</h3>
    <form @submit.prevent="isBusCreate ? onSaveBus() : onUpdateBus()">
      <input type="text" placeholder="Marca" v-model="busData.brand">
      <input type="text" placeholder="Modelo" v-model="busData.model">
      <input type="text" placeholder="Año" v-model="busData.year">
      <input type="number" placeholder="Capacidad" v-model="busData.capacity">
      <button type="submit">{{ isBusCreate ? "Guardar" : "Actualizar" }}</button>
    </form>
    </div>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity';
import { onMounted } from 'vue';
import { createBus, updateBus } from '../actions';

export default {
  name: "BusesModalComponent",
  props: {
    showModal: Function,
    getBuses: Function,
    selectedBus: Object,
    isCreate: Boolean
  },
  setup (props) {
    const busData = reactive({id: "", brand: "", model: "", year: "", capacity: ""});
    onMounted (() => {
      const bus = props.selectedBus;
      if (Object.keys(bus).length > 0) {
        busData.id = bus.id;
        busData.brand = bus.brand;
        busData.model = bus.model;
        busData.year = bus.year;
        busData.capacity = bus.capacity;
      }
    });
    return {
      busData,
      showModals: props.showModal,
      isBusCreate: props.isCreate,
      onSaveBus: () => {
        const data = JSON.parse(JSON.stringify(busData));
        createBus(data)
        .then(() => {
          props.getBuses();
          props.showModal();
          alert("Autobús creado correctamente");
        })
        .catch(error => alert("Ocurrió un error: " + error));
      },
      onUpdateBus: () => {
        const data = JSON.parse(JSON.stringify(busData));
        console.log("DSgsdg")
        updateBus(data)
        .then(() => {
          props.getBuses();
          props.showModal();
          alert("Autobús actualizado correctamente");
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