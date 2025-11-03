import { h } from '@stencil/core';

export const AgGrid = (theme: string) => {
  // Initialize AG Grid when component is mounted
  setTimeout(() => {
    const columnDefs = [{ field: "make" }, { field: "model" }, { field: "price" }];
    const rowData = (() => {
      const data = [];
      for (let i = 0; i < 10; i++) {
        data.push({ make: "Toyota", model: "Celica", price: 35000 + i * 1000 });
        data.push({ make: "Ford", model: "Mondeo", price: 32000 + i * 1000 });
        data.push({
          make: "Porsche",
          model: "Boxster",
          price: 72000 + i * 1000,
        });
      }
      return data;
    })();

    const defaultColDef = {
      editable: true,
      flex: 1,
      minWidth: 100,
      filter: true,
      enableRowGroup: true,
      enablePivot: true,
      enableValue: true,
    };

    const gridOptions = {
      columnDefs,
      rowData,
      defaultColDef,
      sideBar: true,
    };

    const gridElement = document.querySelector("#myGrid");
    if (gridElement && (window as any).agGrid) {
      (window as any).agGrid.createGrid(gridElement, gridOptions);
    }
  }, 100);

  return (
    <div>
      <script src="https://cdn.jsdelivr.net/npm/ag-grid-enterprise@34.0.1/dist/ag-grid-enterprise.min.js?t=1751977722767"></script>
      <div id="myGrid" style={{ height: '700px' }} class={theme}></div>
    </div>
  );
}


   