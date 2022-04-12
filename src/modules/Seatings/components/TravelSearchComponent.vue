<template>
  <br>

  <div class="row">
    <div class="col-md-4 offset-md-4">
      <div class="text-center">
      <h2>Autobuses del Desierto</h2>
      </div>
      <br>
  <form @submit.prevent="onSearch(filters)">
    <div class="form-group">
      <label>Origen:</label>
      <input type="text" class="form-control" v-model="filters.origin"/>
    </div>
    <div class="form-group">
      <label>Destino:</label>
      <input type="text" class="form-control" v-model="filters.destiny"/>
    </div>
    <div class="form-group">
      <label>Fecha de salida:</label>
      <input type="date" class="form-control" v-model="filters.date"/>
    </div>
    <div class="text-center">
    <button type="submit" class="btn btn-primary">Buscar</button>
    </div>
  </form>
    </div>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity';
import { onMounted } from 'vue';

export default {
  name: "TravelSearchComponent",
  props: {
    onSearchTravel: Function
  },
  setup (props) {
    const filters = reactive({});
    onMounted (async () => {});
    return {
      filters,
      onSearch: props.onSearchTravel
    }
  }
};
</script>

<style scoped>

.form-group {
  margin-bottom: 1rem;
}


</style>