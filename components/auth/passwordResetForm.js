// @flow

import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Field as ReduxField, reduxForm } from 'redux-form'
import renderField from '../inputs/renderField'
import { resetPassword, saveUserToRedux } from '../../actions/authActions'
import { toastr } from 'react-redux-toastr'
import Router from 'next/router'
import type { saveUserFunc, resetPasswordFunc } from '../../flowTypes/Actions'

type Props = {
  resetPassword: resetPasswordFunc,
  saveUser: saveUserFunc,
  token: string,
  anyTouched: boolean,
  errorMessage: string,
  handleSubmit: any,
  valid: boolean
}

type ValidationProps = {
  password: string,
  passwordConfirm: string
}

class PwResetFormComponent extends React.Component {
  props: Props
  handleFormSubmit: Function

  constructor (props) {
    super(props)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }

  async handleFormSubmit ({ password }: { password: string }) {
    const token = this.props.token
    try {
      await this.props.resetPassword({ password, token })
      Router.push(`/auth/login`, `/login`)
      toastr.success('Success:', ' Password Updated!')
    } catch (e) {
      toastr.error('Error:', e.message)
    }
  }

  render () {
    // handleSubmit is a function given to us from Redux-form
    const { handleSubmit, errorMessage, valid, anyTouched } = this.props

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
      <form className='form' onSubmit={handleSubmit(this.handleFormSubmit)}>
        <h2>Reset Password</h2>
        <ReduxField
          name='password'
          type='password'
          component={renderField}
          label='Password:'
        />
        <ReduxField
          name='passwordConfirm'
          type='password'
          component={renderField}
          label='Confirm Password:'
        />
        {loginErrorText()}
        <input
          type='submit'
          className='button'
          value='Reset'
          disabled={valid === false || !anyTouched ? 'disabled' : ''}
        />
      </form>
    )
  }
}

type ValidateErrors = {
  passwordConfirm?: string
}

function validate (formProps: ValidationProps): ValidateErrors {
  let errors = {}

  const requiredFields = ['password', 'passwordConfirm']

  requiredFields.forEach(field => {
    if (!formProps[field]) {
      errors[field] = 'Required'
    }
  })

  if (formProps.password !== formProps.passwordConfirm) {
    errors.passwordConfirm = 'Passwords Must Match'
  }

  return errors
}
const PwResetForm = reduxForm({ form: 'pwResetForm', validate })(
  PwResetFormComponent
)

const mapDispatchToProps = dispatch => {
  return {
    resetPassword: bindActionCreators(resetPassword, dispatch),
    saveUser: bindActionCreators(saveUserToRedux, dispatch)
  }
}

export default connect(null, mapDispatchToProps)(PwResetForm)
