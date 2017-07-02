import { envConfig } from '../config/envConfigServer'
import fetch from 'isomorphic-unfetch'

class StoreApi {
  static getStores () {
    console.log('initiate StoreAPI CALL')

    return new Promise((resolve, reject) => {
      const url = `${envConfig.BACKEND_URL}/api/stores`
      return fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(r => r.json())
        .then(res => {
          console.log('res', res)

          resolve(res)
        })
        .catch(e => {
          reject(e)
        })
    })
  }
}

export default StoreApi
