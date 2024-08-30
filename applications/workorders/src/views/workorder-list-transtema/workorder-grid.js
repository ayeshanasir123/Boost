/**
 Nr,Ämne,Skapad,Adress,Status,Tilldelad,Ansvarig,Avdelning,Kund,
 */
import { ref } from "vue";

export const shouldOpenPopup = ref(false);
export const shouldOpenAssignedPopup = ref(false);

export const viewRecord = ref(false);
export const clickedData = ref("");
export const useGridConfig = () => {
  const statuses = [];
  const statusColors = ["gray", "blue", "yellow", "light-blue", "green"];
  const dummyContractor = [
    "",
    "Transtema Charge Göteborg",
    "Contractor 2",
    "Contractor 3",
    "Reviewing",
    "Completed",
  ];

  return {
    shouldOpenPopup,
    rowHeight: 38,
    filterBarFeature: {
      compactMode: true,
      stripeFeature: true,
      quickFindFeature: true,
    },
    columns: [
      {
        text: "Nr",
        field: "nr",
        flex: 1,
        readOnly: true,
        enableCellContextMenu: false,
      },
      {
        text: "Ext.Ref",
        field: "customerWorkOrderRef",
        flex: 1,
        readOnly: true,
        enableCellContextMenu: false,
        hidden: true,
      },
      {
        text: "Type",
        field: "categoryId",
        flex: 1,
        readOnly: true,
        enableCellContextMenu: false,
        hidden: true,
      },
      {
        text: "Ämne",
        field: "subject",
        flex: 3,
        readOnly: true,
        enableCellContextMenu: false,
      },
      {
        text: "Skapad",
        field: "createdAt",
        type: "date",
        format: "YYYY-MM-DD HH:mm", // Corrected to 24-hour format
        flex: 1,
        readOnly: true,
      
      },
      {
        text: "Address",
        field: "address",
        flex: 3,
        readOnly: true,
        enableCellContextMenu: false,
      },
      {
        text: "Status",
        field: "status",
        renderer({ value, row }) {
          const clsAction = value === "Completed" ? "addCls" : "removeCls";
          row[clsAction]("b-completed");
          return {
            class: "badge",
            style: {
              backgroundColor: `var(--${statusColors[statuses.indexOf(value)]})`,
            },
            text: value,
          };
        },
        align: "",
        flex: 1,
        editor: {
          type: "combo",
          editable: false,
          items: statuses,
        },
        // Changing the header filter field to a combo
        filterable: {
          filterField: {
            type: "combo",
            editable: false,
            items: statuses,
          },
        },
      },
      // {
      //     text: "Ämne",
      //     field: "subject",
      //     flex: 1,
      //     readOnly: true,
      //     enableCellContextMenu: false,
      // },
      {
        text: "UE",
        field: "assignedOrganizationId",
        align: "",
        flex: 1,
        readOnly: true,
        hidden: true,
      },
      {
        text: "Tilldelad",
        field: "assignedPersonId",
        align: "",
        flex: 1,
        readOnly: true,
      },
      {
        text: "Ansvarig",
        field: "responsible",
        flex: 2,
        readOnly: true,
        enableCellContextMenu: false,
      },
      {
        text: "Bokad",
        field: "plannedAt",
        format: "YYYY-MM-DD",
        type: "date",
        flex: 1,
        readOnly: false,
        enableCellContextMenu: false,
      },

      {
        text: "Kund",
        field: "customer",
        flex: 2,
        readOnly: true,
        enableCellContextMenu: false,
      },
      {
        type: "action",
        text: "Action",
        actions: [
          {
            cls: "b-fa b-fa-envelope mailbtn",
            // renderer: () => `<span class="b-action-item email-popup ">E</span>`,
            onClick: ({ record }) => {
              shouldOpenPopup.value = true;
              clickedData.value = record;
            },
          },
          {
            cls: "b-fa b-fa-eye eyeviewbtn",
            // renderer: () => `<span class="b-action-item visabtn">Visa</span>`,
          },
        ],
      },
    ],
  };
};
