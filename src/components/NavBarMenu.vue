<template>
  <h1>Administración</h1>
  <nav>
    <router-link to="/buses">Autobuses</router-link> |
    <router-link to="/drivers">Choferes</router-link> |
    <router-link to="/travels">Trayectos</router-link>
  </nav>
</template>

<script>

export default {
  name: 'NavBarMenu',
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
