import { taskStatusDetails } from "@boost/repository";


export const useGridConfig = () => {
  return {
    rowHeight: 60,
    columnLines: false,
    CellEditFeature: true,
    filterBarFeature: true,

    columns: [
      {
        text: "ID",
        field: "identifier",
        renderer: ({ cellElement, record }) => {
          cellElement.innerHTML = `
              <div class="checkbox-text-cell">
                  <input type="checkbox" onclick="toggleCheckbox(${record.identifier})">
                  ${record.identifier}
              </div>
          `;
        },
        headerRenderer: ({ headerElement }) => {
          headerElement.innerHTML =
            '<div class="b-grid-header-text"><input type="checkbox" id="header-checkbox">  ID</div>';
        },
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
          items: [],
        },
        filterable: {
          filterField: {
            type: "combo",
            editable: false,
            items: [], // Empty initially
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
        text: "",
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
