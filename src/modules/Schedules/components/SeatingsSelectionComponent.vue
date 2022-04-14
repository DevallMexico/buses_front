<template>
  <br />
  <br />
  <div class="text-center">
    <h1>Selección de Asientos</h1>
    <p><strong>Autobus:</strong> {{ travelObject.bus.brand }}</p>
    <p><strong>Chofer: </strong> {{ travelObject.driver.first_name }}</p>
  </div>
  <br />
  <div class="row">
    <div class="col-md-4 offset-md-4">
      <div class="row">
        <div
          :class="['seatContainer', 'col-md-6']"
          v-for="(seat, index) in seatings"
          :key="index"
          @click="onSelectedSeat(seat)"
        >
          <h5
            :class="[
              index + 1 < 10 ? 'oneDigitMargin' : 'twoDigistMargin',
              getImageClass(seat, true),
            ]"
          >
            {{ index + 1 }}
          </h5>
          <img :class="['seat', getImageClass(seat)]" />
        </div>
      </div>
    </div>
    <div class="col-md-4">
      <p><span class="badge bg-success">Asientos Libres</span></p>
      <p><span class="badge bg-danger">Asientos Ocupados</span></p>
      <p><span class="badge bg-warning">Asientos Seleccionados</span></p>
    </div>
  </div>
  <br />
  <br />
  <div class="text-center">
    <button class="btn btn-light" @click="setSteps(1)">Regresar</button>
    &nbsp;
    <button class="btn btn-primary" @click="onNext">Siguiente</button>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import { getOccupiedSeats } from "@/modules/Schedules/actions";
import { notify } from "@kyvg/vue3-notification";
import { getMessageErrorFormat } from "@/modules/utils";

export default {
  name: "SeatingSelectionComponent",
  props: {
    travel: Object,
    onNextStep: Function,
    setStep: Function,
    onSetLoading: Function,
  },
  setup(props) {
    const seatings = ref([]);
    const getSeatings = () => {
      props.onSetLoading(true);
      getOccupiedSeats(props.travel.id)
        .then((response) => {
          const occupiedSeats = response.data;
          for (let i = 1; i <= props.travel.bus.capacity; i++) {
            const seat = occupiedSeats.find((seat) => seat.seat_number === i);
            seatings.value.push({
              isOccupied: !!seat,
              isSelected: false,
              seatNumber: i,
              seatClass: "seatFree",
            });
          }
          props.onSetLoading(false);
        })
        .catch((error) => {
          notify({
            title: "Ocurrió un error",
            text: getMessageErrorFormat(error),
            type: 'error'
          });
          props.onSetLoading(false);
        });
    };
    onMounted(() => getSeatings());
    return {
      setSteps: props.setStep,
      seatings,
      travelObject: props.travel,
      onNext: () => {
        const selectedSeats = seatings.value.filter((seat) => seat.isSelected);
        if (selectedSeats.length === 0)
          notify({title: "Asientos", text: "Necesitas seleccionar al menos un asiento para continuar", type: 'warn'});
        else {
          props.onNextStep(selectedSeats);
        }
      },
      onSelectedSeat: (seat) => {
        if (seat.isOccupied)
          notify({title: "Asientos", text: "El asiento que seleccionaste ya está ocupado.", type: 'error'});
        else seat.isSelected = !seat.isSelected;
      },
      getImageClass: (seat, isNumber = false) => {
        let className = "";
        if (seat.isSelected)
          className = isNumber ? "selectSeatNumber" : "seatSelect";
        else if (seat.isOccupied)
          className = isNumber ? "occupiedSeatNumber" : "seatOcuppied";
        else className = isNumber ? "freeSeatNumber" : "seatFree";
        return className;
      },
    };
  },
};
</script>

<style scoped>
.seatContainer {
  margin-bottom: 1rem;
  cursor: pointer;
}

.seatContainer h5 {
  position: absolute;
  margin-top: 0.5rem;
}

.oneDigitMargin {
  margin-left: 7.39%;
}

.twoDigistMargin {
  margin-left: 7.2%;
}

.seat {
  width: 4rem;
  height: 4rem;
  display: block;
  margin: auto;
}

.occupiedSeatNumber {
  color: #8e2222;
}

.selectSeatNumber {
  color: #cab312;
}

.freeSeatNumber {
  color: #38952f;
}

.seatFree {
  content: url("../../../assets/seatFree.png");
}

.seatSelect {
  content: url("../../../assets/seatSelect.png");
}

.seatOcuppied {
  content: url("../../../assets/seatBusy.png");
}
</style>