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
  resultKey: resultKey
}

type Page = {
  page: number,
  results: any[]
}

export type PaginatorAction = {
  type: string,
  payload: Page,
  meta: Meta,
}

export type Paginator = {
  requestPage: Function,
  receivePage: Function,
  reducer: any,
  itemsReducer: any
}
