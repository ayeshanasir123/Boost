<script setup lang="ts">
import { ref } from 'vue';
import type { VDataTable } from 'vuetify/components'
import { useTimeReportStore } from '@boost/repository';
import { Person } from '@boost/repository';
import LqButton from '@boost/ui';
  
const users = ref(['Rickard Karlsson']);
const weeks = ref(['14  1/4 till 7/4']);

const timeReportStore = useTimeReportStore();

type ReadonlyHeaders = VDataTable['$props']['headers']

const headers: ReadonlyHeaders = [
{ title: 'Må 01 Apr', key: 'mo', align:'center'},
{ title: 'Ti 02 Apr', key: 'tu', align:'center' },
{ title: 'On 03 Apr', key: 'we', align:'center' },
{ title: 'To 04 Apr', key: 'th', align:'center' },
{ title: 'Fr 05 Apr', key: 'fr', align:'center' },
{ title: 'Lö 06 Apr', key: 'sa', align:'center' },
{ title: 'Sö 07 Apr', key: 'su', align:'center' },
{ title: 'Totalt', key: 'sum', align:"end" },
];

const weekData = ref([{mo:0,tu:-8,we:-8,th:-8,fr:-8,sa:0,su:0,sum:-32}])

const totalUnbilledHours = ref(0.00);
const openProjects = ref(230);

const timeReports = timeReportStore.getTimeReports();

const getCellClass = (value: number): string => {
    return value === 0 ? 'bg-green' : '';
};

</script>

<template>
    <h2 style="margin-top:32px">Time reports for week {{ timeReportStore.currentWeek }} </h2>
    <v-container fluid class="mx-0 pa-0 ">
        <div class="mb-3">
            {{ timeReportStore.activePerson?.firstname }} {{ timeReportStore.activePerson?.lastname }}

            <v-btn @click="timeReportStore.previousWeek" class="mr-5"> Previous week </v-btn>
            <v-btn @click="timeReportStore.nextWeek"> Next week </v-btn>
        </div>
        <v-table class="w-100 mb-5">
            <thead>
                <tr>
                    <th class="text-center">Mon 15/7</th>
                    <th class="text-center">Tue 16/7</th>
                    <th class="text-center">Wed 17/7</th>
                    <th class="text-center">Thu 18/7</th>
                    <th class="text-center">Fri 19/7</th>
                    <th class="text-center">Sat 20/7</th>
                    <th class="text-center">Sun 21/7</th>
                    <th class="text-center">{{ $t('Total')}}</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td class="text-center">0</td>
                    <td class="text-center">-8</td>
                    <td class="text-center">-8</td>
                    <td class="text-center">-8</td>
                    <td class="text-center">-8</td>
                    <td class="text-center">0</td>
                    <td class="text-center">0</td>
                    <td class="text-center">-32</td>
                </tr>
            </tbody>
        </v-table>
        <v-table>
            <thead>
            <tr>
                <th class="text-left">
                    {{ $t('Date Worked')}}
                </th>
                <th class="text-left">
                    {{ $t('Work Order')}} #
                </th>
                <th class="text-left">
                    {{ $t('Customer')}} / {{ $t('Project')}}
                </th>
                <th class="text-left">
                    {{ $t('Activity')}}
                </th>
                <th class="text-left">
                    {{ $t('Time')}}
                </th>
                <th class="text-left">
                    {{ $t('Address')}}
                </th>
                <th class="text-left">
                    {{ $t('Comments')}}
                </th>
            </tr>
            </thead>
            <tbody>
                <tr v-if="timeReports.values.length == 0"><td colspan="7" class="text-center">No time reports</td></tr>
            <tr
                v-for="item in timeReports"
                :key="item.name"
            >
                <td>{{ item.name }}</td>
                <td>{{ item.calories }}</td>
            </tr>
            </tbody>
        </v-table> 
    </v-container>
    
  </template>
  
  <style scoped>
  .red--text {
    color: #FF5252;
  }

  .green-bg {
    color: #90EE90;
  }
  </style>
  