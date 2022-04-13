<template>
  <div class="customModal" id="modal">
    <div class="customModalContent">
      <div class="modal-header">
        <h4 class="modal-title">Trayectos</h4>
        <button class="btn btn-secundary" @click="showModals">x</button>
      </div>
      <div class="container"> 
        <form @submit.prevent="onSaveUpdateTravel">
          <div class="form-group">
            <label>Origen</label>
            <input type="text" class="form-control" v-model="data.travel.origin">
          </div>
          <div class="form-group">
            <label>Destino</label>
            <input type="text" class="form-control" v-model="data.travel.destiny">
          </div>
          <div class="text-center margin-row">
            <button class="btn btn-primary" type="submit">{{ isTravelCreate ? "Guardar" : "Actualizar" }}</button>
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
import { createTravel, updateTravel } from '../actions';
import { handleCreateUpdate } from '../../utils';

export default {
  name: "TravelModalComponent",
  props: {
    showModal: Function,
    getTravels: Function,
    selectedTravel: Object,
    isCreate: Boolean,
    onSetLoading: Function,
  },
  setup (props) {
    const data = reactive({travel: {id: "", origin: "", destiny: ""}});
    onMounted (() => {
      const travel = props.selectedTravel;
      if (Object.keys(travel).length > 0) {
        data.travel.id = travel.id;
        data.travel.origin = travel.origin;
        data.travel.destiny = travel.destiny;
      }
    });
    return {
      data,
      showModals: props.showModal,
      isTravelCreate: props.isCreate,
      onSaveUpdateTravel: () => {
        handleCreateUpdate(
          props.isCreate, 
          createTravel, 
          updateTravel, 
          data.travel, 
          props.onSetLoading, 
          props.showModal, 
          props.getTravels, 
          "Trayecto"
        )
      },
    }
  }
};
</script>

<style scoped>
</style>