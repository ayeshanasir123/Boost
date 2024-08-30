<script setup>
import MindElixir from "mind-elixir";
import example from "mind-elixir/example";
import { onMounted, ref } from "vue";

const me = ref();

onMounted(() => {
  me.value = new MindElixir({
    el: "#map",
    direction: MindElixir.LEFT,
  });
  
  me.value.init(example);
});
</script>

<template>
  <div id="app">
    <div id="map"></div>
  </div>
</template>
  
<style lang="less">
* {
margin: 0;
padding: 0;
box-sizing: border-box;
}

html, body, #app {
width: 100%;
height: 100%;
overflow: hidden;
}

#map {
width: 100vw;
height: 100vh;
}


// #map {
//   width: 200vh;
//   height: 900px;
// } 


</style>