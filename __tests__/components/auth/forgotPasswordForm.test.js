/* eslint-disable no-unused-vars */
/* eslint-env jest */

import React from 'react'
import {
  ForgotPasswordComponent,
  ForgotPasswordForm
} from '../../../components/auth/forgotPasswordForm'
import { shallow, mount } from 'enzyme'
import { Provider } from 'react-redux'
import { reducer as formReducer } from 'redux-form'
import { createStore, compose, combineReducers, applyMiddleware, bindActionCreators } from 'redux'
import sinon from 'sinon'
import expect from 'expect'

describe('Forgot Password Form', () => {
  it('Should show email input', () => {
    const props = {
      handleSubmit: () => {}
    }
    const wrapper = shallow(
      <ForgotPasswordComponent {...props} />
    )
    const emailInput = wrapper.find('.form-control[type="email"]')

    // assert
    expect(emailInput.length).toEqual(1)
  })

  it('Should call forgotUser on submit', () => {
    const user = {
      email: 'spencer@gmail.com'
    }
    const store = createStore(combineReducers({ form: formReducer }))
    const forgotUser = sinon.spy()
    // onSave.returns(Promise.resolve())

    const props = {
      forgotUser,
      store
    }

    const wrapper = mount(
      <Provider store={store}>
        <ForgotPasswordForm {...props} />
      </Provider>
    )
    const form = wrapper.find('form')
    const emailInput = wrapper.find('.form-control[type="email"]')

    emailInput.simulate('change',
      {
        target: { value: user.email }
      }
    )

    form.simulate('submit')

    expect(forgotUser.calledOnce).toBe(true)
    expect(forgotUser.getCalls()[0].args[0]).toEqual(user)
  })
})
