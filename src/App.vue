<template>
  <!--<nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav>-->
  <router-view/>
</template>

<style>
.margin-row {
  margin-top: 1.2rem;
  margin-bottom: 1.2rem;
}

.form-group {
  margin-top: 0.6rem;
}

.customModal {
    position: absolute;
    top: 0px;
    left: 0px;
    bottom: 0px;
    right: 0px;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;
  }

  .customModalContent {
    position: relative;
    width: 30rem;
    height: auto;
    z-index: 30;
    background-color: #fff;
    margin-top: -10rem;
  }
</style>
