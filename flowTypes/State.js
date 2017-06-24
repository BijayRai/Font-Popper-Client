// @flow
import type { User } from './User'
type pageContent = {
  ids: string[],
  fetching: boolean
}
type pageNumber = {
  [number]: pageContent
}
type Results = {
  [string]: pageNumber
}

type Pages = {
  pages: Results
}

export type State = {
  time: number,
  isSaving: boolean,
  user: User,
  userAccount: any,
  form: any,
  toaster: any,
  pagination: Pages
}
