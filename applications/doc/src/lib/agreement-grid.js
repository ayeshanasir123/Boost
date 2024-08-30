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
                text: 'Benämnning',
                field: 'name',
                flex: 2,
                readOnly: true,
                enableCellContextMenu: false,
                sortable: true,
            }, {
                text: 'Avtalspart',
                field: 'agreementPartyName',
                flex: 1,
                readOnly: true,
                enableCellContextMenu: false
            }, {
                text: 'Avtalsstart',
                field: 'startDate',
                flex: 1,
                readOnly: true,
                enableCellContextMenu: false
            }, {
                text: 'Avtalsslut',
                field: 'endDate',
                flex: 1,
                readOnly: true,
                enableCellContextMenu: false
            }, {
                text: 'Avtalsnummer',
                field: 'referenceNo',
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