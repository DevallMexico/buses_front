<template>
  <div class="modal">
    <div class="content">
    <button class="close" @click="showModals">x</button>
    <h3>Agregar Conductores</h3>
    <form @submit.prevent="isDriverCreate ? onSaveDriver() : onUpdateDriver()">
      <input type="text" placeholder="Nombre" v-model="driverData.first_name">
      <input type="text" placeholder="Apellidos" v-model="driverData.last_name">
      <input type="text" placeholder="Edad" v-model="driverData.age">
      <input type="number" placeholder="Celular" v-model="driverData.cel_phone">
      <button type="submit">{{ isDriverCreate ? "Guardar" : "Actualizar" }}</button>
    </form>
    </div>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity';
import { onMounted } from 'vue';
import { createDriver, updateDriver } from '../actions';

export default {
  name: "DriversModalComponent",
  props: {
    showModal: Function,
    getDrivers: Function,
    selectedDriver: Object,
    isCreate: Boolean
  },
  setup (props) {
    const driverData = reactive({id: "", first_name: "", last_name: "", age: "", cel_phone: ""});
    onMounted (() => {
      const driver = props.selectedDriver;
      if (Object.keys(driver).length > 0) {
        driverData.id = driver.id;
        driverData.first_name = driver.first_name;
        driverData.last_name = driver.last_name;
        driverData.age = driver.age;
        driverData.cel_phone = driver.cel_phone;
      }
    });
    return {
      driverData,
      showModals: props.showModal,
      isDriverCreate: props.isCreate,
      onSaveDriver: () => {
        const data = JSON.parse(JSON.stringify(driverData));
        createDriver(data)
        .then(() => {
          props.getDrivers();
          props.showModal();
          alert("Conductor creado correctamente");
        })
        .catch(error => alert("Ocurrió un error: " + error));
      },
      onUpdateDriver: () => {
        const data = JSON.parse(JSON.stringify(driverData));
        updateDriver(data)
        .then(() => {
          props.getDrivers();
          props.showModal();
          alert("Conductor actualizado correctamente");
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