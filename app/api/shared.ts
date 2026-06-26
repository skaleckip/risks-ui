export interface PageDto<T> {
  items: T[],
  pageNumber: number,
  pageSize: number,
  pageCount: number
}