// @flow
import type { ReduxStore } from './reduxStore'
export type Ctx = {
  isServer: boolean,
  pathname: string,
  query: any,
  store: ReduxStore,
  req: any,
  res: any
}
