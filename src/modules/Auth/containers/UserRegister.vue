<template>
  <form @submit="onRegister">
    <input type="text" placeholder="Nombre(s)" v-model="first_name"/>
    <input type="text" placeholder="Apellidos" v-model="last_name"/>
    <input type="text" placeholder="telefono" v-model="profile.cel_phone"/>
    <input type="email" placeholder="Correo Electrónico" v-model="email"/>
    <input type="password" placeholder="Contraseña" v-model="password"/>
    <input type="password" placeholder="Confirmar Contraseña" v-model="repeat_password"/>
    <button type="submit">Registrarse</button>
    <router-link to="/register"><button >Cancelar</button></router-link>
  </form>
</template>

<script>
import { reactive } from "vue";
import { userRegister } from "../auth";

const registerData = reactive({
  first_name: "", 
  last_name: "",
  profile: {
    cel_phone: ""
  },
  email: "",
  password: "",
  repeat_password: ""
});

const onRegister = (event) => { 
  event.preventDefault();
  const data = JSON.parse(JSON.stringify(registerData));
  data.username = data.email;
  userRegister(data)
  .then(response => console.log(response.data))
  .catch(error => alert("Ocurrió un error: " + error));
};

export default {
  name: 'UserRegister',
 
  methods: {
    onRegister
  },
  data() {
    return registerData
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
