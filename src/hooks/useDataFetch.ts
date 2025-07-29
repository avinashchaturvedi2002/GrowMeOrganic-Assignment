import { useState, useEffect } from 'react';
import { fetchDataApi } from '../api/fetchDataApi';
import type { DataItem } from '../types/data';
import type { PaginatorPageChangeEvent } from 'primereact/paginator';

type UseDataFetchProps = {
  apiBaseUrl: string;
  initialRows?: number;
};

export const useDataFetch = ({ apiBaseUrl, initialRows = 12 }: UseDataFetchProps) => {
  const [items, setItems] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(initialRows);
  const [totalRecords, setTotalRecords] = useState(0);

  useEffect(() => {
    const getItems = async () => {
      try {
        setLoading(true);
        setError(null);
        const currentPage = first / rows + 1;
        const data = await fetchDataApi(apiBaseUrl, currentPage);
        setItems(data.data);
        setTotalRecords(data.pagination.total);
      } catch (err: unknown) {
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setLoading(false);
      }
    };

    getItems();
  }, [first, rows, apiBaseUrl]);

  const onPageChange = (event: PaginatorPageChangeEvent) => {
    setFirst(event.first);
    setRows(event.rows);
  };

  return {
    items,
    loading,
    error,
    first,
    rows,
    totalRecords,
    onPageChange,
  };
};