<template>
  <select v-model="model">
    <option v-for="item in selectData" :key="item.id" v-bind:value="item.id">{{ item.value }}</option>
  </select>
</template>

<script>
import { onMounted, ref } from 'vue';
export default {
  name: "SelectComponent",
  props: {
    data: Object,
    vModel: String
  },
  setup (props) {
    const selectData = ref({});
    onMounted (() => selectData.value = props.data);
    return {
      selectData,
      model: props.vModel
    }
  }
}
</script>

<style>

</style>