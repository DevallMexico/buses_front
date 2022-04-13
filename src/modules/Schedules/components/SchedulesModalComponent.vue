<template>
  <div class="customModal" id="modal">
    <div class="customModalContent">
      <div class="modal-header">
        <h4 class="modal-title">Horarios</h4>
        <button class="btn btn-secundary" @click="showModals">x</button>
      </div>
      <div class="container">
        <form @submit.prevent="onSaveUpdateSchedule">
          <div class="form-group">
            <label>Trayecto</label>
            <select class="form-control" v-model="data.schedule.travel" required>
              <option value="" selected disabled hidden>Selecciona un trayecto</option>
              <option v-for="item in data.travels" :key="item.id" v-bind:value="item.id">{{ item.origin }} - {{ item.destiny }}</option>
            </select>
          </div>
          <div class="form-group">
            <label>Autobús</label>
            <select class="form-control" v-model="data.schedule.bus" required>
              <option value="" selected disabled hidden>Selecciona un autobús</option>
              <option v-for="item in data.buses" :key="item.id" v-bind:value="item.id">{{ item.brand }}</option>
            </select>
          </div>
          <div class="form-group">
            <label>Chofer</label>
            <select class="form-control" v-model="data.schedule.driver" required>
              <option value="" selected disabled hidden>Selecciona un chofer</option>
              <option v-for="item in data.drivers" :key="item.id" :value="item.id">{{ item.first_name }}</option>
            </select>
          </div>
          <div class="form-group">
            <label>Fecha y hora de salida</label>
            <input class="form-control" type="datetime-local" v-model="data.schedule.start_date" required>
          </div>
          <div class="form-group">
            <label>Fehca y hora de llegada</label>
            <input class="form-control" type="datetime-local" v-model="data.schedule.end_date" required>
          </div>
          <div class="text-center margin-row">
            <button class="btn btn-primary" type="submit">{{ isScheduleCreate ? "Guardar" : "Actualizar" }}</button>
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
import { createSchedule, updateSchedule } from '../actions';
import { getBusesList } from '../../Buses/actions';
import { getDriversList } from '../../Drivers/actions';
import { getTravelsList } from '@/modules/Travels/actions';
import { handleCreateUpdate } from '../../utils';

export default {
  name: "SchedulesModalComponent",
  props: {
    showModal: Function,
    getSchedules: Function,
    selectedSchedule: Object,
    isCreate: Boolean,
    onSetLoading: Function,
  },
  setup (props) {
    const data = reactive({
      schedule: {
        id: "", 
        travel: "", 
        bus: "", 
        driver: "", 
        start_date: "", 
        end_date: ""
      }, 
      buses: [], 
      drivers: [],
      travels: [],
    });
    onMounted (async () => {
      const schedule = props.selectedSchedule;
      if (Object.keys(schedule).length > 0) {
        data.schedule.id = schedule.id;
        data.schedule.travel = schedule.travel.id;
        data.schedule.bus = schedule.bus.id;
        data.schedule.driver = schedule.driver.id;
        data.schedule.start_date = (new Date(schedule.start_date)).toISOString().substring(0, 16);
        data.schedule.end_date = (new Date(schedule.end_date)).toISOString().substring(0, 16);
      }
      props.onSetLoading(true);
      data.buses = (await getBusesList()).data;
      data.drivers = (await getDriversList()).data;
      data.travels = (await getTravelsList()).data;
      props.onSetLoading(false);
      document.getElementById("modal").style.display = "flex";
    });
    return {
      data,
      showModals: props.showModal,
      isScheduleCreate: props.isCreate,
      onSaveUpdateSchedule: () => {
        handleCreateUpdate(
          props.isCreate, 
          createSchedule, 
          updateSchedule, 
          data.schedule, 
          props.onSetLoading, 
          props.showModal, 
          props.getSchedules, 
          "Horario"
        );
      },
    }
  }
};
</script>

<style scoped>
#modal {
  display: none;
}
</style>