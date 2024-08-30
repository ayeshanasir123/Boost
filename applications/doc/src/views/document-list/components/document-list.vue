<script setup lang="ts">

import '@bryntum/core-thin/core.material.css';
import '@bryntum/grid-thin/grid.material.css';
import {Grid} from "@bryntum/grid-thin";
import {ref, onMounted} from 'vue';
import {useDocumentStore} from '../../../stores/documentStore';
import sideBar from "../../../components/sidebar.vue";

import type Document from '../../../model/Document';

const PDFdoucment = ref<Document[]>([
  {
    createdByUUID: 'user123',
    deletedAt: null,
    description: 'Dummy document for testing',
    entityUUID: 'entity456',
    fromEmail: 'dummy@example.com',
    identifier: 'ABC123',
    partyUUID: 'party789',
    status: 'pending',
    title: 'Test Document',
    typeUUID: 'type987',
    updatedAt: new Date(),
    UUID: 'document789',
    PDFUrl: 'https://example.com/document.pdf',
    thumbNailUrl: 'https://erp.qeeping.se/files/147/151221/210074.t.png',
    invoiceNumber: 123,
    invoiceId: 456,
    issueDate: new Date(),
    dueDate: new Date(),
    supplierName: 'Supplier ABC',
    taxTotalTaxAmount: 20.5,
    taxInclusiveAmount: 150.75,
    currency: 'SEK',
    OCR: 'Some OCR text here',
  },
  {
    createdByUUID: 'user2123',
    deletedAt: null,
    description: 'Dummy document for testing',
    entityUUID: 'entity456',
    fromEmail: 'dummy@example.com',
    identifier: 'ABC123',
    partyUUID: 'party789',
    status: 'pending',
    title: 'Test Document',
    typeUUID: 'type987',
    updatedAt: new Date(),
    UUID: 'document789',
    PDFUrl: 'https://example.com/document.pdf',
    thumbNailUrl: 'https://erp.qeeping.se/files/147/151221/210074.t.png',
    invoiceNumber: 123,
    invoiceId: 4582,
    issueDate: new Date(),
    dueDate: new Date(),
    supplierName: 'Supplier ABC',
    taxTotalTaxAmount: 20.5,
    taxInclusiveAmount: 150.75,
    currency: 'SEK',
    OCR: 'Some OCR text here',
  },
  {
    createdByUUID: 'user345',
    deletedAt: null,
    description: 'Another dummy document',
    entityUUID: 'entity789',
    fromEmail: 'anotherdummy@example.com',
    identifier: 'XYZ789',
    partyUUID: 'party123',
    status: 'approved',
    title: 'Another Test Document',
    typeUUID: 'type456',
    updatedAt: new Date(),
    UUID: 'document456',
    PDFUrl: 'https://example.com/another-document.pdf',
    thumbNailUrl: 'https://erp.qeeping.se/files/147/151221/210074.t.png',
    invoiceNumber: 456,
    invoiceId: 789,
    issueDate: new Date(),
    dueDate: new Date(),
    supplierName: 'Supplier XYZ',
    taxTotalTaxAmount: 30.75,
    taxInclusiveAmount: 200.5,
    currency: 'USD',
    OCR: 'More OCR text here',
  },
  {
    createdByUUID: 'user567',
    deletedAt: null,
    description: 'Yet another dummy document',
    entityUUID: 'entity567',
    fromEmail: 'yetanotherdummy@example.com',
    identifier: 'LMN567',
    partyUUID: 'party456',
    status: 'rejected',
    title: 'Yet Another Test Document',
    typeUUID: 'type789',
    updatedAt: new Date(),
    UUID: 'document567',
    PDFUrl: 'https://example.com/yet-another-document.pdf',
    thumbNailUrl: 'https://erp.qeeping.se/files/147/151221/210074.t.png',
    invoiceNumber: 789,
    invoiceId: 1011,
    issueDate: new Date(),
    dueDate: new Date(),
    supplierName: 'Supplier LMN',
    taxTotalTaxAmount: 25.5,
    taxInclusiveAmount: 180.25,
    currency: 'EUR',
    OCR: 'Even more OCR text here',
  },
  {
    createdByUUID: 'user789',
    deletedAt: null,
    description: 'One more dummy document',
    entityUUID: 'entity1011',
    fromEmail: 'onemoredummy@example.com',
    identifier: 'PQR1011',
    partyUUID: 'party1011',
    status: 'pending',
    title: 'One More Test Document',
    typeUUID: 'type1011',
    updatedAt: new Date(),
    UUID: 'document1011',
    PDFUrl: 'https://example.com/one-more-document.pdf',
    thumbNailUrl: 'https://erp.qeeping.se/files/147/151221/210074.t.png',
    invoiceNumber: 1011,
    invoiceId: 1213,
    issueDate: new Date(),
    dueDate: new Date(),
    supplierName: 'Supplier PQR',
    taxTotalTaxAmount: 15.75,
    taxInclusiveAmount: 120.5,
    currency: 'SEK',
    OCR: 'Final OCR text here',
  },
]);


const documentStore = useDocumentStore();
const gridRef = ref(<any>{});

onMounted(async () => {

   new Grid({
    appendTo: 'grid',
    rowHeight: 66,
    features: {
      group: false,
      cellEdit : false
    },
    callOnFunctions : true,
    columns: documentStore.columnNames,
    data: PDFdoucment.value,
  });

});

</script>
<template>
  <div class="container arrange-grid">
    <sideBar />
    <div id="grid" ref="gridRef">
    </div>
  </div>
</template>
<style>
#grid {
  height: 100%;
  width: 100%;
}

</style>