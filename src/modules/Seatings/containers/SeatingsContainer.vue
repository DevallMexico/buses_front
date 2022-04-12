<template>
  <NavBarMenu/>
  <div class="container">
    <TravelSearchComponent 
      v-if="data.step === 1" 
      :onSearchTravel="onSearchTravel" />
    <TravelSelectionComponent 
      v-if="data.step === 2" 
      :travels="data.travels" 
      :onSelectTravel="onSelectTravel" 
      :backStep="backStep"/>
    <SeatingsSelectionComponent 
      v-if="data.step === 3" 
      :travel="data.travel" 
      :onNextStep="onNextStep" 
      :backStep="backStep"/>
    <SeatingsDataComponent 
      v-if="data.step === 4" 
      :selectedSeatings="data.selectedSeatings" 
      :onNextSeatingsData="onNextSeatingsData"
      :backStep="backStep"/>
    <TravelSeatingsResumeComponent 
      v-if="data.step === 5" 
      :seatingsData="data.seatingsData" 
      :travel="data.travel"
      :backStep="backStep"/>
  </div>
</template>

<script>
  import { reactive } from "vue";
  import TravelSearchComponent from '../components/TravelSearchComponent.vue';
  import TravelSelectionComponent from '../components/TravelSelectionComponent.vue';
  import SeatingsSelectionComponent from '../components/SeatingsSelectionComponent.vue';
  import SeatingsDataComponent from '../components/SeatingsDataComponent.vue';
  import TravelSeatingsResumeComponent from '../components/TravelSeatingsResumeComponent.vue';
  import { getScheduleList } from '../../Schedules/actions';
  import { formatQueryParams } from '../utils';
  import NavBarMenu from '../../../components/NavBarMenu.vue';

  export default {
    name: 'SeatingsContainer',
    components: {
      TravelSearchComponent, 
      TravelSelectionComponent, 
      SeatingsSelectionComponent, 
      SeatingsDataComponent, 
      TravelSeatingsResumeComponent,
      NavBarMenu,
    },
    setup () {
      const data = reactive({travels: [], step: 1, travel: {}, selectedSeatings: [], seatingsData: []})
      return {
        data,
        onSearchTravel: (filters) => {
          getScheduleList(formatQueryParams(filters))
          .then(response => {
            if (response.data.length === 0) alert("No se encontraron resultados de tu busqueda.")
            else {
               data.travels = response.data;
               // data.travels.first_name = response.data.driver.first_name;
               document.body.style.backgroundImage = "none";
               data.step = 2;
            }
          })
          .catch(error => console.log("Ocurrió un error: " + error))
        },
        onSelectTravel: (travel) => {
          data.travel = travel;
          data.step = 3;
        },
        onNextStep: (seatings) => {
          data.selectedSeatings = seatings;
          data.step = 4;
        },
        onNextSeatingsData: (seatingsData) => {
          data.seatingsData = seatingsData;
          data.step = 5;
        },
        backStep: () => {
          console.log("Here")
          data.step = data.step - 1;
          // if(data.step === 1) document.body.style.backgroundImage = 'url("../../../assets/fondo2.jpg")';
        }
      }
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
 