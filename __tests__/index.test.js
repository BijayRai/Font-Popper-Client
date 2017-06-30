/* eslint-disable no-unused-vars */
/* eslint-env jest */

import React from 'react'
import HomePage from '../pages/index'
import { shallow, mount } from 'enzyme'
import expect from 'expect'

const setup = () => {
  // renders out the module in memory DOM
  // Used Mount here to render child component of mount and have access to state from redux
  // if we dont need state you can use shallow if the class is not exported from redux originally
  return mount(<HomePage />)
}

describe('Index text example', () => {
  let wrapper = ''

  beforeEach(() => {
    wrapper = setup()
  })

  it('Should display text', () => {
    expect(wrapper.find('.inner').text()).toEqual('New App Template')
  })
})
