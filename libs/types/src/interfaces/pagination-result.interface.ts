export interface PaginationResultInterface<T> {
  results: T[];
  totalRecords: number;
  next?: string;
  previous?: string;
}
