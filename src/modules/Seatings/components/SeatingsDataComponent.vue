<template>
  <br>
  <div class="row">
    <div class="col-md-8 offset-md-2">
      <h2>Datos de Asientos</h2>
      <br>
      <div class="row">  
        <div class="col-md-6 margin-row" v-for="seat in seatingsData" :key="seat.seatNumber">
          <h3>Asiento: {{ seat.seat_number }}</h3>
          <div class="form-group">
            <label>Nombre(s)</label>
            <input type="text" v-model="seat.first_name" class="form-control form-control-sm" />
          </div>
          <div class="form-group">
            <label>Apellidos</label>
            <input type="text" v-model="seat.last_name" class="form-control form-control-sm" />
          </div>
          <div class="form-group">
            <label>Edad</label>
            <input type="text" v-model="seat.age" class="form-control form-control-sm" />
          </div>
        </div>
      </div>
      <br>
      <div class="text-center">
        <button class="btn btn-light" @click="backSteps">Regresar</button>
        &nbsp;
        <button class="btn btn-primary" @click="onFillSeatingsData">Continuar</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
export default {
  name: "SeatingsDataComponent",
  props: {
    selectedSeatings: Array,
    onNextSeatingsData: Function,
    backStep: Function
  },
  setup (props) {
    const seatingsData = ref([]);
    onMounted (() => {
      for(let i=0; i < props.selectedSeatings.length; i++) {
        const seat = props.selectedSeatings[i];
        seatingsData.value.push({seat_number: seat.seatNumber, first_name: "", last_name: "", age: ""});
      }
    })
    return {
      backSteps: props.backStep,
      seatings: props.selectedSeatings,
      seatingsData,
      onFillSeatingsData: () => {
        props.onNextSeatingsData(seatingsData);
      }
    }
  }
}
</script>

<style>

</style>