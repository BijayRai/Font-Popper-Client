// @flow
import React from 'react'
import { initStore } from '../../store'
import withRedux from 'next-redux-wrapper'
import standardLayout from '../../hocs/standardLayout'
import LoginForm from '../../components/auth/loginForm'

const pageTitle: string = 'Log Out'
const logoutPage = () => {
  return (
    <div className='inner' style={{paddingTop: 30}}>
      <h2>Come Back Soon!!</h2>
      <LoginForm />
    </div>
  )
}

export default withRedux(initStore)(
  standardLayout(logoutPage, pageTitle)
)
