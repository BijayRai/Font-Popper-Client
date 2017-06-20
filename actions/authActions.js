import actionTypes from './actionTypes'
import authApi from '../api/authApi'

export const signinUser = user => async dispatch => {
  const request = authApi.signInUser(user)

  return dispatch({
    type: actionTypes.LOG_USER_IN,
    payload: request // request = Promise, must send data on key 'payload`
  })
}

export const logUserOut = () => async dispatch => {
  const request = authApi.signOutUser()
  return dispatch({ type: actionTypes.LOG_OUT, payload: request })
}

export const logOut = () => ({ type: actionTypes.LOG_OUT })

export const saveUserToRedux = user => dispatch =>
  dispatch({
    type: actionTypes.SAVE_USER,
    user
  })

export const authenticateUser = user => async dispatch => {
  const response = authApi.registerUser(user)

  return dispatch({
    type: actionTypes.CREATE_USER,
    payload: response // request = Promise, must send data on key 'payload`
  })
}

export const refreshTokenAction = user => dispatch => {
  const request = authApi.fetchRefreshTokens(user)

  return dispatch({
    type: actionTypes.FETCH_NEW_TOKENS,
    payload: request
  })
}

export const loadAccountForm = user => {
  return {
    type: actionTypes.LOAD_USER_DATA,
    user
  }
}

export const updateUser = user => dispatch => {
  const request = authApi.updateUser(user)

  return dispatch({
    type: actionTypes.UPDATE_USER,
    payload: request // request = Promise, must send data on key 'payload`
  })
}

export const forgotUser = email => dispatch => {
  const request = authApi.forgotUser(email)

  return dispatch({
    type: actionTypes.FORGOT_USER,
    payload: request // request = Promise, must send data on key 'payload`
  })
}

export const resetPassword = passwordToken => dispatch => {
  const request = authApi.resetPassword(passwordToken)

  return dispatch({
    type: actionTypes.RESET_PASSWORD,
    payload: request // request = Promise, must send data on key 'payload`
  })
}
