// @flow

import actionTypes from '../actions/actionTypes'
import initialState from './initialState'
import type { Action } from '../flowTypes/redux'
import type { User } from '../flowTypes/User'

export const authReducer = (state: User = initialState.user, action: Action): User => {
  switch (action.type) {
    case actionTypes.SAVE_USER:
      return Object.assign({}, state, {
        ...action.user,
        isAuthenticated: true
      })
    case actionTypes.REFRESH_TOKEN:
      return Object.assign({}, state, {
        ...action.user,
        isAuthenticated: true
      })
    case actionTypes.LOG_OUT:
      return {
        isAuthenticated: false
      }
    default:
      return state
  }
}
