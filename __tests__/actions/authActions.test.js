/* eslint-disable no-unused-vars */
/* eslint-env jest */
import React from 'react'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import {
  loadAccountForm,
  updateUser,
  signinUser,
  logOut,
  logUserOut,
  saveUserToRedux,
  authenticateUser,
  refreshTokenAction, forgotUser, resetPassword
} from '../../actions/authActions'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('Auth Actions', () => {
  describe('signinUser', () => {
    it('Should have type USER_LOG_IN_SUCCESS and returns PROMISE', async () => {
      const user = {
        email: 'test@gmail.com',
        password: 'test'
      }

      const store = mockStore({ user: {} })
      await store.dispatch(signinUser(user))
      const getActions = store.getActions()
      const isPromise = !!(getActions[1].payload.then)

      expect(getActions[0].type).toEqual('USER_LOG_IN')
      expect(getActions[1].type).toEqual('USER_LOG_IN_SUCCESS')
      expect(isPromise).toEqual(true)
    })
  })

  describe('logUserOut Async', () => {
    it('Should have type LOG_OUT', async () => {
      const store = mockStore({ user: {} })
      await store.dispatch(logUserOut())
      const getActions = store.getActions()
      const isPromise = !!(getActions[0].payload.then)

      expect(getActions[0].type).toEqual('LOG_OUT')
    })
  })

  describe('logOut', () => {
    it('Should have type LOG_OUT', () => {
      expect(logOut().type).toEqual('LOG_OUT')
    })
  })

  describe('saveUserToRedux', () => {
    const user = {
      name: 'Test Name',
      email: 'test@gmail.com'
    }
    const store = mockStore({ user: {} })
    store.dispatch(saveUserToRedux(user))

    it('Should have type USER_LOG_IN_SUCCESS', () => {
      expect(store.getActions()[0].type).toEqual('USER_LOG_IN_SUCCESS')
    })
    it('Should pass on User to Reducer', () => {
      expect(store.getActions()[0].user).toEqual(user)
    })
  })

  describe('authenticateUser async', () => {
    it('Should have type CREATE_USER', async () => {
      const user = {
        name: 'test user',
        email: 'testUser@gmail.com',
        password: 'password',
        passwordConfirm: 'password'
      }
      const store = mockStore({ user: {} })
      await store.dispatch(authenticateUser(user))
      const getActions = store.getActions()
      const isPromise = !!(getActions[0].payload.then)

      expect(getActions[0].type).toEqual('CREATE_USER')
      expect(isPromise).toEqual(true)
    })
  })

  describe('refreshTokenAction async', () => {
    it('Should have type FETCH_NEW_TOKENS', async () => {
      const user = {
        name: 'test user',
        email: 'testUser@gmail.com',
        password: 'password',
        passwordConfirm: 'password'
      }
      const store = mockStore({ user: {} })
      await store.dispatch(refreshTokenAction(user))
      const getActions = store.getActions()
      const isPromise = !!(getActions[0].payload.then)

      expect(isPromise).toEqual(true)
      expect(store.getActions()[0].type).toEqual('FETCH_NEW_TOKENS')
    })
  })

  describe('loadAccountForm', () => {
    const user = {
      name: 'Test Name',
      email: 'test@gmail.com'
    }
    it('Should have type LOAD_USER_DATA', () => {
      expect(loadAccountForm(user).type).toEqual('LOAD_USER_DATA')
    })
    it('Should pass user through', () => {
      expect(loadAccountForm(user).user).toEqual(user)
    })
  })

  describe('updateUser async', () => {
    it('Should have type UPDATE_USER', async () => {
      const user = {
        name: 'test user',
        email: 'testUser@gmail.com'
      }
      const store = mockStore({ user: {} })
      await store.dispatch(updateUser(user))
      const getActions = store.getActions()
      const isPromise = !!(getActions[0].payload.then)

      expect(isPromise).toEqual(true)
      expect(store.getActions()[0].type).toEqual('UPDATE_USER')
    })
  })

  describe('forgotUser async', () => {
    it('Should have type FORGOT_USER', async () => {
      const user = {
        email: 'testUser@gmail.com'
      }
      const store = mockStore({ user: {} })
      await store.dispatch(forgotUser(user))
      const getActions = store.getActions()
      const isPromise = !!(getActions[0].payload.then)

      expect(isPromise).toEqual(true)
      expect(store.getActions()[0].type).toEqual('FORGOT_USER')
    })
  })

  describe('resetPassword async', () => {
    it('Should have type RESET_PASSWORD', async () => {
      const user = {
        token: '12345',
        password: 'password'
      }
      const store = mockStore({ user: {} })
      await store.dispatch(resetPassword(user))
      const getActions = store.getActions()
      const isPromise = !!(getActions[0].payload.then)

      expect(isPromise).toEqual(true)
      expect(store.getActions()[0].type).toEqual('RESET_PASSWORD')
    })
  })
})
