<template>
  <div class="margin-row">
    <div class="row">
      <div class="col-md-3">
        <h2>Horarios</h2>
      </div>
      <div class="col-md-7 text-center">
        <!--<label>% de Capacidad Vendida</label>
        <select class="form-control">
          <option>10%</option>
          <option>20%</option>
          <option>30%</option>
          <option>40%</option>
          <option>50%</option>
          <option>60%</option>
          <option>70%</option>
          <option>80%</option>
          <option>90%</option>
        </select>-->
        <div class="input-group">
        <input v-model="filters.origin" type="text" class="form-control" placeholder="Origen">
        <input v-model="filters.destiny" type="text" class="form-control" placeholder="Destino">
        <input v-model="filters.date" type="date" class="form-control">
        <div class="input-group-append">
            <button class="btn btn-outline-secondary" type="button" @click="onSearch(filters)">Buscar</button>
        </div>
        </div>
      </div>
      <div class="col-md-2 text-center">
        <button class="btn btn-success add-button" @click="onShowModal">
          + Agregar
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue';
export default {
  name: "SchedulesFilterComponent",
  props: {
    showModal: Function,
    onSearchSchedules: Function
  },
  setup (props) {
    const filters = reactive({origin: "", destiny: "", date: ""});
    return {
      filters,
      onShowModal: props.showModal,
      onSearch: props.onSearchSchedules,
    }
  }
};
</script>

<style>
</style>