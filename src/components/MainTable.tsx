import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Paginator } from 'primereact/paginator';
import { Button } from 'primereact/button';
import type{ DataItem } from '../types/data';
import type { PaginatorPageChangeEvent } from 'primereact/paginator';

export type TableColumn = {
  field: string;
  header: string;
  
};

type MainTableProps = {
  dataItems: DataItem[];
  selectionMap: Record<number, DataItem>;
  handleSelectionChange: (selectedRows: DataItem[]) => void;
  first: number;
  rows: number;
  totalRecords: number;
  onPageChange: (event: PaginatorPageChangeEvent) => void;
  onToggleOverlay: (event: React.MouseEvent) => void;
  columns: TableColumn[]; // New prop for defining columns
  emptyMessage?: string;
};

const MainTable: React.FC<MainTableProps> = ({
  dataItems,
  selectionMap,
  handleSelectionChange,
  first,
  rows,
  totalRecords,
  onPageChange,
  onToggleOverlay,
  columns,
  emptyMessage = "No records found.",
}) => {
  
  return (
    <div>
      

      <DataTable
        value={dataItems}
        selectionMode="multiple"
        selection={Object.values(selectionMap)}
        onSelectionChange={(e) => handleSelectionChange(e.value as DataItem[])}
        dataKey="id"
        tableStyle={{ minWidth: '50rem' }}
        className="p-datatable-gridlines p-datatable-sm rounded-lg overflow-hidden shadow-md"
        emptyMessage={emptyMessage}
      >
        <Column selectionMode="multiple" header={<Button
      icon="pi pi-chevron-down"
      className="p-button-text p-button-sm"
      onClick={onToggleOverlay}
      aria-haspopup
      aria-controls="overlay_panel"
      tooltip="Select specific number of rows"
      tooltipOptions={{ position: 'bottom' }}
    />}  />
        {columns.map((col) => (
          <Column
            key={col.field}
            field={col.field}
            header={col.header}  
          />
        ))}
      </DataTable>

      
              <Paginator
        first={first}
        rows={rows}
        totalRecords={totalRecords}
        onPageChange={onPageChange}
        className="mt-4 p-paginator-sm rounded-lg "
      />
      

    </div>
  );
};

export default MainTable;