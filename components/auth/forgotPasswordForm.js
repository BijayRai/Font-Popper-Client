// @flow

import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Field as ReduxField, reduxForm } from 'redux-form'
import {
  saveUserToRedux,
  forgotUser
} from '../../actions/authActions'
import { toastr } from 'react-redux-toastr'
import type { ReduxForm } from '../../flowTypes/redux'

type Actions = {
  forgotUser: Function,
  saveUser: Function,
}

type formProps = {
  email: string,
}

type Props = Actions & ReduxForm

class ForgotPasswordComponent extends React.Component {
  props: Props
  handleFormSubmit: Function

  constructor (props, context) {
    super(props, context)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }

  async handleFormSubmit ({email}: formProps) {
    try {
      const response = await this.props.forgotUser({email})
      this.props.reset()
      toastr.success('Success:', response.message)
    } catch (e) {
      toastr.error('Error:', e)
    }
  }

  render () {
    // handleSubmit is a function given to us from Redux-form
    const {handleSubmit, errorMessage, valid} = this.props
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
        <h2>I forgot my password</h2>
        <label>Email:</label>
        <ReduxField
          className='form-control'
          name='email'
          component='input'
          type='email'
        />
        <input
          type='submit'
          className='button'
          value='Submit'
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
    forgotUser: bindActionCreators(forgotUser, dispatch),
    saveUser: bindActionCreators(saveUserToRedux, dispatch)
  }
}

const ForgotPasswordForm = reduxForm({form: 'forgotPasswordForm'})(
  ForgotPasswordComponent
)
export default connect(null, mapDispatchToProps)(ForgotPasswordForm)
