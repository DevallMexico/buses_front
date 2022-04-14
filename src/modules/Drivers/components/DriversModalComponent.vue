<template>
  <div class="customModal" id="modal">
    <div class="customModalContent">
      <div class="modal-header">
        <h4 class="modal-title">Conductores</h4>
        <button class="btn btn-secundary" @click="showModals">x</button>
      </div>
      <div class="container"> 
        <form @submit.prevent="onSaveUpdateDriver">
          <div class="form-group">
            <label>Nombre(s)</label>
          <input type="text" class="form-control" v-model="driverData.first_name" required>
          </div>
          <div class="form-group">
            <label>Apellidos</label>
          <input type="text" class="form-control" v-model="driverData.last_name" required>
          </div>
          <div class="form-group">
            <label>Edad</label>
          <input type="text" class="form-control" v-model="driverData.age" required>
          </div>
          <div class="form-group">
            <label>Número de telefono</label>
          <input type="number" class="form-control" v-model="driverData.cel_phone" required>
          </div>
          <div class="text-center margin-row">
            <button class="btn btn-primary" type="submit">{{ isDriverCreate ? "Guardar" : "Actualizar" }}</button>
            &nbsp;
            <button class="btn btn-light" @click="showModals">Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity';
import { onMounted } from 'vue';
import { createDriver, updateDriver } from '../actions';
import { handleCreateUpdate } from '../../utils';

export default {
  name: "DriversModalComponent",
  props: {
    showModal: Function,
    getDrivers: Function,
    selectedDriver: Object,
    isCreate: Boolean,
    onSetLoading: Function,
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
      onSaveUpdateDriver: () => {
        handleCreateUpdate(
          props.isCreate, 
          createDriver, 
          updateDriver, 
          driverData, 
          props.onSetLoading, 
          props.showModal, 
          props.getDrivers, 
          "Chofer"
        );
      },
    }
  }
};
</script>

<style scoped>
</style>