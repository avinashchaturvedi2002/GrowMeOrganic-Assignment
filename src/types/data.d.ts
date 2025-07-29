export type DataItem = {
  id: number;
  [key: string]: any; 
};

export type PaginationInfo = {
  total: number;
  limit: number;
  offset: number;
  current_page: number;
  total_pages: number;
  next_url: string | null;
};

export type ApiResponse = {
  data: DataItem[];
  pagination: PaginationInfo;
};