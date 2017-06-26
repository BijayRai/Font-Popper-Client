// @flow

import { actionTypes } from './actionTypes'
import { combineReducers } from 'redux'
import type {
  Paginator,
  PaginatorAction,
  PaginationState,
  PaginatorRequestAction
} from '../flowTypes/Pagination'

export const createPaginator = (endpoint: string, resultKey: string): Paginator => {
  // action
  const requestPage = (endpoint: string, resultKey: string, page: number): PaginatorRequestAction => {
    return {
      type: actionTypes.REQUEST_PAGE,
      payload: {
        page
      },
      meta: {
        endpoint,
        resultKey
      }
    }
  }

  // action
  const receivePage = (resultKey: string, page: number, results: PaginatorAction) => {
    return {
      type: actionTypes.RECEIVE_PAGE,
      payload: {
        page,
        results
      },
      meta: {
        resultKey
      }
    }
  }

  // Reducer
  const pages = (pages: PaginationState, action: PaginatorAction): PaginationState => {
    switch (action.type) {
      case actionTypes.REQUEST_PAGE:
        return Object.assign({}, pages, {
          ...pages,
          [action.meta.resultKey]: {
            [action.payload.page]: {
              ids: [],
              fetching: true
            }
          }
        })
      case actionTypes.RECEIVE_PAGE:
        return Object.assign({}, pages, {
          ...pages,
          [resultKey]: {
            [action.payload.page]: {
              ids: action.payload.results.map(store => store._id),
              fetching: false
            }
          }
        })
      default:
        return pages
    }
  }

  // Reducer
  const currentPage = (currentPage: number = 1, action: PaginatorAction) =>
    (action.type === actionTypes.REQUEST_PAGE
      ? action.payload.page
      : currentPage)

  const onlyForEndpoint = reducer => (state: any = {}, action: PaginatorAction) => {
    if (typeof action.meta === 'undefined') {
      return state
    }
    if (action.meta.endpoint === endpoint) {
      return reducer(state, action)
    }

    if (action.meta.resultKey === resultKey) {
      return reducer(state, action)
    }

    return state

    // (typeof action.meta === 'undefined'
    //   ? state
    //   : action.meta.endpoint === endpoint ? reducer(state, action) : state)
  }

  const itemsReducer = (items: any = {}, action: any = {}) => {
    switch (action.type) {
      case actionTypes.RECEIVE_PAGE:
        let _items = {}
        for (let item of action.payload.results) {
          _items = {
            ..._items,
            [item._id]: item
          }
        }
        return {
          ...items,
          ..._items
        }
      default:
        return items
    }
  }

  const reducer = onlyForEndpoint(
    combineReducers({
      pages,
      currentPage
    })
  )

  return {
    requestPage,
    receivePage,
    reducer,
    itemsReducer: onlyForEndpoint(itemsReducer)
  }
}
