// @flow

import { getNewTokenTime } from '../utils/timeHelpers'
import type { User } from '../flowTypes/user'
import type { Dispatch } from 'redux'
import type { Action } from '../flowTypes/redux'

export const startClock = (user: User) => (dispatch: Dispatch): Dispatch => {
  return setInterval(() => dispatch(tokenTick(user)), 1000)
}

export const tokenTick = (user: User): Action => {
  const tokenTime = getNewTokenTime(user)
  return {type: 'TICK', tokenTime}
}
