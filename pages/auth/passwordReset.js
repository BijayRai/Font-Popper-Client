// @flow

import React from 'react'
import { initStore } from '../../store'
import withRedux from 'next-redux-wrapper'
import standardLayout from '../../hocs/standardLayout'
import PasswordResetForm from '../../components/auth/passwordResetForm'

import type { State } from '../../flowTypes/State'
import type { Ctx } from '../../flowTypes/Ctx'
type Token = {
  token: string
}
type Props = {
  query: Token
}
const pageTitle = 'Reset Password'

class PasswordReset extends React.Component<void, Props, void> {
  props: Props

  static async getInitialProps ({store, res, query}: Ctx) {
    return {query}
  }

  render () {
    return (
      <div className='inner' style={{paddingTop: 30}}>
        <PasswordResetForm token={this.props.query.token} />
      </div>
    )
  }
}

const mapStateToProps = (state: State): mixed => {
  return {
    user: state.user
  }
}

export default withRedux(initStore, mapStateToProps)(
  standardLayout(PasswordReset, pageTitle)
)
