<template>
  <NavBarMenu />
  <LoaderComponent v-if="isLoading" />
  <div class="container">
    <BusesModalComponent
      v-if="isOpenModal"
      :showModal="showModal"
      :getBuses="getBuses"
      :selectedBus="data.selectedBus"
      :isCreate="data.isCreate"
      :onSetLoading="onSetLoading"
    />
    <div class="margin-row">
      <div class="row">
        <div class="col-md-9">
          <h2>Autobuses</h2>
        </div>
        <div class="col-md-3 text-center">
          <button class="btn btn-success add-button" @click="showModal">
            + Agregar
          </button>
        </div>
      </div>
    </div>
    <div class="margin-row">
      <div class="row">
        <div class="table-responsive">
          <table class="table table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Marca</th>
                <th scope="col">Modelo</th>
                <th scope="col">Año</th>
                <th scope="col">Capacidad</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="bus in data.buses" :key="bus.id">
                <th scope="row">{{ bus.id }}</th>
                <td>{{ bus.brand }}</td>
                <td>{{ bus.model }}</td>
                <td>{{ bus.year }}</td>
                <td>{{ bus.capacity }}</td>
                <td>
                  <button class="btn btn-primary" @click="onEditBus(bus.id)">
                    Editar
                  </button>
                  &nbsp;
                  <button class="btn btn-danger" @click="onDeleteBus(bus.id)">
                    Eliminar
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBarMenu from "@/components/NavBarMenu.vue";
import LoaderComponent from "@/components/Loader.vue";
import { onMounted, reactive, ref } from "vue";
import { getBusesList, deleteBus } from "../actions";
import BusesModalComponent from "../components/BusesModalComponent.vue";

export default {
  name: "AdminBuses",
  components: { NavBarMenu, BusesModalComponent, LoaderComponent },
  setup() {
    const isLoading = ref(false);
    const isOpenModal = ref(false);
    const data = reactive({ buses: [], selectedBus: {}, isCreate: true });
    const onSetLoading = (state) => (isLoading.value = state);
    const getBuses = () => {
      onSetLoading(true);
      getBusesList()
        .then((response) => {
          data.buses = response.data;
          onSetLoading(false);
        })
        .catch((error) => {
          alert("Ocurrió un error: " + error);
          onSetLoading(false);
        });
    };
    const showModal = (isCreate = true) => {
      data.isCreate = isCreate;
      if (isCreate) data.selectedBus = {};
      isOpenModal.value = !isOpenModal.value;
    };
    onMounted(() => getBuses());
    return {
      onSetLoading,
      isLoading,
      isOpenModal,
      data,
      confirm: () => {},
      cancel: () => {},
      showModal,
      getBuses,
      onEditBus: (busId) => {
        data.selectedBus = data.buses.find((bus) => bus.id === busId);
        showModal(false);
      },
      onDeleteBus: (busId) => {
        onSetLoading(true);
        deleteBus(busId)
          .then(() => getBuses())
          .catch((error) => {
            alert("Ocurrió un error: " + error);
            onSetLoading(false);
          });
      },
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.add-button {
  margin-top: 0.6rem;
}
</style>
 