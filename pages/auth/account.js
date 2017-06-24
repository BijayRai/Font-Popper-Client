// @flow

import React from 'react'
import { initStore } from '../../store'
import withRedux from 'next-redux-wrapper'
import secureLayout from '../../hocs/secureLayout'
import AccountForm from '../../components/auth/accountForm'
import type { State } from '../../flowTypes/State'
import type { Ctx } from '../../flowTypes/Ctx'
import type { User } from '../../flowTypes/User'
type Props = {
  user: User
}
const pageTitle = 'My Account'

class Account extends React.Component<void, Props, void> {
  props: Props

  static async getInitialProps ({store, res, query}: Ctx) {
    return {}
  }

  render () {
    console.log(this.props.user)

    return (
      <div className='inner'>
        <AccountForm selectedUser={this.props.user} />
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
  secureLayout(Account, pageTitle)
)
