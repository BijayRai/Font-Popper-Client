// @flow
import React from 'react'
// import _ from 'lodash'
import FormData from 'form-data'
import type { Svg } from '../flowTypes/Components'
type ReduxForm = {
  name: string,
  photo?: any,
  tags?: string[]
}
/**
 * convertToFormData(arg)
 * - Get object before sending to API and create a new FormData Object to send to server
 * - Used to upload files/photos
 *
 * @param {Object} reduxForm
 * @returns {Object} store(original)
 * @returns {Object} Object with new array stored on key "tags"
 */
export const convertToFormData = (reduxForm: ReduxForm) => {
  const formData = new FormData()

  for (let key in reduxForm) {
    if (reduxForm.hasOwnProperty(key)) {
      // Photo object
      if (key === 'photo' && typeof reduxForm[key] !== 'string' && reduxForm[key]) {
        formData.append(key, reduxForm[key][0])
      }

      // tags
      if (key === 'tags' && reduxForm['tags'] && reduxForm['tags'].length > 0) {
        reduxForm.tags.forEach(tag => {
          formData.append(key, tag)
        })
      }

      formData.append(key, reduxForm[key])
    }
  }

  return formData
}
/**
 * renderSvg(svg)
 * - Component Helper to render and svg item
 *
 * @param {Object} Svg - from importing an svg into react
 */
export const renderSvg = (Svg: Svg): React.Element<*> => <Svg />
