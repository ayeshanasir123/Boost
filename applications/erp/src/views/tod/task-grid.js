import { taskStatusDetails } from "@boost/repository";
import { computed } from "vue";
import { useTaskStore } from "@boost/repository";
const taskStore = useTaskStore();
const statusOptions = computed(() =>
  taskStatusDetails.map((status) => {
    return { text: status.description, value: status.id };
  })
);

export const useGridConfig = () => {
  return {
    selectionMode: {
      cell: false,
      checkbox: true,
      showCheckAll: true,
    },

    features: {
      cellEdit: true,
      filterBar: true,
    },

    rowHeight: 60,
    columnLines: false,

    columns: [
      {
        text: "ID",
        field: "identifier",
      },
      {
        text: "Uppgift",
        field: "title",
        ref: "projectFilter",
        flex: "3 1 18em",
        renderer({ record }) {
          return [
            record.title,
            {
              className: "location",
              text: record.customerPartyName,
            },
          ];
        },
      },
      {
        text: "Status",
        field: "status",
        ref: "statusFilter",
        flex: "1 1 8em",
        renderer({ value, row }) {
          const statusDetail = taskStatusDetails.find(
            (status) => status.id === value
          );
          const clsAction = value === "COMPLETED" ? "addCls" : "removeCls";
          row[clsAction]("b-completed");

          return {
            class: "badge",
            style: {
              backgroundColor: statusDetail ? statusDetail.color : "inherit",
            },
            text: statusDetail ? statusDetail.description : value,
          };
        },
        editor: {
          type: "combo",
          editable: false,
          items: statusOptions,
        },
        filterable: {
          filterField: {
            type: "combo",
            editable: false,
            items: statusOptions,
          },
        },
      },
      {
        text: "Tidplan",
        field: "plannedWeek",
        type: "number",
      },
      {
        text: "Tidplan",
        field: "plannedWeek",
        type: "number",
      },
      {
        text: "Planerad Start",
        field: "plannedStartDate",
        type: "date",
        format: "YYYY-MM-DD",
        flex: "1 1 6em",
        hidden: true,
      },
      {
        text: "Planerad Klar",
        field: "plannedEndDate",
        type: "date",
        format: "YYYY-MM-DD",
        flex: "1 1 6em",
        hidden: true,
      },
      {
        text: "Faktisk Start",
        field: "actualStartDate",
        type: "date",
        format: "YYYY-MM-DD",
        flex: "1 1 6em",
        hidden: true,
      },
      {
        text: "Faktiskt Klar",
        field: "actualEndDate",
        type: "date",
        format: "YYYY-MM-DD",
        flex: "1 1 6em",
        hidden: true,
      },
      {
        text: "Deadline",
        field: "deadline",
        type: "date",
        format: "YYYY-MM-DD",
        flex: "1 1 6em",
        hidden: true,
      },
      {
        text: "Tilldelad",
        field: "assignedPersonName",
        flex: "1 1 6em",
      },
      {
        text: "Team",
        field: "assignments",
        flex: "1 1 6em",
      },
      {
        text: "Ansvarig",
        field: "responsiblePersonName",
        flex: "1 1 6em",
      },
      {
        text: "Ägare",
        field: "owner",
        hidden: true,
        flex: "1 1 6em",
      },
      {
        text: "Vikt (prio)",
        field: "weight",
        type: "number",
      },
      {
        type: "action",
        flex: 1,
        enableCellContextMenu: false,
        actions: [
          {
            cls: "b-fa b-fa-plus",
            //cls :'pageview',
            //renderer: ({action}) => `<i class="material-symbols-outlined">${action.cls}</i>`,
            tooltip: "Show task",
            onClick: ({ record }) => {
              console.log(record);
            },
          },
        ],
      },
    ],
  };
};
