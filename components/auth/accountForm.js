// @flow

import React from 'react'
import { connect } from 'react-redux'
import { Field as ReduxField, reduxForm, reset } from 'redux-form'
import * as actions from '../../actions/authActions'
import renderField from '../../components/inputs/renderField'
import { toastr } from 'react-redux-toastr'
import type { User, UserFiltered } from '../../flowTypes/User'
import type { loadAccountFormFunc, saveUserFunc, updateUserFunc } from '../../flowTypes/Actions'

type Props = {
  selectedUser: User,
  load: loadAccountFormFunc,
  reset: any,
  saveUserToRedux: saveUserFunc,
  updateUser: updateUserFunc,
  errorMessage: string,
  handleSubmit: any,
  valid: boolean
}

type formProps = {
  email: string,
  name: string
}

class AccountFormInit extends React.Component {
  props: Props
  handleFormSubmit: Function

  constructor (props, context) {
    super(props, context)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }

  // update data as soon as it mounts
  componentDidMount () {
    this.props.load(this.props.selectedUser)
  }

  async handleFormSubmit (formProps: UserFiltered) {
    try {
      const response: UserFiltered = await this.props.updateUser(formProps)
      this.props.saveUserToRedux(response)
      toastr.success('Saved', 'User Saved Successfully!')
    } catch (e) {
      toastr.error('Error:', e.message)
    }
  }

  render () {
    const {
      handleSubmit,
      valid,
      errorMessage,
      selectedUser
    } = this.props

    const loginErrorText = () => {
      if (errorMessage !== undefined) {
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
      <div>
        <h2>Editing: {selectedUser.name}</h2>
        <form
          className='card'
          onSubmit={handleSubmit(this.handleFormSubmit)}
          encType='multipart/form-data'
        >
          <ReduxField
            name='name'
            type='text'
            component={renderField}
            label='Name:'
          />
          <ReduxField
            name='email'
            type='email'
            component={renderField}
            label='Email:'
          />
          <input
            type='submit'
            className='button'
            value='Save'
            disabled={valid === false ? 'disabled' : ''}
          />

        </form>
      </div>
    )
  }
}

type validateErrors = {
  name?: string,
  email?: string
}

const validate = (values: formProps): validateErrors => {
  const errors = {}

  if (!values.name) {
    errors.name = 'Required'
  }

  return errors
}

// Decorate with reduxForm(). It will read the initialValues prop provided by connect()
const accountForm = reduxForm({
  form: 'initializeUserFormState', // a unique identifier for this form
  validate,
  enableReinitialize: true
})(AccountFormInit)

export default connect(
  state => ({
    initialValues: state.userAccount.data // pull initial values from account reducer
  }),
  {
    load: actions.loadAccountForm,
    reset: reset,
    saveUserToRedux: actions.saveUserToRedux,
    updateUser: actions.updateUser
  } // bind account loading action creator
)(accountForm)
