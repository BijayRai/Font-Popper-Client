/* eslint-disable no-unused-vars */
/* eslint-env jest */
import React from 'react'
import { shallow, mount } from 'enzyme'
import renderer from 'react-test-renderer'
import { Provider } from 'react-redux'
import { authReducer } from '../../../reducers/authReducer'
import { createStore, compose, combineReducers, applyMiddleware, bindActionCreators } from 'redux'
import Nav, { isSignedIn } from '../../../components/nav/login'

describe('Nav login Block', () => {
  let wrapper = ''

  beforeEach(() => {
    // wrapper = setup()
  })

  it('Should display user Login State', () => {
    // console.log('wrapper.props(', wrapper.props().children.props)
    // const links = wrapper.find('img')
    // console.log('links', links.length)
    // console.log('props', wrapper.props().user)
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
        <Nav {...props} />
      </Provider>
    )
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()

    // const links = wrapper.find('.nav__link')
    // const logInLink = links.findWhere(x => x.text() === 'Log Out')
    //
    // expect(logInLink.length).toEqual(1)
  })

  it('Should render Log In Button', () => {
    const store = createStore(combineReducers({ user: authReducer }))
    // Must render this way because component Render depends on User Prop
    const component = mount(
      <Provider store={store}>
        <Nav />
      </Provider>
    )

    const links = component.find('.nav__link')

    const logInLink = links.findWhere(x => x.text() === 'Log In')
    expect(logInLink.length).toEqual(1)
  })
})
