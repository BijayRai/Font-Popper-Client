// @flow

import actionTypes from './actionTypes'
import authApi from '../api/authApi'
import type { Dispatch } from 'redux'
import type { Action, DispatchPromise } from '../flowTypes/redux'
import type { User } from '../flowTypes/User'

export const signinUser = (user: User) => async (dispatch: Dispatch): DispatchPromise => {
  const request: Promise<any> = authApi.signInUser(user)

  return dispatch({
    type: actionTypes.LOG_USER_IN,
    payload: request // request = Promise, must send data on key 'payload`
  })
}

export const logUserOut = () => async (dispatch: Dispatch): DispatchPromise => {
  const request: Promise<any> = authApi.signOutUser()
  return dispatch({type: actionTypes.LOG_OUT, payload: request})
}

export const logOut = () => ({type: actionTypes.LOG_OUT})

export const saveUserToRedux = (user: User) => (dispatch: Dispatch): DispatchPromise =>
  dispatch({
    type: actionTypes.SAVE_USER,
    user
  })

export const authenticateUser = (user: User) => async (dispatch: Dispatch): DispatchPromise => {
  const response: Promise<any> = authApi.registerUser(user)

  return dispatch({
    type: actionTypes.CREATE_USER,
    payload: response // request = Promise, must send data on key 'payload`
  })
}

export const refreshTokenAction = (user: User) => (dispatch: Dispatch): DispatchPromise => {
  const request: Promise<any> = authApi.fetchRefreshTokens(user)

  return dispatch({
    type: actionTypes.FETCH_NEW_TOKENS,
    payload: request
  })
}

export const loadAccountForm = (user: User): Action => {
  return {
    type: actionTypes.LOAD_USER_DATA,
    user
  }
}

export const updateUser = (user: User) => (dispatch: Dispatch): DispatchPromise => {
  const request: Promise<any> = authApi.updateUser(user)

  return dispatch({
    type: actionTypes.UPDATE_USER,
    payload: request // request = Promise, must send data on key 'payload`
  })
}

export const forgotUser = (email: string) => (dispatch: Dispatch): DispatchPromise => {
  const request: Promise<any> = authApi.forgotUser(email)

  return dispatch({
    type: actionTypes.FORGOT_USER,
    payload: request // request = Promise, must send data on key 'payload`
  })
}

export const resetPassword = (passwordToken: string) => (dispatch: Dispatch): DispatchPromise => {
  const request = authApi.resetPassword(passwordToken)

  return dispatch({
    type: actionTypes.RESET_PASSWORD,
    payload: request // request = Promise, must send data on key 'payload`
  })
}
