/* eslint-disable no-unused-vars */
/* eslint-env jest */
import React from 'react'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { authReducer } from '../../reducers/authReducer'

const initialState = {
  time: 0,
  isSaving: false,
  user: {
    isAuthenticated: false
  },
  form: {},
  userAccount: {},
  pagination: {
    pages: {}
  },
  toaster: {}
}

describe('authReducer', () => {
  it('should return the initial state', () => {
    const reducer = authReducer(initialState, {})
    expect(reducer).toEqual(initialState)
  })

  it('should react to an action with the type USER_LOG_IN_SUCCESS', () => {
    const user = {
      name: 'user name',
      email: 'test@gmail.com',
      isAuthenticated: true
    }
    const reducer = authReducer({}, {
      type: 'USER_LOG_IN_SUCCESS',
      user
    })

    expect(reducer).toEqual(user)
  })

  it('should react to an action with the type REFRESH_TOKEN', () => {
    const user = {
      name: 'user name',
      email: 'test@gmail.com',
      isAuthenticated: true
    }
    const reducer = authReducer({}, {
      type: 'REFRESH_TOKEN',
      user
    })

    expect(reducer).toEqual(user)
  })

  it('should react to an action with the type LOG_OUT', () => {
    const user = {
      isAuthenticated: false
    }
    const reducer = authReducer({}, {
      type: 'LOG_OUT'
    })
    expect(reducer).toEqual(user)
  })
})
