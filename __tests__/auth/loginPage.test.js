/* eslint-disable no-unused-vars */
/* eslint-env jest */

import React from 'react'
import LogInPage from '../../pages/auth/login'
import { shallow, mount } from 'enzyme'
import renderer from 'react-test-renderer'

const TestUtils = require('react-dom/test-utils')
const expect = require('expect')
const colors = require('colors')

// console.log('/********************************/'.grey)

const setup = () => {
  // Used Mount here to render child component of mount and have access to state from redux
  // if we dont need state you can use shallow if the class is not exported from redux originally
  const props = {
    query: {
      error: ''
    }
  }
  return mount(<LogInPage {...props} />)
}

describe('Login Page', () => {
  let wrapper = ''

  beforeEach(() => {
    wrapper = setup()
  })

  it('Shows a loginForm component', () => {
    expect(wrapper.find('.loginForm').length).toEqual(1)
  })

  // Make sure our comment box is showing up in the app
  it('Shows a forgotPassword Form component', () => {
    expect(wrapper.find('.forgotPasswordForm').length).toEqual(1)
  })
})
