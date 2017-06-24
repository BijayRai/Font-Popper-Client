// @flow

import React, { Component } from 'react'
import { initStore } from '../../store'
import withRedux from 'next-redux-wrapper'
import standardLayout from '../../hocs/standardLayout'
import LoginForm from '../../components/auth/loginForm'
import ForgotPasswordForm from '../../components/auth/forgotPasswordForm'
import { toastr } from 'react-redux-toastr'
import type { Ctx } from '../../flowTypes/Ctx'

type Error = {
  error: string
}
type Props = {
  query: Error
}
const pageTitle: string = 'Login'

export class LogInPage extends Component<void, Props, void> {
  props: Props

  static async getInitialProps ({store, res, query}: Ctx) {
    return {query}
  }

  componentDidMount () {
    if (this.props.query.error) {
      toastr.error('Error:', 'Password reset is invalid or has expired')
    }
  }

  render () {
    return (
      <div className='inner' style={{paddingTop: 30}}>
        <LoginForm />
        <ForgotPasswordForm />
      </div>
    )
  }
}

export default withRedux(initStore)(standardLayout(LogInPage, pageTitle))
