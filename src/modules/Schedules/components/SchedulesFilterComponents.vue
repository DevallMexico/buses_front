<template>
  <div class="margin-row">
    <div class="row">
      <div class="col-md-3">
        <h2>Horarios</h2>
      </div>
      <div class="col-md-7 text-center">
        <div class="input-group">
        <select class="form-control" v-model="filters.travel">
          <option value="" selected disabled hidden>Selecciona un trayecto</option>
          <option value="">Sin Filtro</option>
          <option v-for="travel in travels" :key="travel.id" :value="travel.id">{{ travel.origin }} - {{ travel.destiny }}</option>
        </select>
        <select v-model="filters.sold_capacity" class="form-control">
          <option value="" selected disabled hidden>Capacidad Vendida</option>
          <option value="">Sin Filtro</option>
          <option value="10">Mayor a 10%</option>
          <option value="20">Mayor a 20%</option>
          <option value="30">Mayor a 30%</option>
          <option value="40">Mayor a 40%</option>
          <option value="50">Mayor a 50%</option>
          <option value="60">Mayor a 60%</option>
          <option value="70">Mayor a 70%</option>
          <option value="80">Mayor a 80%</option>
          <option value="90">Mayor a 90%</option>
        </select>
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
import { reactive, ref, onMounted } from 'vue';
import { getTravelsList } from '@/modules/Travels/actions';
export default {
  name: "SchedulesFilterComponent",
  props: {
    showModal: Function,
    onSearchSchedules: Function
  },
  setup (props) {
    const filters = reactive({travel: "", sold_capacity: "", date: ""});
    const travels = ref([]);
    onMounted(() => getTravelsList().then((response) => travels.value = response.data));
    return {
      filters,
      travels,
      onShowModal: props.showModal,
      onSearch: props.onSearchSchedules,
    }
  }
};
</script>

<style>
</style>