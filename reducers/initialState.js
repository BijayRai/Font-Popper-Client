// @flow
import type { State } from '../flowTypes/State'

const initialState: State = {
  time: 0,
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
