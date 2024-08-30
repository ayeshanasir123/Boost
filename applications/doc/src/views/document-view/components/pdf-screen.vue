<script setup lang="ts">
import OrganizationsForm from './organization-form.vue';
import {ref} from "vue";
import DocumentsView from '../components/documents.vue';
import {useDocumentStore} from '../../../stores/documentStore';
const documentStore = useDocumentStore();


//const files  = documentStore.filesData;
const documentsViewRef = ref(null)
const items = ["Option 1", "Option 2", "Option 3"];


const counterCurrent = ref(1);
const counterTotal = ref(documentStore.filesData.length);





</script>

<template>
  <div class="flex ">
    <div class="half-left bg-light-gray">
      <KeepAlive>
        <DocumentsView :path="`/lib/pdfjs-express-viewer/public`"
                       ref="documentsViewRef"
        />
      </KeepAlive>
    </div>
    <div class="half-right ">
      <div class="top-bar-header flex">
        <div class="select b-white">
          <v-select
              :items="items"
              density="compact"
              label="Document Type"
              variant="outlined"
              clearable
              class="document-type b-white"
          ></v-select>
        </div>
        <div class="navs">
          <span class="margin-middle"><img src="../../../assets/img/left.svg" alt="settings"/></span>
          <span class="text-writing">
            <span class="counter">{{ counterCurrent }}</span>
          <span class="counter-writing">of</span>

            <span class="counter ">{{ counterTotal }}</span>
          </span>
          <span class="margin-last"><img src="../../../assets/img/right.svg" alt="settings"/></span>
        </div>
      </div>
      <div class="organaization">
        <OrganizationsForm/>
      </div>
      <div class="footer-btn flex b-white">
        <button type="button" class="btn adjust-left popins" @click="">Save</button>
      </div>
    </div>

  </div>

</template>

<style scoped>
.select .v-field.v-field--appended.v-field--center-affix.v-field--variant-outlined.v-theme--light.v-locale--is-ltr {
  background: #fff;
}


.text-writing {
  font-size: 14px;
}

.navs img {
  max-width: 32px;
  max-height: 32px;
}

.flex.height-of-doc {
  height: 100vh;
  overflow: hidden;
}

.select {
  max-width: 246px;
  width: 100%;
  margin-left: auto;
  position: relative;
  top: -4px;
  margin-right: 50px;
}

.document-type ::v-deep(.v-field__input)  {
  min-height: 40px;
}

.footer-btn.flex {
  height: 64px;
  bottom: 0;
  padding: 10px;
  position: fixed;
  right: 0;
  width: 50%;
}

.btn.adjust-left.popins {
  background: #005B8E;
  color: #fff;
  width: 93px;
  height: 42px;
  border-radius: 0;
  margin-right: 25px;
}

/* CSS */
.flex {
  display: flex;
}

.adjust-left {
  margin-left: auto;
}

.half-left {
  flex: 1;
  background-color: lightgray;
  width: calc(100% - 55.9895833%);

}

.half-right {
  width: 50%;
}

.b-white {
  background: white !important;
}

.bg-light-gray {

  background: #E5E7E9;
}

.top-bar-header {
  height: 64px;
  background: #F7F9FB;
  padding: 14px;
  border-bottom: 1px solid #dcdcdc;
}

.margin-middle {
  margin-right: 10px;
  cursor: pointer;
}

.margin-last {
  margin-left: 10px;
  cursor: pointer;
}

.top-bar-header span {
  display: inline-block;

}

.text-writing {
  position: relative;
  top: -10px;
}

.text-writing span {
  margin: 0px 2px;
}

.v-list.v-theme--light.v-list--density-default.v-list--one-line {
  padding: 0px;
}
.v-list-item-title {
  font-size: 13px;
}
.v-select__selection {
  font-size: 13px;
}
</style>
