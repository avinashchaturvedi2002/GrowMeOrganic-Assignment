import { useState, useRef } from 'react';
import type { DataItem } from '../types/data';
import { fetchDataApi } from '../api/fetchDataApi';
import { OverlayPanel } from 'primereact/overlaypanel';

export const useSelection = (currentItems: DataItem[], apiBaseUrl: string) => {
  const [selectionMap, setSelectionMap] = useState<Record<number, DataItem>>({});
  const [numToSelect, setNumToSelect] = useState<number>(0);
  const [selectionLoading, setSelectionLoading] = useState(false);
  const [selectionError, setSelectionError] = useState<Error | null>(null);
  const op = useRef<OverlayPanel | null>(null);

  const handleSelectionChange = (selectedRows: DataItem[]) => {
    const currentPageIds = new Set(currentItems.map((a) => a.id));
    const updatedMap = { ...selectionMap };

    for (const selected of selectedRows) {
      updatedMap[selected.id] = selected;
    }

    for (const id of Object.keys(updatedMap)) {
      const idNum = Number(id);
      if (currentPageIds.has(idNum) && !selectedRows.find((item) => item.id === idNum)) {
        delete updatedMap[idNum];
      }
    }
    setSelectionMap(updatedMap);
  };

  const onSelectNRowsSubmit = async () => {
    if (op.current) {
      op.current.hide();
    }

    if (numToSelect <= 0) {
      setSelectionMap({});
      return;
    }

    setSelectionLoading(true);
    setSelectionError(null);
    let tempSelected: Record<number, DataItem> = {};
    let currentPage = 1;
    let fetchedCount = 0;

    try {
      while (fetchedCount < numToSelect) {
        const data = await fetchDataApi(apiBaseUrl, currentPage);
        for (const item of data.data) {
          if (fetchedCount < numToSelect) {
            tempSelected[item.id] = item;
            fetchedCount++;
          } else {
            break;
          }
        }

        if (!data.pagination.next_url || (data.pagination.total_pages && currentPage >= data.pagination.total_pages)) {
          break;
        }
        currentPage++;
      }
      setSelectionMap(tempSelected);
    } catch (err: unknown) {
      setSelectionError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setSelectionLoading(false);
      setNumToSelect(0);
    }
  };

  return {
    selectionMap,
    numToSelect,
    setNumToSelect,
    op,
    handleSelectionChange,
    onSelectNRowsSubmit,
    selectionLoading,
    selectionError,
  };
};