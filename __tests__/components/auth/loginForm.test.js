/* eslint-disable no-unused-vars */
/* eslint-env jest */

import React from 'react'
import { LoginFormComponent, LoginForm } from '../../../components/auth/loginForm'
import { shallow, mount } from 'enzyme'
import { Provider } from 'react-redux'
import { reducer as formReducer } from 'redux-form'
import { createStore, compose, combineReducers, applyMiddleware, bindActionCreators } from 'redux'
import sinon from 'sinon'

const expect = require('expect')
const colors = require('colors')

describe('Login Page', () => {
  it('Should show email and pw input', () => {
    const props = {
      handleSubmit: () => {}
    }
    const wrapper = shallow(
      <LoginFormComponent {...props} />
    )
    const emailInput = wrapper.find('.loginForm .form-control[type="email"]')
    const passwordInput = wrapper.find('.loginForm .form-control[type="password"]')

    expect(emailInput.length).toEqual(1)
    expect(passwordInput.length).toEqual(1)
  })

  it('Should call signinUser on submit', () => {
    const user = {
      email: 'spencer@gmail.com',
      password: 'password'
    }
    const store = createStore(combineReducers({ form: formReducer }))
    const signinUser = sinon.spy()
    // onSave.returns(Promise.resolve())

    const props = {
      signinUser,
      store
    }

    const wrapper = mount(
      <Provider store={store}>
        <LoginForm {...props} />
      </Provider>
    )
    const form = wrapper.find('form')
    const emailInput = wrapper.find('.loginForm .form-control[type="email"]')
    const passwordInput = wrapper.find('.loginForm .form-control[type="password"]')

    emailInput.simulate('change',
      {
        target: { value: user.email }
      }
    )
    passwordInput.simulate('change',
      {
        target: { value: user.password }
      }
    )

    form.simulate('submit')

    expect(signinUser.calledOnce).toBe(true)
    expect(signinUser.getCalls()[0].args[0]).toEqual(user)
  })
})
