// @flow
import type { Dispatch } from 'redux'
export type ReduxStore = {
  dispatch: Dispatch,
  getState: () => any,
  liftedStore: any,
  replaceReducer: (any) => any,
  subscribe: (any) => any,
  'Symbol(observable)': Function
}
