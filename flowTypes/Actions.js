// @flow

import type { Dispatch } from 'redux'
import type { User, UserFiltered } from './User'
import type { Action } from './redux'

export type UserLoginSuccessMiddleware = {| type: 'USER_LOG_IN_SUCCESS', user: UserFiltered |}
type UserLoginSuccessPayload =
  {| type: 'USER_LOG_IN_SUCCESS', payload: Promise<any> |}
type UserLogIn = { type: 'USER_LOG_IN' }
type LoadUserData = {| type: 'LOAD_USER_DATA', user: User |}
type CreateUser = {| type: 'CREATE_USER', payload: Promise<any> |}
type FetchNewTokens = {| type: 'FETCH_NEW_TOKENS', payload: Promise<any> |}
type LogOutPayload = {| type: 'LOG_OUT', payload: Promise<any> |}
type LogOut = {| type: 'LOG_OUT' |}
type UpdateUser = {| type: 'UPDATE_USER', payload: Promise<any> |}
type ForgotUser = {| type: 'FORGOT_USER', payload: Promise<any> |}
type ResetPassword = {| type: 'RESET_PASSWORD', payload: Promise<any> |}

export type AuthAction =
  | UserLoginSuccessPayload
  | UserLoginSuccessMiddleware
  | UserLogIn
  | LogOutPayload
  | LogOut
  | CreateUser
  | FetchNewTokens
  | LoadUserData
  | UpdateUser
  | ForgotUser
  | ResetPassword

type Actions =
  | AuthAction

export type DispatchAction = (Actions) => Dispatch

export type DispatchActionDynamic = (Action) => Dispatch

// Action functions not return objects
export type saveUserFunc = (user: UserFiltered) => Dispatch
export type resetPasswordFunc = (passwordToken: { password: string, token: string }) => Dispatch
export type signinUserFunc = (user: UserFiltered) => Dispatch
export type forgotUserFunc = (formData: { email: string }) => Dispatch
export type loadAccountFormFunc = (user: User) => AuthAction
export type updateUserFunc = (user: UserFiltered) => Dispatch
