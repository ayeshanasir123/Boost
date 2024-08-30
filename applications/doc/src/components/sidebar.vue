<template>
    <div class="sidebar">
      <v-card-text>
        <v-text-field
            density="compact"
            variant="solo"
            label="Search Documents"
            single-line
            hide-details
        ></v-text-field>
      </v-card-text>
      <div class="wrapper-document-box">
        <div class="document-box">Document Boxes <span><img src="../assets/img/down.svg" alt="down"/></span></div>
        <SidebarNavItem text="Inbox" :selected="updatedClasses" count="0" icon="/assets/img/inbox.svg"
                        @click="updateGrid('inbox')"/>
        <SidebarNavItem text="Todo" :selected="updatedClasses" count="3" icon="/assets/img/todo.svg"
                        @click="updateGrid('todo')"/>
        <SidebarNavItem text="Done" :selected="updatedClasses" count="0" icon="/assets/img/done.svg"
                        @click="updateGrid('done')"/>
      </div>
    </div>
  
  </template>
  
  
  <script setup lang="ts">
  
  import SidebarNavItem from './sidebar-nav-item.vue';
  import {reactive, ref} from "vue";
  
  import {useDocumentStore} from '../stores/documentStore';
  import '@bryntum/core-thin/core.material.css';
  import '@bryntum/grid-thin/grid.material.css';
  
  const documentStore = useDocumentStore();
  
  const documentList = ref([]);
  const refreshKey = ref(0);
  
  const updatedClasses = ref('items-flex');
  
  
  const updateGrid = (value) => {
  
    const gridElement = document.getElementById('grid');
    gridElement.innerHTML = '';
  
  
    if (value === 'inbox') {
  
      const grid = new BryntumGrid({
        appendTo: 'grid',
        rowHeight: 66,
        features: {
          group: false
        },
        columns: documentStore.columnNames,
        data: documentStore.inboxGridData
      });
    } else if (value === 'todo') {
      const grid = new BryntumGrid({
        appendTo: 'grid',
        rowHeight: 66,
        features: {
          group: false
        },
        columns: documentStore.columnNames,
        data: documentStore.todoGridData
      });
    } else if (value === 'done') {
      const grid = new BryntumGrid({
        appendTo: 'grid',
        rowHeight: 66,
        features: {
          group: false
        },
        columns: documentStore.columnNames,
        data: documentStore.doneGridData
      });
    } else {
      const grid = new BryntumGrid({
        appendTo: 'grid',
        rowHeight: 66,
        features: {
          group: false
        },
        columns: documentStore.columnNames,
        data: documentStore.inboxGridData
      });
  
    }
  };
  
  
  </script>
  <style>
  
  .container {
    flex-direction: row;
    display: flex;
  }
  
  .sidebar {
    max-width: 275px;
    width: 100%;
    border-right: 1px solid #E4F0F9;
    background: #fff;
  }
  
  
  .b-grid-container {
    flex: 1;
  }
  
  
  .b-grid-cell img {
    height: 50px;
  }
  
  .b-grid-cell {
    font-size: 13px;
  
  }
  
  
  .container {
    height: 100%;
  }
  
  .wrapping {
    height: 100%;
  }
  
  .header-nav {
    width: 100%;
    height: 70px;
    background: #1E1E2D;
  }
  
  
  .flex {
    display: flex;
  }
  
  
  .document-box {
    padding: 0px 1rem;
    font-size: 14px;
    font-weight: 500;
    text-align: left;
  }
  
  .v-label.v-field-label {
    font-size: 13px !important;
  }
  
  .image {
    width: 40px;
  }
  
  .count {
    margin-left: auto;
    margin-right: 14px;
  }
  
  .items-flex {
    display: flex;
    margin: 10px 0px;
    cursor: pointer;
    padding: 0px 1rem;
  }
  
  .items-flex .text {
    position: relative;
    padding-top: 12px;
    margin-left: 10px;
    font-size: 13px;
  }
  
  .items-flex .count {
    padding-top: 12px;
    position: relative;
    font-size: 13px;
  }
  
  .items-flex.selected {
    background: #E4F1FC;
  }
  
  .document-box {
    padding: 0px 1rem;
  }
  
  
  </style>