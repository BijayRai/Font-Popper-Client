// @flow

import { getUserFromJWT } from '../utils/authUtils'
import {
  handleMiddlewareError,
  handleStatusCheck
} from '../utils/errorHandlers'
import { actionTypes } from '../actions/actionTypes'

import type { Dispatch } from 'redux'
import type { Action, DispatchAction } from '../flowTypes/redux'
import type { UserFiltered } from '../flowTypes/User'
import type { Response, ResponseBody } from '../flowTypes/Api'

export default function ({ dispatch }: { dispatch: Dispatch }) {
  return (next: Function) => async (action: DispatchAction) => {
    // console.log('Middleware')
    // console.log('action')
    // console.log(action.type)

    /**
     * - If action object does not have key "payload"
     * - Or the payload is not a promise
     * - Ignore apiInterceptor
     *
     */

    if (!action.payload || !action.payload.then) {
      return next(action)
    }

    try {
      const response: Response = await action.payload

      // DEBUG Helpers
      // console.log('es6 await promise in middleware')
      // console.log(JSON.stringify(response, null, 2))
      // console.log(response.status)
      // console.log(response.statusText)
      // console.log(response.headers)

      /*
       Handel All status checks from incoming API Requests
       If nothing throws an error it will continue as normal
       */
      await handleStatusCheck(response, dispatch, action.type)

      const body: ResponseBody = await response.json()

      // console.log('body from middleware')
      // console.log(body)
      // console.log('action type')
      // console.log(action.type)

      if (body.token && action.type === actionTypes.USER_LOG_IN_SUCCESS) {
        const user: UserFiltered | void = getUserFromJWT(action.token)

        if (user) {
          user.hearts = body.hearts // meta data example
        }

        return dispatch({
          type: action.type,
          user
        })
      }

      if (body.token && action.type === 'CREATE_USER') {
        const newAction = {
          type: action.type,
          data: body.token
        }

        // Send through all the middlewares again
        dispatch(newAction)
        return body.token
      }

      if (body.token && action.type !== 'LOG_OUT') {
        console.log('body has token in it')
        console.log('save new user to redux')

        const decodedUser = getUserFromJWT(body.token)

        dispatch({
          type: actionTypes.REFRESH_TOKEN,
          user: { ...decodedUser }
        })
      }

      const newAction: Action = {
        type: action.type,
        data: body.data
      }

      // console.log('new action')
      // console.log(newAction)

      // Send through all the middlewares again
      dispatch(newAction)
      return body.data
    } catch (e) {
      console.log('middleware error')
      handleMiddlewareError(e, dispatch)
      throw e
    }
  }
}
