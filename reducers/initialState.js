// @flow
import type { State } from '../flowTypes/redux'

const initialState: State = {
  time: 0,
  stores: {},
  isSaving: false,
  user: {
    isAuthenticated: false
  },
  form: {},
  userAccount: {},
  pagination: {
    pages: {}
  },
  toaster: {}
}

export default initialState
