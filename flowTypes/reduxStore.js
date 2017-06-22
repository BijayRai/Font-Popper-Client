// @flow

export type ReduxStore = {
  dispatch: Function,
  getState: Function,
  liftedStore: any,
  replaceReducer: Function,
  subscribe: Function,
  'Symbol(observable)': Function
}
