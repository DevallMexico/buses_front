<template>
  <div class="customModal" id="modal">
    <div class="customModalContent">
      <div class="modal-header">
        <h4 class="modal-title">Modal Component</h4>
        <button class="btn btn-secundary">x</button>
      </div>
      <div class="container">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ModalComponent",
  /*props: {
    children: any
  }*/
}
</script>

<style>

</style>