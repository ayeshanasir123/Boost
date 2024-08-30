/**
 * Application configuration
 */
export const useGridConfig = () => {
    return {
      rowHeight: 38,
      filterBarFeature: {
        compactMode: true,
        stripeFeature: true,
        quickFindFeature: true,
      },
      columns: [
        {
          text: "Identifier",
          field: "identifier",
          flex: 1,
          readOnly: true,
          enableCellContextMenu: false,
        },
        {
          text: "Namn",
          field: "name",
          flex: 3,
          readOnly: true,
          enableCellContextMenu: false,
        },
        {
          text: "SKU",
          field: "identifications.SKU",
          flex: 1,
          readOnly: true,
          enableCellContextMenu: false,
        },
        {
          text: "GTIN",
          field: "identifications.GTIN",
          flex: 1,
          readOnly: true,
          enableCellContextMenu: false,
        },
        {
          text: "Manage Stock",
          field: "InventorySettings.manageStock",
          flex: 1,
          readOnly: true,
          enableCellContextMenu: false,
        },
        {
          text: "Stock Count",
          field: "InventorySettings.stockCount",
          flex: 1,
          readOnly: true,
          enableCellContextMenu: false,
        }
      ]
    };
  };
  