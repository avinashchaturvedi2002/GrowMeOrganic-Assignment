
import 'primereact/resources/themes/lara-light-indigo/theme.css'; 
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import { useDataFetch } from './hooks/useDataFetch';
import { useSelection } from './hooks/useSelection';
import type { TableColumn } from './components/MainTable';
import SelectionPanel from './components/SelectionPanel';
import LoadingErrorDisplay from './components/common/LoadingErrorDisplay';
import MainTable from './components/MainTable';


const API_URL = 'https://api.artic.edu/api/v1/artworks';


const COLUMNS: TableColumn[] = [
  { field: 'title', header: 'Title' },
  { field: 'place_of_origin', header: 'Place of Origin'},
  { field: 'artist_display', header: 'Artist Display'},
  { field: 'inscriptions', header: 'Inscriptions' },
  { field: 'date_start', header: 'Date Start'  },
  { field: 'date_end', header: 'Date End'},
];

export default function App() {
  const {
    items,
    loading,
    error,
    first,
    rows,
    totalRecords,
    onPageChange,
  } = useDataFetch({ apiBaseUrl: API_URL });

  const {
    selectionMap,
    numToSelect,
    setNumToSelect,
    op,
    handleSelectionChange,
    onSelectNRowsSubmit,
    selectionLoading,
    selectionError,
  } = useSelection(items, API_URL);

  const overallLoading = loading || selectionLoading;
  const overallError = error || selectionError;

  const handleSelectNRows = () => {
    onSelectNRowsSubmit();
  };

  const handleToggleOverlay = (event: React.MouseEvent) => {
    op.current?.toggle(event);
  };

  return (
    <div>
      <LoadingErrorDisplay loading={overallLoading} error={overallError} />

      {!overallLoading && !overallError && (
        <>
          <MainTable
            dataItems={items}
            selectionMap={selectionMap}
            handleSelectionChange={handleSelectionChange}
            first={first}
            rows={rows}
            totalRecords={totalRecords}
            onPageChange={onPageChange}
            
            onToggleOverlay={handleToggleOverlay}
            columns={COLUMNS} 
            emptyMessage="No data found."
          />
          <SelectionPanel
            opRef={op}
            numToSelect={numToSelect}
            setNumToSelect={setNumToSelect}
            totalRecords={totalRecords}
            onSubmit={handleSelectNRows}
          />
        </>
      )}
    </div>
  );
}