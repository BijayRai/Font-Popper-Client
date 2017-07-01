/* eslint-disable no-unused-vars */
/* eslint-env jest */
import React from 'react'
import renderer from 'react-test-renderer'
import { Provider } from 'react-redux'
import { authReducer } from '../../../reducers/authReducer'
import { createStore, compose, combineReducers, applyMiddleware, bindActionCreators } from 'redux'
import Header from '../../../components/Header'

describe('It should match render', () => {
  it('Should display Nav state: Logged In', () => {
    const user = {
      isAuthenticated: true
    }
    const logOut = () => {}
    const store = createStore(combineReducers({ user: authReducer }), { user })

    const props = {
      user
    }

    const component = renderer.create(
      <Provider store={store}>
        <Header {...props} />
      </Provider>
    )
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
