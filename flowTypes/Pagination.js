// @flow

type Pages = {
  ids: [],
  fetching: true
}

type resultKey = {
  page: Pages,
}

type Meta = {
  endpoint?: string,
  resultKey: string
}

export type RequestPage = {
  page: number
}

export type ReceivePage = {
  page: number,
  results: any[]
}

type pageNumber = {
  [number]: Pages
}

type DataType = {
  [string]: pageNumber
}

export type PaginationState = {
  pages: DataType
}

export type PaginatorAction = {
  type: string,
  payload: ReceivePage,
  meta: Meta,
}

export type PaginatorRequestAction = {
  type: string,
  payload: RequestPage,
  meta: Meta
}

export type Paginator = {
  requestPage: Function,
  receivePage: Function,
  reducer: any,
  itemsReducer: any
}
