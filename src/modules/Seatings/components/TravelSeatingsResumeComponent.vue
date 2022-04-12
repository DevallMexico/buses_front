<template>
  <br>
  <div class="row">
    <div class="col-md-6 offset-md-3">
      <div class="text-center card">
        <div class="card-body">
          <h1>Resumen y confirmación</h1>
          <hr>
          <p><strong>Trayecto:</strong></p>
          <p>{{ travel.travel.origin }} - {{ travel.travel.destiny }}</p>
          <p><strong>Autobús:</strong></p>
          <p>{{ travel.bus.brand }} {{ travel.bus.model }} {{ travel.bus.year }}</p>
          <p><strong>Salida y Llegada:</strong></p>
          <p>{{ travel.start_date }} - {{ travel.end_date }}</p>
          <p><strong>Conductor:</strong></p>
          <p>{{ travel.driver.first_name }} {{ travel.driver.last_name }}</p>
          <div v-for="seat in seatings" :key="seat.seat_number">
            <p><strong>Asiento #{{ seat.seat_number }}:</strong></p>
            <p>{{ seat.first_name }} {{ seat.last_name }}</p>
          </div>
          <hr>
          <button class="btn btn-light" @click="backSteps">Regresar</button>
          &nbsp;
          <button class="btn btn-primary" @click="onSaveSeatings">Confirmar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createSeat, createMultipleSeatings } from '../actions';
import { useRouter } from "vue-router";
export default {
  name: "TravelSeatingsResumeComponent",
  props: {
    seatingsData: Array,
    travel: Object,
    backStep: Function
  },
  setup (props) {
    const router = useRouter();
    return {
      backSteps: props.backStep,
      seatings: props.seatingsData,
      onSaveSeatings: () => {
        const seatings = props.seatingsData;
        const travelScheduleId = props.travel.id;
        const isMultipleSeatings = seatings.length > 1;

        if (isMultipleSeatings) {
          createMultipleSeatings({seatings, travel_schedule:travelScheduleId})
          .then(() => {
            alert("Asientos reservados Correctamente");
            router.push({name: "Schedules"});
          })
          .catch(error => alert("ha ocurrido un error: " + error))
        } else {
          createSeat({...seatings[0], travel_schedule: travelScheduleId})
          .then(() => {
            alert("Asientos reservados Correctamente");
            router.push({name: "Schedules"});
          })
          .catch(error => alert("Ocurrió un error: " + error))

        }
      }
    }
  }
}
</script>

<style>

</style>