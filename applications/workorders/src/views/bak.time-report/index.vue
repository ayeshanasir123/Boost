<script setup lang="ts">
import AddTimeReport from "./add-time-report.vue";
import WeekView from "./week-view.vue";
import { useI18n } from 'vue-i18n'
const { t } = useI18n();
</script>

<template>
    <main class="main">
        <h2>{{ $t('Time Reports') }}</h2>
        <add-time-report />
        <week-view style="margin-top:32px" />
    </main>
</template>

<style>
.v-input__details {
  display: none;
}

.border-right {
  border-right: 1px solid #e9eaec;
}

.border-bottom {
  border-bottom: 1px solid #e9eaec;
}

.border-top {
  border-top: 1px solid #e9eaec;
}

.text-headers {
  margin: 25px 0px;
}

.text-headers .group {
  margin-bottom: 10px;
  display: block;
}

.text-headers span {
  font-size: 11px;
  color: #757575;
}

.text-headers p {
  font-size: 13px;
}

.inputs-fields input {
  border: 1px solid #ccc;
  padding: 5px;
  width: 47%;
  margin: 7px 10px;
  border-radius: 5px;
}

.inputs-fields .p0 {
  margin: 0px;
  padding: 0px;
}

.inputs-radio-fields {
  margin: 25px 0px;
}

.title-field {
  font-size: 16px;
  color: #1e1e2d;
}

.textareas {
  width: 100%;
  border: 1px solid #ccc;
  padding: 25px;
}

.inputs-checkbox-fields .v-checkbox .v-selection-control {
  min-height: 10px;
}

.inputs-checkbox-fields .v-theme--light.v-icon--size-default {
  margin-left: -20px;
}

.inputs-checkbox-fields .v-input__details {
  display: none;
}

.inputs-component input {
  border: 1px solid #ccc;
  padding: 5px;
  width: 100%;
  margin: 7px 0px;
  border-radius: 5px;
}

.sku-height {
  padding: 15px;
}

#app {
  display: flex;
  flex-direction: column;
  height: auto;
}

body {
  display: block;
}

.autocompletepopup {
  position: absolute;
  display: block;
  border: 1px solid rgb(187, 187, 187);
  z-index: 999999;
  min-height: 35px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.27) 0px 19px 40px 16px;
  left: 10px;
}

.first-body-row {
  height: 250px;
  overflow: hidden scroll;
  position: absolute;
  width: 100%;
  background: #fff;
  color: #000;
}

#tablestyle .gridInput.no-input-border {
  width: 100%;
  height: 40px;
  padding: 8px;
}

#tablestyle td {
  padding: 0px;
}

.gridInput.no-input-border:focus {
  outline: none;
  border: 0px;
}

.gridColumn {
  height: 32px;
}

.gridColumn:focus-visible {
  outline: none;
}

.gridInput {
  color: black;
  border: 0;
  height: 35px;
  padding-top: 0px;
  padding-bottom: 0px;
  padding-left: 10px;
  padding-right: 10px;
  width: 100%;
  font-size: 12px;
}

.gridInput:focus-visible {
  outline: none;
}

tr.selected {
  background-color: #f0f0f0;
}

.no-input-border {
  border: none;
  outline: none;
}

.td-focused {
  border: 1px solid black;
}

.bottom-border {
  border-bottom: 1px solid black;
  /* Example bottom border style */
}

.right-border {
  border-right: 1px solid black;
  /* Example right border style */
}

.highlighted-row {
  background-color: #ffff99;
  /* Highlight color */
}

.gridIcon {
  font-size: 16px;
}

.min-w-100px {
  min-width: 100px;
}

.min-w-150px {
  min-width: 150px;
}

.min-w-300px {
  min-width: 50px;
}

.min-w-50px {
  min-width: 50px;
}

.min-w-200px {
  min-width: 200px;
}

.min-w-250px {
  min-width: 250px;
}

.min-w-300px {
  min-width: 300px;
}

.w-100px {
  width: 100px;
}

.w-150px {
  width: 150x;
}

.w-50px {
  width: 50px;
}
</style>
