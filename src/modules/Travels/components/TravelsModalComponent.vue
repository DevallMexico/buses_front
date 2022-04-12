<template>
  <div class="customModal">
    <div class="customModalContent">
      <div class="modal-header">
      <h4 class="modal-title">Trayectos</h4>
      <button class="btn btn-secundary" @click="showModals">x</button>
    </div>
    <div class="container"> 
    <form @submit.prevent="isTravelCreate ? onSaveTravel() : onUpdateTravel()">
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