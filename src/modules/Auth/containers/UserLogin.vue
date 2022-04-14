<template>
  <div class="container">
    <div class="row">
      <div class="text-center title">
        <h2>Iniciar Sesión</h2>
      </div>
      <div class="col-md-4 offset-md-4">
        <form @submit.prevent="onLogin">
          <div class="form-group">
            <label>Usuario</label>
            <input
              type="text"
              class="form-control"
              v-model="loginData.username"
            />
          </div>
          <div class="form-group">
            <label>Contraseña</label>
            <input
              type="password"
              class="form-control"
              v-model="loginData.password"
            />
          </div>
          <div class="text-center margin-row">
            <button class="btn btn-primary" type="submit">Acceder</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { userLogin } from "../auth";
import { notify } from "@kyvg/vue3-notification";
import { getMessageErrorFormat } from "@/modules/utils";

export default {
  name: "UserLogin",
  setup() {
    const router = useRouter();
    const loginData = reactive({ username: "", password: "" });
    const onLogin = () => {
      userLogin({ username: loginData.username, password: loginData.password })
        .then((response) => {
          localStorage.setItem("authToken", response.data.token);
          router.push({ name: "administration" });
          notify({
            title: "Administración",
            text: `Bienvenido al panel administrativo :)`,
            type: 'success'
          });
        })
        .catch((error) => notify({
          title: "Ocurrió un error",
          text: getMessageErrorFormat(error),
          type: 'error'
        }));
    };
    return { loginData, onLogin };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.title {
  margin-top: 7rem;
  margin-bottom: 1rem;
}
</style>
