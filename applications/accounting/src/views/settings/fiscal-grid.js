  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-CA', options); // 'en-CA' format is 'YYYY-MM-DD'
  };
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
        { text: "Start", field: "startDate", flex: 1, readOnly: true, renderer: ({ value }) => formatDate(value)},
        { text: "End", field: "endDate", flex: 1, readOnly: true,renderer: ({ value }) => formatDate(value) },
      
        
        { text: "Organization", field: "organizationName", flex: 1, readOnly: true },
        { text: "Locked", field: "locked", flex: 1, readOnly: true, renderer: ({ value }) => (value ? 'Yes' : 'No') },
        {
          text: "Edit", field: "edit", flex: 1, readOnly: true,
          renderer: ({ cellElement, record }) => {
            cellElement.innerHTML = `<button class="edit-button">Edit</button>`;
            cellElement.querySelector('.edit-button').addEventListener('click', () => {
              const editEvent = new CustomEvent('cellClick', {
                detail: { column: { field: 'edit' }, record }
              });
              cellElement.dispatchEvent(editEvent);
            });
          }
        },
      ],
    };
  };

  