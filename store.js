import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { reducer as formReducer } from 'redux-form'
import { authReducer } from './reducers/authReducer'
import { timeReducer } from './reducers/timeReducer'
import { storeReducer } from './reducers/storeReducer'
import { reducer as toastrReducer } from 'react-redux-toastr'
import { editAccountReducer } from './reducers/editAccountReducer'
import apiIntercepter from './middleware/apiIntercepter'
import { pagination } from './reducers/pageReducer'

export const initStore = (initialState = {}) => {
  // mirror of state from original app
  const reducers = combineReducers({
    stores: storeReducer,
    user: authReducer,
    form: formReducer,
    userAccount: editAccountReducer,
    toastr: toastrReducer,
    time: timeReducer,
    pagination: pagination.reducer
  })

  let env = process.env.NODE_ENV || 'development'

  if (typeof window !== 'undefined' && env === 'development') {
    return createStore(
      reducers,
      initialState,
      composeWithDevTools(applyMiddleware(thunkMiddleware, apiIntercepter))
    )
  }

  return createStore(
    reducers,
    initialState,
    applyMiddleware(thunkMiddleware, apiIntercepter)
  )
}
