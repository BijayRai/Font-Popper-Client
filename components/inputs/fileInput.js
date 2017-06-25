// @flow
import Dropzone from 'react-dropzone'
import React from 'react'
import type { InputField, InputMeta } from '../../flowTypes/redux'
import type { File } from '../../flowTypes/Components'

type State = {
  preview: null | string
}
type Props = {
  input: InputField,
  meta: InputMeta,
  preview: null | string
}

class renderDropzoneInput extends React.Component <void, Props, State> {
  handleDropRejected: Function
  handleFileAccepted: Function
  removeItem: Function
  state: State

  constructor (props: Props) {
    super(props)

    this.state = {preview: null}
    this.handleDropRejected = this.handleDropRejected.bind(this)
    this.handleFileAccepted = this.handleFileAccepted.bind(this)
    this.removeItem = this.removeItem.bind(this)
  }

  componentWillMount () {
    this.setState({preview: this.props.preview})
  }

  handleDropRejected () {
    // handle rejected has ...args if needed
    this.props.input.onChange({})
  }

  handleFileAccepted (accepted: File[]) {
    const [{preview}] = accepted
    this.setState({preview: preview})

    this.props.input.onChange(accepted)
  }

  removeItem () {
    this.setState({preview: null})
    this.props.input.onChange([])
  }

  render () {
    const {preview} = this.state
    const {input, meta} = this.props
    const files = input.value

    return (
      <div>
        <Dropzone
          name={input.name}
          accept='image/*'
          onDropRejected={this.handleDropRejected}
          onDropAccepted={this.handleFileAccepted}
        >
          <div>
            Try dropping some files here, or click to select files to upload.
          </div>
        </Dropzone>
        {meta.invalid &&
        meta.error &&
        <span className='error'>{meta.error}</span>}
        {preview && <img src={preview} alt='image preview'/>}
        {files &&
        Array.isArray(files) &&
        <ul>
          {files.map((file, i) => (
            <li key={i}>
              {file.name}<span onClick={this.removeItem}>REMOVE FILE</span>
            </li>
          ))}
        </ul>}
      </div>
    )
  }
}

export default renderDropzoneInput
