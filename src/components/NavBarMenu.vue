<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="#">&nbsp; Administración</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <a class="nav-link" href="#"><router-link to="/buses">Autobuses</router-link></a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#"><router-link to="/drivers">Choferes</router-link> </a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#"><router-link to="/travels">Trayectos</router-link> </a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#"><router-link to="/schedules">Horarios</router-link> </a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#"><router-link to="/seatings">Asignación Asientos</router-link> </a>
      </li>
      
    </ul>
  </div>
</nav>
</template>

<script>

export default {
  name: 'NavBarMenu',
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

a {
  color: rgba(0, 0, 0, 0.55);
  font-size: 1.1rem;
}

</style>
