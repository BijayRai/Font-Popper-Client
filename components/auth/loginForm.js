// @flow

import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Field as ReduxField, reduxForm } from 'redux-form'
import { signinUser } from '../../actions/authActions'
import { toastr } from 'react-redux-toastr'
import Router from 'next/router'
import type { User } from '../../flowTypes/User'
import type { signinUserFunc } from '../../flowTypes/Actions'
import type { ReduxForm } from '../../flowTypes/redux'

type Props = {
  signinUser: signinUserFunc,
  ...ReduxForm
  // errorMessage: string,
  // handleSubmit: any,
  // valid: boolean
}

type formProps = {
  email: string,
  password: string,
}

export class LoginFormComponent extends React.Component <void, Props, void> {
  props: Props
  handleFormSubmit: (form: formProps) => void

  constructor (props: Props) {
    super(props)

    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }

  async handleFormSubmit ({ email, password }: formProps) {
    try {
      const { user }: { user: User } = await this.props.signinUser({ email, password })

      if (user) {
        toastr.success('Success:', String(user.name) + ' Logged In!')
        Router.push(`/hidden`)
      }
    } catch (e) {
      toastr.error('Error:', e.message)
    }
  }

  render () {
    // handleSubmit is a function given to us from Redux-form
    const { handleSubmit, errorMessage, valid } = this.props
    const loginErrorText = () => {
      if (errorMessage) {
        return (
          <div className='bs-callout bs-callout-danger'>
            <h4>
              {errorMessage}
            </h4>
          </div>
        )
      }
    }

    return (
      <form className='form loginForm' onSubmit={handleSubmit(this.handleFormSubmit)}>
        <h2>Login</h2>
        <label>Email:</label>
        <ReduxField
          className='form-control'
          name='email'
          component='input'
          type='email'
        />
        <label>Password:</label>
        <ReduxField
          className='form-control'
          name='password'
          component='input'
          type='password'
        />
        {loginErrorText()}
        <input
          type='submit'
          className='button'
          value='Login'
          disabled={valid === false ? 'disabled' : ''}
        />
      </form>
    )
  }
}

// const mapStateToProps = (state, ownProps) => {
//     return {
//         errorMessage: state.auth.error
//     };
// };

const mapDispatchToProps = dispatch => {
  return {
    signinUser: bindActionCreators(signinUser, dispatch)
  }
}

export const LoginForm = reduxForm({ form: 'loginForm' })(LoginFormComponent)
export default connect(null, mapDispatchToProps)(LoginForm)
