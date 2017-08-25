// @flow

import { toastr } from 'react-redux-toastr'
import { logUserOut } from '../actions/authActions'
import type { Dispatch } from 'redux'
import type { Response, ErrorType } from '../flowTypes/Api'

/**
 * handleMiddlewareError(arg) -DEPRICATED-
 * - This function SHOULD BE updated once old async calls are routed through the middleware
 * - No logout errror OBJ will be sent out so update accordingly
 * - Currently this is in storeAPI.js
 *
 * @param {Object} error
 */
export const handleMiddlewareError = (error: ErrorType) => {
  console.log('handleMiddlewareError', error)

  if (error.showMid && Array.isArray(error.message)) {
    return error.message.forEach(err => {
      toastr.error('Error:', err.msg)
    })
  }

  if (error.showMid) {
    // show middleware error instead of handling error in a component
    toastr.error('Error:', error.message)
  }
}

/**
 * handleStatusCheck(res, dispatch)
 * - Redux Middleware apiIntercepter status check
 * - Used to upload files/photos
 *
 * @param {Object} response
 * @param {Function} dispatch
 * @param {Object} actionType
 * @returns {Function} actionType dispatch( logUserOut )
 * @returns {Error}
 */
export const handleStatusCheck = async (response: Response, dispatch: Dispatch, actionType: string) => {
  /*
  Unless there is a super special case - have this handle the error output, meaning dont have the component deal with the errors.
   */
  // console.log('handle Status Check', response.status)

  const error = {
    showMid: false, // show middleware error instead of handling error in a component
    message: 'There was an error'
  }

  // Special message for login action error
  if (response.status === 401 && actionType === 'USER_LOG_IN_SUCCESS') {
    error.message = 'Incorrect Username or password'
    throw error
  }

  // invalid access just log user out automatically
  if (response.status === 401) {
    error.showMid = true
    error.message = 'Please login again'
    await dispatch(logUserOut())
    throw error
  }

  // Bad data type sent to API and rejected( ie Form data was incorrect 'type')
  if (response.status === 422) {
    const newError = await response.json()
    error.showMid = true
    /*
     * The register form could return an array of errors
     * normally it will just return an {error: 'my error msg'}
     */
    if (Array.isArray(newError.errors)) {
      error.message = newError.errors
      throw error
    } else {
      error.message = newError.error
      throw error
    }
  }

  // Catch all for anything the didn't meet above requirements
  // IE 500 status
  if (response.status !== 200) {
    const newError = await response.json()
    error.showMid = true
    error.message = newError.error
    throw error
  }
}
