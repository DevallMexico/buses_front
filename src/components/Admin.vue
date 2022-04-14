<template>
  <NavBarMenu />
  <div class="text-center">
    <h1 class="title">Bienvenido a turismos del desierto</h1>
  </div>
</template>

<script>
import NavBarMenu from "./NavBarMenu.vue";
import { onMounted } from "vue";
import { basicAuth } from "@/modules/utils";

export default {
  name: "AdminHome",
  components: { NavBarMenu },
  setup () {
    onMounted(() => basicAuth())
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.title {
  margin-top: 4rem;
}

.table-responsive {
  overflow-y: hidden;
}
</style>
