// @flow

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
