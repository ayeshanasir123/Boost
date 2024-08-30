/**
 * Application configuration
 */
export const customerOrderGridConfig = () => {
    return {
        rowHeight:38,
        filterBarFeature: {
            compactMode: true,
            stripeFeature: true,
            quickFindFeature: true,
        },
        columns: [
                {
                    text: 'Ordernr',
                    field: 'orderNumber',
                    flex: 1,
                    readOnly: true,
                    enableCellContextMenu: false
                },
                {
                    text: 'Orderdatum',
                    type: 'date',
                    format: 'YYYY-MM-DD',
                    field: 'issueDateTime',
                    flex: 1,
                    readOnly: true,
                    enableCellContextMenu: false
                }, 
                {
                    text: 'Exkl moms',
                    type: 'number',
                    precision: 2,
                    field: 'taxExclusiveAmount',
                    flex: 1,
                    readOnly: true,
                    enableCellContextMenu: false
                }, 
                {
                    text: 'Valuta',
                    field: 'documentCurrencyCode',
                    flex: 1,
                    readOnly: true,
                    enableCellContextMenu: false
                }, 
                {
                    text: 'Totalt',
                    type: 'number',
                    precision: 2,
                    field: 'taxInclusiveAmount',
                    flex: 1,
                    readOnly: true,
                    enableCellContextMenu: false
                }, 
                {
                    text: 'Leveransdatum',
                    type: 'date',
                    format: 'YYYY-MM-DD',
                    field: 'requestedDeliveryPeriodStartDate',
                    flex: 1,
                    readOnly: true,
                    enableCellContextMenu: false
                },
                {
                    text: 'Status',
                    field: 'status',
                    flex: 1,
                    readOnly: true,
                    enableCellContextMenu: false
                },
                {
                    type: 'action',
                    flex: 1,
                    enableCellContextMenu: false,
                    actions : [
                        {
                            cls :'b-fa b-fa-plus',
                            //cls :'pageview',
                            //renderer: ({action}) => `<i class="material-symbols-outlined">${action.cls}</i>`,
                            tooltip: 'Visa order',
                            onClick: ({record}) => {
                                window.open('https://erp.qeeping.se/2F3ACD6097A366986433A1D3A78D643A/cim/orders?id='+record.id,'_blank');
                        }
                    }]
                },
            ]
        };
};