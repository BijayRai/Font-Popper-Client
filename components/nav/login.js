// @flow
import { connect } from 'react-redux'
import React from 'react'
import { bindActionCreators } from 'redux'
import Link from 'next/link'
import { renderSvg } from '../../utils/genericHelpers'
import { svgs } from '../../config/svgs'
import { logUserOut } from '../../actions/authActions'
import { toastr } from 'react-redux-toastr'
import Router from 'next/router'
import { unsetToken } from '../../utils/authUtils'
import type { User } from '../../flowTypes/User'
import LogOutButton from './logOutButton'

type Props = {
  logUserOut: () => any,
  user: User
}

export class isSignedIn extends React.Component<void, Props, void> {
  handleLogOut: () => void

  constructor (props: Props) {
    super(props)
    this.handleLogOut = this.handleLogOut.bind(this)
  }

  async handleLogOut () {
    console.log('test')

    try {
      await this.props.logUserOut()
      unsetToken()
      Router.push(`/auth/logout`, `/logout`)
      toastr.success('Logout', 'Successfully Logged Out')
    } catch (e) {}
  }

  userLoggedOut () {
    return (
      <div className='nav__section nav__section--user'>
        <li className='nav__item'>
          <Link href='/auth/register' as='/register'>
            <a className='nav__link'>Register</a>
          </Link>

        </li>
        <li className='nav__item'>
          <Link href='/auth/login' as='/login'>
            <a className='nav__link'>Log In</a>
          </Link>
        </li>
      </div>
    )
  }

  userLoggedIn (user: User) {
    return (
      <div className='nav__section nav__section--user'>
        <li className='nav__item'>
          <Link href='/auth/account' as='/account'>
            <img
              src={
                user.gravatar
                  ? user.gravatar
                  : '/static/images/photos/default.jpg'
              }
              alt=''
              className='avatar'
            />
          </Link>
        </li>
        <LogOutButton onClick={this.handleLogOut} />
      </div>
    )
  }

  render () {
    const user: User = this.props.user

    if (user.isAuthenticated) {
      return this.userLoggedIn(user)
    } else {
      return this.userLoggedOut()
    }
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}
const mapDispatchToProps = dispatch => {
  return {
    logUserOut: bindActionCreators(logUserOut, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(isSignedIn)
