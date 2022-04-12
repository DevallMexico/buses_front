<template>
  <NavBarMenu />
  <div class="container">
  <SchedulesModalComponent 
    v-if="isOpenModal" 
    :showModal="showModal" 
    :getSchedules="getSchedules" 
    :selectedSchedule="data.selectedSchedule"
    :isCreate="data.isCreate"/>

     <div class="margin-row">
  <div class="row"> 
    <div class="col-md-6">
      <h2>Horarios</h2>
    </div>
    <div class="col-md-2 text-center">
      <label>% de Capacidad Vendida</label>
      <select class="form-control" >
        <option >10%</option>
        <option >20%</option>
        <option >30%</option>
        <option >40%</option>
        <option >50%</option>
        <option >60%</option>
        <option >70%</option>
        <option >80%</option>
        <option >90%</option>
      </select>
    </div>
    <div class="col-md-2 text-center">
      <button class="btn btn-success add-button" @click="showModal">Buscar</button>
    </div>
    <div class="col-md-2 text-center">
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
      <th scope="col">Trayecto</th>
      <th scope="col">Fecha de salida</th>
      <th scope="col">Fecha de llegada</th>
      <th scope="col">Autobus</th>
      <th scope="col">Conductor</th>
      <th scope="col">Promedio de pasajeros</th>
      <th scope="col"></th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="schedule in data.schedules" :key="schedule.id">
      <th scope="row">{{ schedule.id }}</th>
      <td>{{ schedule.travel.origin }} - {{ schedule.travel.destiny }}</td>
      <td>{{ schedule.start_date }}</td>
      <td>{{ schedule.end_date }}</td>
      <td>{{ schedule.bus.brand }}</td>
      <td>{{ schedule.driver.first_name }}</td>
      <td>{{ schedule.avg_percentage }}</td>
      <td>
        <button class="btn btn-primary" @click="onEditSchedule(schedule.id)">Editar</button>
        &nbsp;
        <button class="btn btn-danger" @click="onDeleteSchedule(schedule.id)">Eliminar</button></td>
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
  import { onMounted, reactive, ref } from "vue";
  import { getScheduleList, deleteSchedule} from '../actions';
  import SchedulesModalComponent from '../components/SchedulesModalComponent.vue';

  export default {
    name: 'SchedulesContainer',
    components: {NavBarMenu, SchedulesModalComponent},
    setup () {
      const isOpenModal = ref(false);
      const data = reactive({schedules: [], selectedSchedule: {}, isCreate: true});
      const getSchedules = async () => {
        data.schedules = (await getScheduleList()).data;
      };
      const showModal = (isCreate=true) => {
        data.isCreate = isCreate;
        if (isCreate) data.selectedSchedule = {};
        isOpenModal.value = !isOpenModal.value;
      };
      onMounted (() => getSchedules());
      return {
        isOpenModal,
        data,
        showModal,
        getSchedules,
        onEditSchedule: (scheduleId) => {
          data.selectedSchedule = data.schedules.find(schedule => schedule.id === scheduleId); 
          showModal(false);
        },
        onDeleteSchedule: (scheduleId) => {
          deleteSchedule(scheduleId)
          .then(() => getSchedules())
          .catch(error => alert("Ocurrió un error: " + error))
        },
      };
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
 