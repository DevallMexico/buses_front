<template>
  <div class="container">
    <SchedulesFilterComponent
      :showModal="showModal"
      :onSearchSchedules="onSearchSchedules"
    />

    <div class="margin-row">
      <div class="row">
        <div class="table-responsive">
          <table class="table table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Trayecto</th>
                <th scope="col">Fecha de salida</th>
                <th scope="col">Fecha de llegada</th>
                <th scope="col">Autobus</th>
                <th scope="col">Promedio de pasajeros</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="schedule in data.schedules" :key="schedule.id">
                <th scope="row">{{ schedule.id }}</th>
                <td>
                  {{ schedule.travel.origin }} - {{ schedule.travel.destiny }}
                </td>
                <td>{{ schedule.start_date }}</td>
                <td>{{ schedule.end_date }}</td>
                <td>{{ schedule.bus.brand }}</td>
                <td>{{ schedule.avg_percentage }}</td>
                <td>
                  <button
                    class="btn btn-light"
                    @click="selectTravel(schedule)"
                  >
                    Asignar
                  </button>
                  &nbsp;
                  <button
                    class="btn btn-primary"
                    @click="onEditSchedule(schedule.id)"
                  >
                    Editar
                  </button>
                  &nbsp;
                  <button
                    class="btn btn-danger"
                    @click="onDeleteSchedule(schedule.id)"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  <SchedulesModalComponent
    v-if="isOpenModal"
    :showModal="showModal"
    :getSchedules="getSchedules"
    :selectedSchedule="data.selectedSchedule"
    :isCreate="data.isCreate"
    :onSetLoading="onLoading"
  />
</template>

<script>
import { onMounted, reactive, ref } from "vue";
import { getScheduleList, deleteSchedule } from "../actions";
import SchedulesModalComponent from "../components/SchedulesModalComponent.vue";
import SchedulesFilterComponent from "@/modules/Schedules/components/SchedulesFilterComponents.vue";
import { formatQueryParams } from "@/modules/Schedules/utils";
import { notify } from "@kyvg/vue3-notification";

export default {
  name: "SchedulesListContainer",
  components: {
    SchedulesModalComponent,
    SchedulesFilterComponent,
  },
  props: {
    onSetLoading: Function,
    onSelectTravel: Function
  },
  setup(props) {
    const isOpenModal = ref(false);
    const data = reactive({
      schedules: [],
      selectedSchedule: {},
      isCreate: true,
    });
    const getSchedules = async () => {
      props.onSetLoading(true);
      data.schedules = (await getScheduleList()).data;
      props.onSetLoading(false);
    };
    const showModal = (isCreate = true) => {
      data.isCreate = isCreate;
      if (isCreate) data.selectedSchedule = {};
      isOpenModal.value = !isOpenModal.value;
    };
    onMounted(() => getSchedules());
    return {
      isOpenModal,
      data,
      selectTravel: props.onSelectTravel,
      onLoading: props.onSetLoading,
      showModal,
      getSchedules,
      onEditSchedule: (scheduleId) => {
        data.selectedSchedule = data.schedules.find(
          (schedule) => schedule.id === scheduleId
        );
        showModal(false);
      },
      onDeleteSchedule: (scheduleId) => {
        props.onSetLoading(true);
        deleteSchedule(scheduleId)
        .then(() => {
          getSchedules();
          notify({title: "Horarios", text: "Horario eliminado correctamente.", type: 'warn'});
        })
        .catch(() => {
          notify({
            title: "Ocurrió un error",
            text: "No se puede eliminar el horario debidó a una relación con un trayecto",
            type: 'error'
          });
          props.onSetLoading(false);
        });
      },
      onSearchSchedules: (filters) => {
        props.onSetLoading(true);
        getScheduleList(formatQueryParams(filters))
          .then((response) => {
            props.onSetLoading(false);
            if (response.data.length === 0)
              alert("No se encontraron resultados de tu busqueda.");
            else data.schedules = response.data;
          })
          .catch((error) => console.log("Ocurrió un error: " + error));
      },
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
 