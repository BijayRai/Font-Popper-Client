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
