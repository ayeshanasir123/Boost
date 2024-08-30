// Dummy data
export const accounts = [
    {
      accountNumber: 101,
      fiscalYearId: 'FY2024',
      type: 'ASSET',
      name: 'Office Equipment',
      startBalance: 5000,
      createdAt: new Date('2024-01-01'),
      transactionInfo: 'ALLOWED',
      project: 'REQUIRED',
      defaultProjectUUID: '12888834-5678-abcdef'
    },
    {
      accountNumber: 202,
      fiscalYearId: 'FY2024',
      type: 'EXPENSE',
      name: 'Advertising',
      startBalance: 2000,
      balance: 1500,
      createdAt: new Date('2024-01-02'),
      transactionInfo: 'REQUIRED',
      project: 'ALLOWED',
      defaultProjectUUID: '1234-5678-abcdef'
    },
    {
      accountNumber: 303,
      fiscalYearId: 'FY2024',
      type: 'REVENUE',
      name: 'Sales',
      startBalance: 10000,
      balance: 12000,
      createdAt: new Date('2024-01-03'),
      transactionInfo: 'NOTALLOWED',
      defaultProjectUUID: '1234-5678-abcdef',
    }
  ];
  
  // Column definitions

  export const useGridConfig = () => {
    return {
      rowHeight: 38,
      filterBarFeature: {
        compactMode: true,
        stripeFeature: true,
        quickFindFeature: true,
      },
      columns: [
        { text: "Account Number", field: "accountNumber", flex: 1, readOnly: true },
        { text: "Type", field: "type", flex: 1, readOnly: true },
        { text: "Name", field: "name", flex: 2, readOnly: true },
        { text: "Start Balance", field: "startBalance", flex: 1, readOnly: true },
        { text: "Balance", field: "balance", flex: 1, readOnly: true },
        { text: "Created At", field: "createdAt", flex: 1, readOnly: true },
        { text: "Transaction Info", field: "transactionInfo", flex: 1, readOnly: true },
        { text: "Project", field: "project", flex: 1, readOnly: true },
        { text: "Fiscal Year ID", field: "fiscalYearId", flex: 1, readOnly: true, hidden: true },
        { text: "Default Project UUID", field: "defaultProjectUUID", flex: 1, readOnly: true, hidden: true },
      ],
    };
  };


  
  