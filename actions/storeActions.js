import { actionTypes } from './actionTypes'
import StoreApi from '../api/storeApi'
import { normalize } from 'normalizr'
import * as schema from '../schema/schemas'

export const getStores = () => (dispatch, getState) => {
  console.log('getstores action called')

  return StoreApi.getStores()
    .then(response => {
      return dispatch(loadStoresSuccess(response))
    })
    .catch(e => {})
}

export const loadStoresSuccess = response => {
  return {
    type: actionTypes.LOAD_STORES_SUCCESS,
    data: normalize(response, { stores: schema.arrayOfStores })
  }
}
