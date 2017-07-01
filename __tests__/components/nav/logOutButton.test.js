import React from 'react'
import Button from '../../../components/nav/logOutButton'
import { shallow, mount } from 'enzyme'
import sinon from 'sinon'
import expect from 'expect'

describe('LogOut Button Test', () => {
  it('Should Call Logout On Click', () => {
    const renderComponent = (props = {}) => shallow(
      <Button {...props} />)

    const onClickSpy = sinon.spy()
    const compo = renderComponent({ onClick: onClickSpy })
    compo.find('a').simulate('click')

    expect(onClickSpy.calledOnce).toEqual(true)
  })
})
