import React from 'react'
import type { RenderField } from '../../flowTypes/redux'

type Props = RenderField
export const checkBox = (props: Props) => {
  const {
    key,
    value,
    name,
    id,
    input,
    label,
    type,
    meta: {pristine, touched, error, invalid}
  } = props
  // Track state of inputs:
  // console.log(`${label} is pristine: ${pristine}, invalid: ${invalid}, touched: ${touched}`);

  // Construct form-group class depending on form state`
  // const groupClass = !pristine || touched
  //   ? invalid
  //       ? 'form-group has-error has-feedback'
  //       : 'form-group has-success has-feedback'
  //   : 'form-group'

  // Construct form-control class depending on form state
  const inputClass = !pristine || touched
    ? invalid
      ? 'tag__choice form-control-danger'
      : 'tag__choice form-control-success'
    : 'tag__choice'

  return (
    <div key={key} className={inputClass}>
      <input {...input} id={id} value={value} type={type}/>
      <label htmlFor={name}>{label}</label>
      {!pristine || (touched && invalid && <span>{error}</span>)}
    </div>
  )
}

export default checkBox
