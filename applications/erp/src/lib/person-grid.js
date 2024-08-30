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
                text: 'First Name',
                field: 'firstname',
                flex: 1,
                readOnly: true,
                enableCellContextMenu: false
            }, {
                text: 'Email',
                field: 'email',
                flex: 1,
                readOnly: true,
                enableCellContextMenu: false
            }, {
                text: 'Phone',
                field: 'mobilePhone',
                flex: 1,
                readOnly: true,
                enableCellContextMenu: false
            }, {
                text: 'Assignable',
                field: 'assignable',
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
        ]
    };
};