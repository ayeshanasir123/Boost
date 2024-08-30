/**
 * Application configuration
 */
export const useGridConfig = () => {
    return {
        rowHeight:38,
        filterBarFeature: {
            compactMode: true,
            stripeFeature: true,
            quickFindFeature: true,
        },
        columns: [
            {
                text: 'Kundnr',
                field: 'identifier',
                flex: 1,
                readOnly: true,
                enableCellContextMenu: false
            }, {
                text: 'Namn',
                field: 'name',
                flex: 3,
                readOnly: true,
                enableCellContextMenu: false
            },{
                text: 'Orgnr',
                field: 'partyLegalCompanyId',
                flex: 1,
                readOnly: true,
                enableCellContextMenu: false
            }, {
                text: 'Ort',
                field: 'city',
                flex: 1,
                readOnly: true,
                enableCellContextMenu: false
            }, {
                text: 'Land',
                field: 'country',
                flex: 1,
                readOnly: true,
                enableCellContextMenu: false
            }, {
                text: 'Telefon',
                field: 'phone',
                flex: 1,
                readOnly: true,
                enableCellContextMenu: false
            }, {
                text: 'E-post',
                field: 'contactName',
                flex: 1,
                readOnly: true,
                enableCellContextMenu: false
            }
        ]
    };
};