<template>
  <br>
  <h1>Selección de Trayecto</h1>
  <br>
  <div class="margin-row">
  <div class="row ">
    <div class="table-responsive">
  <table class="table table-hover">
  <thead>
    <tr>
      <th scope="col">Hora de Salida</th>
      <th scope="col">Hora de Llegada</th>
      <th scope="col">Conductor</th>
      <th scope="col">Autobus</th>
      <th scope="col"></th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="travel in travelsData" :key="travel.id">
      <th scope="row">{{ timeFormat(travel.start_date) }}</th>
      <td>{{ timeFormat(travel.end_date) }}</td>
      <td>{{ travel.driver.first_name }} {{ travel.driver.last_name }}</td>
      <td>{{ travel.bus.brand }}</td>
      <td><button class="btn btn-primary" @click="onSelectedTravel(travel)">Elegir --></button></td>
    </tr>
  </tbody>
</table>
    </div>
  </div>
  <div class="text-center">
    <button class="btn btn-light" @click="onBackStep">Regresar</button>
  </div>
  </div>
  
</template>

<script>
export default {
  name: "TravelSelectionComponent",
  props: {
    travels: Array,
    onSelectTravel: Function,
    backStep: Function
  },
  setup (props) {
    return {
      travelsData: props.travels,
      onSelectedTravel: props.onSelectTravel,
      onBackStep: props.backStep,
      timeFormat: (date) => {
        const newDate = new Date(date);
        return `${newDate.getHours() < 10 ? '0' + newDate.getHours() : newDate.getHours()}:${newDate.getMinutes()}`
      }
    }
  },
}
</script>

<style scoped>
body {
  background-color: white;
  background-image: none;
}
</style>