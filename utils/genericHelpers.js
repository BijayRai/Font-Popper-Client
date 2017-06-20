import _ from 'lodash'
import FormData from 'form-data'

/**
 * convertToFormData(arg)
 * - Get object before sending to API and create a new FormData Object to send to server
 * - Used to upload files/photos
 *
 * @param {Object} store
 * @returns {Object} store(original)
 * @returns {Object} Object with new array stored on key "tags"
 */
export const convertToFormData = store => {
  const formData = new FormData()

  for (const key in store) {
    switch (true) {
      // check that the key is not a string incase user already has a photo - dont update it
      case key === 'photo' && typeof store[key] !== 'string':
        formData.append(key, store[key][0])
        break

      case key === 'tags' && store['tags'].length > 0:
        store.tags.forEach(tag => {
          formData.append(key, tag)
        })
        break

      default:
        formData.append(key, store[key])
    }
  }

  return formData
}

/**
 * renderSvg(svg)
 * - Component Helper to render and svg item
 *
 * @param {Object} svg - from importing an svg into react
 */
export const renderSvg = Svg => <Svg />
