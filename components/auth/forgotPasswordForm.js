// @flow

import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Field as ReduxField, reduxForm } from 'redux-form'
import {
  forgotUser
} from '../../actions/authActions'
import { toastr } from 'react-redux-toastr'
import type { forgotUserFunc } from '../../flowTypes/Actions'
import type { MessageResponse } from '../../flowTypes/Forms'

type formProps = {
  email: string,
}

type Props = {
  forgotUser: forgotUserFunc,
  reset: any,
  errorMessage: string,
  handleSubmit: any,
  valid: boolean
}

export class ForgotPasswordComponent extends React.Component {
  props: Props
  handleFormSubmit: Function

  constructor (props: Props) {
    super(props)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }

  async handleFormSubmit ({ email }: formProps) {
    // Object is sent using Data so middleware returns just the body of the response back to us
    // if there is a matching reducer - it will do something based on the type
    const response: MessageResponse = await this.props.forgotUser({ email })

    if (response) {
      this.props.reset()
      toastr.success('Success:', response.message)
    }
  }

  render () {
    // handleSubmit is a function given to us from Redux-form
    const { handleSubmit, valid } = this.props

    return (
      <form className='form forgotPasswordForm' onSubmit={handleSubmit(this.handleFormSubmit)}>
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
    forgotUser: bindActionCreators(forgotUser, dispatch)
  }
}

export const ForgotPasswordForm = reduxForm({ form: 'forgotPasswordForm' })(
  ForgotPasswordComponent
)
export default connect(null, mapDispatchToProps)(ForgotPasswordForm)
