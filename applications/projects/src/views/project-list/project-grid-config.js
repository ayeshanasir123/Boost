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
          text: 'Identifier',
          field: 'identifier',
          flex: 1,
          readOnly: true,
          enableCellContextMenu: false,
        },
        {
          text: 'Namn',
          field: 'name',
          flex: 4,
          readOnly: true,
          enableCellContextMenu: false,
        },
        {
          text: 'Kund',
          field: 'customer.name',
          flex: 4,
          readOnly: true,
          enableCellContextMenu: false,
        }
      ],
    };
  };
  