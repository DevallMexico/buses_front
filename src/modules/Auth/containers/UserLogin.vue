<template>
  <form @submit.prevent="onLogin">
    <input type="text" placeholder="Usuario" v-model="loginData.username"/>
    <input type="password" placeholder="Contraseña" v-model="loginData.password"/>
    <button type="submit">Acceder</button>
  </form>
  <p>¿No tienes cuenta? registrate <router-link to="/register">aquí</router-link></p>
</template>

<script>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { userLogin } from "../auth";

export default {
  name: 'UserLogin',
  setup () {
    const router = useRouter();
    const loginData = reactive({"username": "", "password": ""});
    const onLogin = () => { 
      userLogin({username: loginData.username, password: loginData.password})
      .then(response => {
        localStorage.setItem("authToken", response.data.token);
        router.push({name: "administration"});
      })
      .catch(error => alert("Ocurrió un error: " + error));
    };
    return {loginData, onLogin};
  }
 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
