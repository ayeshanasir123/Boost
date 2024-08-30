<script setup lang="ts">
import { reactive, computed, ref, onMounted, watch } from 'vue';
import { provide, inject } from '@boost/shared';
import { storeToRefs } from 'pinia';
import { GoogleMap, CustomMarker } from 'vue3-google-map';
import { WorkOrder } from './order.ts';

const $map = ref<InstanceType<typeof GoogleMap>>();

import crossfilter from 'crossfilter2'
import { useWorkOrderStore, type TimWorkOrder, type TimWorkorderCategory, useOrganizationStore } from '@boost/repository';
import { LqSelect, useFilter } from '@boost/ui';

import FilterBar from './filter/filter-bar.vue';

const workOrderStore = useWorkOrderStore();

const { workOrderList: storeOrders } = storeToRefs(workOrderStore);
const workOrders = reactive<WorkOrder[]>([]);

const filteredWorkOrders = reactive<WorkOrder[]>([]);
watch(() => workOrderStore.loading, () => {
  const orders: WorkOrder[] = storeOrders.value.map(order => Object.setPrototypeOf(order, WorkOrder.prototype));
  workOrders.push(...orders);
  filter.update(orders);
});

const filters = {};
const ndx = crossfilter<WorkOrder>([]);
const filter = useFilter(ndx);

filter.on('reload filter update', async (name, ...args) => {
  const ids = new Set;
  ndx.allFiltered().forEach(order => ids.add(order.id));
  filteredWorkOrders.replace(workOrders.filter(order => ids.has(order.id)));
  if (!filteredWorkOrders.length) return;
  const { map, api } = $map.value;
  var bounds = new google.maps.LatLngBounds();
  //var infowindow = new google.maps.InfoWindow();

  filteredWorkOrders.forEach(order => {
    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(order.position),
    });

    //extend the bounds to include each marker's position
    bounds.extend(marker.position);

    /*google.maps.event.addListener(marker, 'click', (function (marker, i) {
      return function () {
        infowindow.setContent(locations[i][0]);
        infowindow.open(map, marker);
      }
    })(marker, i));*/
  });

  //now fit the map to the newly inclusive bounds
  map.fitBounds(bounds);
  const zoom = map.getZoom();
  map.setZoom(zoom * .98);

  /*
    //(optional) restore the zoom level after the map is done scaling
    var listener = google.maps.event.addListener(map, "idle", function () {
      map.setZoom(3);
      google.maps.event.removeListener(listener);
    });
  */
}, {});

provide({ filters, ndx });

</script>

<template>
  <div style="height: 100%">
    <filter-bar />
    <div class="loading" v-if="workOrderStore.loading">
      Loading...
    </div>
    <google-map ref="$map"
      api-key="AIzaSyAqUuEM7OtMmKNnZ-dJtiN0kqZfoicCOT4"
      style="width: 100%; height: 100%"
      :zoom="15">
      <custom-marker v-for="order in filteredWorkOrders"
        :options="{ position: order.position, anchorPoint: 'BOTTOM_CENTER' }">
        <div style="text-align: center">
          <div
            style="font-size: 1.125rem; padding: 8px 16px; background-color: rgba(255,255,255,.7);border-radius: 5px">{{
              order.endcustomer }}</div>
          <img src="https://freepngimg.com/thumb/map/69579-map-icons-symbol-wallpaper-desktop-computer-location.png"
            width="32" height="32" style="margin-top: 8px" />
        </div>
      </custom-marker>
    </google-map>
  </div>
</template>

<style scoped lang="scss">
.loading {
  z-index: 10000;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 150px;
  margin-left: -75px;
  margin-top: -16px;
  height: 32px;
  line-height: 32px;
  text-align: center;
  background-color: rgba(255, 255, 255, .7);
  border-radius: 5px;
  box-shadow: 0 0 20px rgba(0, 0, 0, .3);
  user-select: none;
}
</style>