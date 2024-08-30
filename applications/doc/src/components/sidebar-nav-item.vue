  <script setup>
  import {ref, computed, watch, onMounted} from 'vue';
  
  const {text, count, icon, selected} = defineProps(['text', 'count', 'icon', 'selected']);
  
  const iconSrc = computed(() => {
    return icon;
  });
  const getSelected = ref('items-flex selected');
  
  onMounted(() => {
    var wrapperDocumentBox = document.querySelector('.wrapper-document-box');
    var childElements = wrapperDocumentBox.querySelectorAll('.items-flex');
    for (var i = 1; i < childElements.length; i++) {
      childElements[i].classList.remove('selected');
    }
  });
  
  
   const toggleSelected = (event) => {
  
     var wrapperDocumentBox = document.querySelector('.wrapper-document-box');
     var childElements = wrapperDocumentBox.querySelectorAll('*');
     childElements.forEach((element) => {
       element.classList.remove('selected');
     });
     const element = event.target;
     element.classList.add('items-flex');
     element.classList.add('selected');
   };
  </script>

<template>
    <div :class="getSelected" @click="toggleSelected">
      <div class="image">
        <img :src="iconSrc"/>
      </div>
      <div class="text">{{ text }}</div>
      <div class="count">{{ count }}</div>
    </div>
  </template>
  
<style>
  
  </style>