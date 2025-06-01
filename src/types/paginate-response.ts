export interface PaginateResponse<T> {
  data: T[]
  meta: {
    total: number
    currentPage: number
    lastPage: number
    perPage: number
    next?: number | null
    prev?: number | null
  }
}
