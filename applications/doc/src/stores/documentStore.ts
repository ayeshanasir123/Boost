import {ref} from "vue";
import {defineStore} from "pinia";

const useDocumentStore = defineStore('document', () => {

    const filterStatus = ref('TODO');
    const currentIndex = ref(0);

    function setFilterStatus(status: string) {
        filterStatus.value = status;
    }



    const columnNames = [
        {
            text: 'Id',
            field: 'invoiceId',
            flex: 1,
        }, {
            text: 'Supplier Name',
            field: 'supplierName',
            flex: 2,
        }, {
            text: 'Invoice Number',
            field: 'invoiceNumber',
            flex: 2,
        }, {
            text: 'Date',
            field: 'issueDate',
            flex: 2,
        }, {
            text: 'Due Date',
            field: 'dueDate',
            flex: 2,
        }, {
            text: 'Amount',
            field: 'taxInclusiveAmount',
            flex: 1,
        }, {
            text: 'Currency',
            field: 'currency',
            flex: 1,
        }, {
            text: 'Image',
            flex: 1,
            renderer: (data : any) => {
                // Use a renderer function to display images in the column
                return `<img src="${data.record.thumbNailUrl}" alt="Image" style="max-height: 100px;" />`;
            },
            htmlEncode: false,

        }

    ]
    const inboxGridData = ""
    const todoGridData = [
        {
            invoiceId: 1111111,
            InvoiceNumber: 1123161030134,
            supplierName: 'Ali Co',
            Date: new Date('2023-01-23'),
            DueDate: new Date('2023-01-23'),
            Amount: 2500.00,
            Vat: 500.00,
            Currency: "SEK",
            ThumbNailUrl: 'https://erp.qeeping.se/files/147/151221/210074.t.png'
        },
        {
            invoiceId: 111111,
            InvoiceNumber: 1123161030134,
            supplierName: 'Ali Co',
            Date: new Date('2023-01-23'),
            DueDate: new Date('2023-01-23'),
            Amount: 2500.00,
            Vat: 500.00,
            Currency: "SEK",
            ThumbNailUrl: 'https://erp.qeeping.se/files/147/151221/210074.t.png'
        },
    ]
    const doneGridData = [
        {
            invoiceId: 123456,
            InvoiceNumber: 1123161030134,
            supplierName: 'Ali Co',
            Date: new Date('2023-01-23'),
            DueDate: new Date('2023-01-23'),
            Amount: 2500.00,
            Vat: 500.00,
            Currency: "SEK",
            ThumbNailUrl: 'https://erp.qeeping.se/files/147/151221/210074.t.png'
        },
        {
            invoiceId: 123456,
            InvoiceNumber: 1123161030134,
            supplierName: 'Ali Co',
            Date: new Date('2023-01-23'),
            DueDate: new Date('2023-01-23'),
            Amount: 2500.00,
            Vat: 500.00,
            Currency: "SEK",
            ThumbNailUrl: 'https://erp.qeeping.se/files/147/151221/210074.t.png'
        },
    ]

    const filesData = [
        {url: '/assets/PDF_1688040107.pdf'},
        {url: '/assets/PDF_1688039962.pdf'},
        {url: '/assets/PDF_1688039830.pdf'}
    ]


    return {
        inboxGridData,
        todoGridData,
        doneGridData,
        filterStatus,
        columnNames,
        currentIndex,
        filesData,
        setFilterStatus
    };
});
export {useDocumentStore};

