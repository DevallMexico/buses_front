<template>
  <div :class="['load', 'full']">
    <div class="load-one"></div>
    <div class="load-two"></div>
    <div class="load-three"></div>
  </div>
</template>

<script>
export default {
  name: "LoaderComponent"
}
</script>

<style>
* {
  margin:0px;
}
.load {
  width:100%;
  height:100vh;
  background-color: rgba(0, 0, 0, 0.3);
/*     margin:0px; */
    display: flex;
    justify-content: center;
    align-items: center;
}
.load div {
    width: 25px;
    height: 25px;
    background-color: #2874A6;
    margin-left: 5px;
    border-radius: 50%;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    -ms-border-radius: 50%;
    -o-border-radius: 50%;
    margin-top: calc(50px - 200px);
    animation-name: loading;
    animation-duration: 1.2s;
    animation-iteration-count: infinite;
    animation-direction: alternate;
}
.load-two {
    animation-delay: 0.4s;
}
.load-three {
    animation-delay: 0.8s;
}

.full {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
}

@keyframes loading {
    to {
        opacity: 0.3;
        transform: translateY(-25px);
        -webkit-transform: translateY(-25px);
        -moz-transform: translateY(-25px);
        -ms-transform: translateY(-25px);
        -o-transform: translateY(-25px);
}

}
</style>