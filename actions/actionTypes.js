// @flow
type ActionTypes = { [string]: string }
const actionTypes: ActionTypes = {
  // Moment
  TICK: 'TICK',

  // AUTH
  REFRESH_TOKEN: 'REFRESH_TOKEN',
  FETCH_NEW_TOKENS: 'FETCH_NEW_TOKENS',
  CREATE_USER: 'CREATE_USER',
  SAVE_USER: 'SAVE_USER',
  LOG_OUT: 'LOG_OUT',
  LOG_USER_IN: 'LOG_USER_IN',
  FORGOT_USER: 'FORGOT_USER',
  RESET_PASSWORD: 'RESET_PASSWORD',

  // User Account
  LOAD_USER_DATA: 'LOAD_USER_DATA',
  UPDATE_USER: 'UPDATE_USER',

  // PAGINATION
  REQUEST_PAGE: 'REQUEST_PAGE',
  RECEIVE_PAGE: 'RECEIVE_PAGE'
}

export default actionTypes
