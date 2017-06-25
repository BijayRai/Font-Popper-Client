// @flow
import React from 'react'
import { initStore } from '../store'
import withRedux from 'next-redux-wrapper'
import secureLayout from '../hocs/secureLayout'
import type { User } from '../flowTypes/User'
import type { State } from '../flowTypes/redux'
const pageTitle = 'Favs'

type Props = {
  user: User
}
class HiddenPage extends React.Component<void, Props, void> {
  static async getInitialProps (ctx) {
    return {}
  }

  render () {
    const {user} = this.props
    return (
      <div>
        <h2 className='inner'>User Logged In</h2>
        <pre> { JSON.stringify(user) }</pre>
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
  secureLayout(HiddenPage, pageTitle)
)
