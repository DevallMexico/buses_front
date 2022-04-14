<template>
  <NavBarMenu />
  <SchedulesListComponent 
    v-if="data.step === 1" 
    :onSetLoading="onSetLoading"
    :onSelectTravel="onSelectTravel"
  />
  <SeatingsSelectionComponent
    v-if="data.step === 2"
    :travel="data.travel"
    :onNextStep="onNextStep"
    :setStep="setStep"
    :onSetLoading="onSetLoading"
  />
  <SeatingsDataComponent
    v-if="data.step === 3"
    :selectedSeatings="data.selectedSeatings"
    :onNextSeatingsData="onNextSeatingsData"
    :setStep="setStep"
  />
  <TravelSeatingsResumeComponent
    v-if="data.step === 4"
    :seatingsData="data.seatingsData"
    :travel="data.travel"
    :setStep="setStep"
    :onSetLoading="onSetLoading"
  />
  <LoaderComponent v-if="isLoading" />
</template>

<script>
import NavBarMenu from "@/components/NavBarMenu.vue";
import SchedulesListComponent from "@/modules/Schedules/components/SchedulesListComponent.vue";
import { onMounted, reactive, ref } from "vue";
import SeatingsSelectionComponent from "../../Schedules/components/SeatingsSelectionComponent.vue";
import SeatingsDataComponent from "../../Schedules/components/SeatingsDataComponent.vue";
import TravelSeatingsResumeComponent from "../../Schedules/components/TravelSeatingsResumeComponent.vue";
import LoaderComponent from "../../../components/Loader.vue";
import { basicAuth } from "@/modules/utils";

export default {
  name: "SchedulesContainer",
  components: {
    SeatingsSelectionComponent,
    SeatingsDataComponent,
    TravelSeatingsResumeComponent,
    NavBarMenu,
    LoaderComponent,
    SchedulesListComponent
  },
  setup() {
    const data = reactive({
      step: 1,
      travel: {},
      selectedSeatings: [],
      seatingsData: [],
    });
    const isLoading = ref(false);
    const onSetLoading = (state) => (isLoading.value = state);
    onMounted(() => basicAuth());
    return {
      data,
      isLoading,
      onSetLoading,
      onSelectTravel: (travel) => {
        data.travel = travel;
        data.step = 2;
      },
      onNextStep: (seatings) => {
        data.selectedSeatings = seatings;
        data.step = 3;
      },
      onNextSeatingsData: (seatingsData) => {
        data.seatingsData = seatingsData;
        data.step = 4;
      },
      setStep: (step) => {
        data.step = step;
      },
    };
  },
};
</script>

<style>
</style>