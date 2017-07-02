import { actionTypes } from '../actions/actionTypes'
import initialState from './initialState'

export const storeReducer = (state = initialState.stores, action) => {
  switch (action.type) {
    case actionTypes.LOAD_STORES_SUCCESS:
      // console.log('Store Reducer', action)
      // action from normalizer always has results array on it
      return {
        ...state,
        ...action.data.entities.stores
      }
    default:
      return state
  }
}
