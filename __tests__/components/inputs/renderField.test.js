/* eslint-disable no-unused-vars */
/* eslint-env jest */
import React from 'react'
import { shallow, mount } from 'enzyme'
import renderer from 'react-test-renderer'
import { Provider } from 'react-redux'
import { authReducer } from '../../../reducers/authReducer'
import { createStore, compose, combineReducers, applyMiddleware, bindActionCreators } from 'redux'
import RenderField from '../../../components/inputs/renderField'

const setup = () => {
  // className='form-control inputPwConfirm'
  // name='passwordConfirm'
  // type='password'
  // component={renderField}
  // label='Confirm Password:'
  // const {
  //   input,
  //   label,
  //   type,
  //   meta: {pristine, touched, error, invalid}
  // } = props
  const input = {
    name: 'Name',
    onBlur: () => {}
  }
  const props = {
    className: 'form-control',
    input: input,
    label: 'Name',
    type: 'text',
    meta: { pristine: true, touched: false, error: '', invalid: false }
  }
  return shallow(<RenderField {...props} />)
}
describe('Nav login Block', () => {
  let wrapper = ''

  beforeEach(() => {
    wrapper = setup()
  })

  it('should render input snapshot', () => {
    const input = {
      name: 'name',
      onBlur: () => {}
    }
    const props = {
      className: 'form-control',
      input: input,
      label: 'Name',
      type: 'text',
      meta: { pristine: true, touched: false, error: '', invalid: false }
    }
    const component = renderer.create(
      <RenderField {...props} />
    )
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should render correct input type', () => {
    const input = wrapper.find('.form-control[type="text"]')
    expect(input.length).toEqual(1)
  })

  it('should render correct name', () => {
    const input = wrapper.find('.form-control[name="Name"]')
    expect(input.length).toEqual(1)
  })

  it('should render correct label', () => {
    const label = wrapper.find('.control-label')
    expect(label.text()).toEqual('Name')
  })

  it('should render correct parent with classes on !Pristine', () => {
    const inputProp = {
      name: 'Name',
      onBlur: () => {}
    }
    const props = {
      className: 'form-control',
      input: inputProp,
      label: 'Name',
      type: 'text',
      meta: { pristine: false, touched: false, error: '', invalid: false }
    }
    const wrapper = shallow(<RenderField {...props} />)
    const input = wrapper.first()

    expect(input.props().className).toEqual('form-group has-success has-feedback')
  })

  it('should render glyphicon with invalid data and !pristine', () => {
    const inputProp = {
      name: 'Name',
      onBlur: () => {}
    }
    const props = {
      className: 'form-control',
      input: inputProp,
      label: 'Name',
      type: 'text',
      meta: { pristine: false, touched: false, error: '', invalid: true }
    }
    const wrapper = shallow(<RenderField {...props} />)
    const icon = wrapper.find('.glyphicon')

    expect(icon.length).toEqual(1)
  })
})
