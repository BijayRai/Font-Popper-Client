/* eslint-disable no-unused-vars */
/* eslint-env jest */

import React from 'react'
import { RegisterComponent, RegisterForm } from '../../../components/auth/registerForm'
import { shallow, mount } from 'enzyme'
import { Provider } from 'react-redux'
import { reducer as formReducer } from 'redux-form'
import { createStore, compose, combineReducers, applyMiddleware, bindActionCreators } from 'redux'
import sinon from 'sinon'
import expect from 'expect'

describe('Registration Form', () => {
  it('Should show name and email input', () => {
    const props = {
      handleSubmit: () => {}
    }
    const wrapper = shallow(
      <RegisterComponent {...props} />
    )
    const emailInput = wrapper.find('.form-control[type="email"]')
    const nameInput = wrapper.find('.form-control[type="text"]')
    // Example how to select with no class
    // const group = wrapper.find('form').children()
    // console.log('group.length', group.nodes[1])

    expect(emailInput.length).toEqual(1)
    expect(nameInput.length).toEqual(1)
  })

  it('Should show password and confirm input', () => {
    const props = {
      handleSubmit: () => {}
    }
    const wrapper = shallow(
      <RegisterComponent {...props} />
    )
    const passwordInput = wrapper.find('.inputPw')
    const confirmInput = wrapper.find('.inputPwConfirm')
    // Example how to select with no class
    // const group = wrapper.find('form').children()
    // console.log('group.length', group.nodes[1])

    expect(passwordInput.length).toEqual(1)
    expect(confirmInput.length).toEqual(1)
  })
})
const authenticateUser = sinon.spy()
const setup = () => {
  const store = createStore(combineReducers({ form: formReducer }))

  const props = {
    authenticateUser,
    store
  }

  return mount(
    <Provider store={store}>
      <RegisterForm {...props} />
    </Provider>
  )
}

describe('Registration form submit tests', () => {
  let component
  beforeEach(() => {
    component = setup()
  })

  it('Should not call signinUser on submit', () => {
    const button = component.find('.button')
    expect(button.props().disabled).toEqual('disabled')
  })

  it('authenticateUser should get called', () => {
    const user = {
      name: 'spencer',
      email: 'spencer@gmail.com',
      password: 'password',
      confirmPassword: 'password'
    }

    const form = component.find('form')
    const nameInput = component.find('.form-control[type="text"]')
    const emailInput = component.find('.form-control[type="email"]')
    const passwordInput = component.find('.form-control[name="password"]')
    const passwordConfirmInput = component.find('.form-control[name="passwordConfirm"]')

    nameInput.simulate('change',
      {
        target: { value: user.name }
      }
    )
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
    passwordConfirmInput.simulate('change',
      {
        target: { value: user.confirmPassword }
      }
    )

    const button = component.find('.button')
    expect(button.props().disabled).toEqual('')

    form.simulate('submit')

    expect(authenticateUser.calledOnce).toBe(true)
    // Jets oddly sorts the object so just testing name for now
    expect(authenticateUser.getCalls()[0].args[0].name).toEqual(user.name)
  })
})
