// @flow
import type { ReduxStore } from './redux'

export type Response = {
  body: any,
  bodyUsed: boolean,
  headers: any,
  ok: boolean,
  redirected: boolean,
  status: number,
  statusText: string,
  type: string,
  url: string,
  json(): Promise<any>
}

export type ErrorType = {
  showMid: boolean,
  message: string,
  logout?: string
}

export type ResponseBody = {
  data: any,
  token?: string,
  hearts: string[]
}

export type Ctx = {
  isServer: boolean,
  pathname: string,
  query: any,
  store: ReduxStore,
  req: any,
  res: any
}
