<template>
  <div class="customModal">
    <div class="customModalContent">
      <div class="modal-header">
        <h4 class="modal-title">Autobus</h4>
        <button class="btn btn-secundary" @click="showModals">x</button>
      </div>
      <div class="container"> 
        <form @submit.prevent="isBusCreate ? onSaveBus() : onUpdateBus()">
        <div class="form-group">
          <label>Marca:</label>
          <input class="form-control" type="text" v-model="busData.brand">
        </div>
         <div class="form-group">
          <label>Modelo:</label>
          <input class="form-control" type="text" v-model="busData.model">
        </div>
         <div class="form-group">
          <label>Año:</label>
          <input class="form-control" type="text" v-model="busData.year">
        </div>
         <div class="form-group">
          <label>Capacidad:</label>
          <input  class="form-control" type="number" v-model="busData.capacity">
        </div>
        <div class="text-center margin-row">
          <button class="btn btn-primary" type="submit">{{ isBusCreate ? "Guardar" : "Actualizar" }}</button>
          &nbsp;
          <button @click="showModals" class="btn btn-light" type="submit">Cancelar</button>
        </div>
      </form>
      </div>
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
  
</style>