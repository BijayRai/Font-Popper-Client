// @flow

import authApi from '../api/authApi'
import type { Dispatch } from 'redux'
// import type { Action, DispatchAction } from '../flowTypes/redux'
import type { AuthAction, DispatchAction } from '../flowTypes/Actions'
import type { User, UserFiltered } from '../flowTypes/User'
import type { RegisterUserProps } from '../flowTypes/Forms'
export const signinUser = (user: UserFiltered) => async (dispatch: DispatchAction): Dispatch => {
  dispatch({ type: 'USER_LOG_IN' })
  const request: Promise<any> = authApi.signInUser(user)

  return dispatch({
    type: 'USER_LOG_IN_SUCCESS',
    payload: request // request = Promise, must send data on key 'payload`
  })
}

export const logUserOut = () => async (dispatch: DispatchAction): Dispatch => {
  const request: Promise<any> = authApi.signOutUser()
  return dispatch({ type: 'LOG_OUT', payload: request })
}

export const logOut = (): AuthAction => {
  return { type: 'LOG_OUT' }
}

export const saveUserToRedux = (user: UserFiltered) => (dispatch: DispatchAction): Dispatch =>
  dispatch({
    type: 'USER_LOG_IN_SUCCESS',
    user
  })

export const authenticateUser = (formProps: RegisterUserProps) => async (dispatch: DispatchAction): Dispatch => {
  const response: Promise<any> = authApi.registerUser(formProps)

  return dispatch({
    type: 'CREATE_USER',
    payload: response // request = Promise, must send data on key 'payload`
  })
}

export const refreshTokenAction = (user: User) => (dispatch: DispatchAction): Dispatch => {
  const request: Promise<any> = authApi.fetchRefreshTokens(user)

  return dispatch({
    type: 'FETCH_NEW_TOKENS',
    payload: request
  })
}

export const loadAccountForm = (user: User): AuthAction => {
  return {
    type: 'LOAD_USER_DATA',
    user
  }
}

export const updateUser = (user: UserFiltered) => (dispatch: DispatchAction): Dispatch => {
  const request: Promise<any> = authApi.updateUser(user)

  return dispatch({
    type: 'UPDATE_USER',
    payload: request
  })
}

export const forgotUser = (formData: { email: string }) => (dispatch: DispatchAction): Dispatch => {
  const request: Promise<any> = authApi.forgotUser(formData)

  return dispatch({
    type: 'FORGOT_USER',
    payload: request // request = Promise, must send data on key 'payload`
  })
}

export const resetPassword = (passwordToken: { password: string, token: string }) => (dispatch: DispatchAction): Dispatch => {
  const request = authApi.resetPassword(passwordToken)

  return dispatch({
    type: 'RESET_PASSWORD',
    payload: request // request = Promise, must send data on key 'payload`
  })
}
