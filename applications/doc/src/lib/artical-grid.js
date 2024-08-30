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
                text: 'id',
                field: 'articleId',
                flex: 2,
                readOnly: true,
                enableCellContextMenu: false
            }, {
                text: 'Article Name',
                field: 'name',
                flex: 2,
                readOnly: true,
                enableCellContextMenu: false,
                sortable: true,
            }, {
                text: 'Price',
                field: 'price',
                flex: 1,
                readOnly: true,
                enableCellContextMenu: false
            }, {
                text: 'Unit',
                field: 'saleUnit',
                flex: 1,
                readOnly: true,
                enableCellContextMenu: false
            }, {
                text: 'Active',
                field: 'active',
                flex: 1,
                readOnly: true,
                enableCellContextMenu: false
            }, {
                text: 'Created At',
                field: 'createdAt',
                flex: 1,
                readOnly: true,
                enableCellContextMenu: false
            }
        ],
    };
};