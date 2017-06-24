// @flow
import React, { Component } from 'react'
import { Field as ReduxField, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import renderField from '../inputs/renderField'
import { authenticateUser, saveUserToRedux } from '../../actions/authActions'
import { toastr } from 'react-redux-toastr'
import Router from 'next/router'
import type { ReduxForm } from '../../flowTypes/reduxForm'
import type { Dispatch } from 'redux'
type Actions = {
  authenticateUser: Function,
  saveUserToRedux: Function,
}

type RegisterProps = {
  email: string,
  name: string,
  password: string,
  passwordConfirm: string
}

type Props = Actions & ReduxForm

class RegisterComponent extends Component {
  handleFormSubmit: Function
  props: Props

  constructor (props: Props) {
    super(props)

    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }

  async handleFormSubmit (formProps: RegisterProps) {
    // call action creator to sign up the user on the server
    try {
      await this.props.authenticateUser(formProps)
      toastr.success('Success:', 'User: created!')
      Router.push(`/auth/confirmRegistration`, `/confirm`)
    } catch (e) {
      console.log('handle error in register form')
      console.log(e)

      if (Array.isArray(e)) {
        e.forEach(err => {
          toastr.error('Error:', err.msg)
        })
      } else {
        toastr.error('Error:', e)
      }
    }
  }

  render () {
    const {handleSubmit, valid, errorMessage} = this.props
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
        <h2>Sign Up</h2>
        <ReduxField name='name' type='text' component={renderField} label='Name:' />
        <ReduxField
          name='email'
          type='email'
          component={renderField}
          label='Email:'
        />
        <ReduxField
          name='password'
          type='password'
          component={renderField}
          label='Password:'
        />
        {/* {password.error} */}
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
          value='Sign Up'
          disabled={valid === false ? 'disabled' : ''}
        />
      </form>
    )
  }
}

type validateErrors = {
  email?: string,
  passwordConfirm?: string
}
function validate (formProps: RegisterProps): validateErrors {
  let errors = {}

  const requiredFields = ['email', 'password', 'passwordConfirm']

  requiredFields.forEach(field => {
    if (!formProps[field]) {
      errors[field] = 'Required'
    }
  })

  if (!formProps.email) {
    errors.email = 'Required'
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formProps.email)
  ) {
    errors.email = 'Invalid email address'
  }

  if (formProps.password !== formProps.passwordConfirm) {
    errors.passwordConfirm = 'Passwords Must Match'
  }

  return errors
}

const RegisterForm = reduxForm({
  form: 'register',
  validate
})(RegisterComponent)

const mapDispatchToProps = (dispatch: Dispatch): mixed => {
  return {
    authenticateUser: bindActionCreators(authenticateUser, dispatch),
    saveUserToRedux: bindActionCreators(saveUserToRedux, dispatch)
  }
}

// Think about adding global error message in new app
// const mapStateToProps = (state, ownProps) => {

//     return {
//         errorMessage: state.auth.error
//     }

// };

export default connect(null, mapDispatchToProps)(RegisterForm)
