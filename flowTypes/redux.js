// @flow
import type { Dispatch } from 'redux'

export type Action = {
  type: string,
  payload?: Promise<any> | any,
  error?: boolean,
  user?: any
}

export type ThunkAction = {
  dispatch: Dispatch<Action>,
  getState: () => any,
  extraArgument: (any) => any;
}

export type DispatchAction = Dispatch<Action>
