// @flow
import type { Dispatch } from 'redux'
import type { User } from './User'

export type Action = {
  type: string,
  payload?: Promise<any> | any,
  error?: boolean,
  user?: any
}

export type ThunkAction = {
  dispatch: Dispatch<Action>,
  getState: () => any,
  extraArgument: (any) => any;
}

export type DispatchAction = Dispatch<Action>

export type ReduxForm = {
  anyTouched: boolean,
  array: any,
  asyncValidate: Function,
  asyncValidating: boolean,
  autofill: Function,
  blur: Function,
  change: Function,
  clearAsyncError: Function,
  clearSubmit: Function,
  clearSubmitErrors: Function,
  destroy: Function,
  error: any,
  errorMessage: string,
  form: string,
  handleSubmit: Function,
  initialValues: any,
  initialized: boolean,
  invalid: boolean,
  pristine: boolean,
  pure: boolean,
  reset: Function,
  submit: Function,
  submitFailed: boolean,
  submitSucceeded: boolean,
  submitting: boolean,
  touch: Function,
  triggerSubmit: any,
  untouch: Function,
  valid: boolean,
  validate: Function,
  warning: any
}

export type ReduxFormField = {
  value: string,
  active: boolean,
  autofill: Function,
  autofilled: ?boolean,
  checked: ?boolean,
  dirty: boolean,
  error: string,
  initialValue: any,
  invalid: boolean,
  name: string,
  onBlur(valueOrEvent: any): Function,
  onChange(valueOrEvent: any): Function,
  onDragStart: Function,
  onDrop: Function,
  onFocus: Function,
  onUpdate: Function,
  pristine: boolean,
  touched: boolean,
  valid: boolean,
  visited: boolean
}

export type InputField = {
  name: string,
  onBlur: Function,
  onChange: Function,
  onDragStart: Function,
  onDrop: Function,
  onFocus: Function,
  value: any
}
export type InputMeta = {
  active: boolean,
  asyncValidating: boolean,
  autofilled: boolean,
  dirty: boolean,
  dispatch: Function,
  error: any,
  form: string,
  initial: any,
  invalid: boolean,
  pristine: boolean,
  submitFailed: boolean,
  submitting: boolean,
  touched: boolean,
  valid: boolean,
  warning: any
}
export type RenderField = {
  input: InputField,
  label: string,
  meta: InputMeta,
  type: string,
  className?: string,
  value?: any,
  id?: string,
  name?: string,
  key?: string
}

export type ReduxStore = {
  dispatch: Dispatch,
  getState: () => any,
  liftedStore: any,
  replaceReducer: (any) => any,
  subscribe: (any) => any,
  'Symbol(observable)': Function
}

type pageContent = {
  ids: string[],
  fetching: boolean
}
type pageNumber = {
  [number]: pageContent
}
type Results = {
  [string]: pageNumber
}

type Pages = {
  pages: Results
}

export type State = {
  time: number,
  isSaving: boolean,
  user: User,
  userAccount: any,
  form: any,
  toaster: any,
  pagination: Pages
}
