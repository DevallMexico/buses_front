<template>
  <div class="customModal">
    <div class="customModalContent">
      <div class="modal-header">
      <h4 class="modal-title">Horarios</h4>
      <button class="btn btn-secundary" @click="showModals">x</button>
    </div>
    <div class="container">
    <form @submit.prevent="isScheduleCreate ? onSaveSchedule() : onUpdateSchedule()">
      <div class="form-group">
        <label>Origen</label>
      <select class="form-control" v-model="data.schedule.travel">
        <option v-for="item in data.travels" :key="item.id" v-bind:value="item.id">{{ item.origin }} - {{ item.destiny }}</option>
      </select>
      </div>
      <div class="form-group">
        <label>Autobús</label>
      <select class="form-control" v-model="data.schedule.bus">
        <option v-for="item in data.buses" :key="item.id" v-bind:value="item.id">{{ item.brand }}</option>
      </select>
      </div>
      <div class="form-group">
        <label>Chofer</label>
      <select class="form-control" v-model="data.schedule.driver">
        <option v-for="item in data.drivers" :key="item.id" :value="item.id">{{ item.first_name }}</option>
      </select>
      </div>
      <div class="form-group">
        <label>Fecha y hora de salida</label>
      <input class="form-control" type="datetime-local" v-model="data.schedule.start_date">
      </div>
      <div class="form-group">
        <label>Fehca y hora de llegada</label>
      <input class="form-control" type="datetime-local" v-model="data.schedule.end_date">
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

export default {
  name: "SchedulesModalComponent",
  props: {
    showModal: Function,
    getSchedules: Function,
    selectedSchedule: Object,
    isCreate: Boolean
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
      data.buses = (await getBusesList()).data;
      data.drivers = (await getDriversList()).data;
      data.travels = (await getTravelsList()).data;
    });
    return {
      data,
      showModals: props.showModal,
      isScheduleCreate: props.isCreate,
      onSaveSchedule: () => {
        const scheduleData = JSON.parse(JSON.stringify(data.schedule));
        createSchedule(scheduleData)
        .then(() => {
          props.getSchedules();
          props.showModal();
          alert("Horario creado correctamente");
        })
        .catch(error => alert("Ocurrió un error: " + error));
      },
      onUpdateSchedule: () => {
        const scheduleData = JSON.parse(JSON.stringify(data.schedule));
        updateSchedule(scheduleData)
        .then(() => {
          props.getSchedules();
          props.showModal();
          alert("hORARIO actualizado correctamente");
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