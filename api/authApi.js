import fetch from 'isomorphic-unfetch'
import env from '../config/envConfig'

class authApi {
  static async signInUser (user) {
    const url = `${env.BACKEND_URL}/api/signin`
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      // mode: 'cors',
      credentials: 'include', // Don't forget to specify this if you need cookies
      body: JSON.stringify(user)
    })
  }

  static async signOutUser () {
    const url = `${env.BACKEND_URL}/api/signout`
    return fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    })
  }

  static async registerUser (user) {
    const url = `${env.BACKEND_URL}/api/register`
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include', // Don't forget to specify this if you need cookies
      body: JSON.stringify(user)
    })

    return response
  }

  static async fetchRefreshTokens () {
    const url = `${env.BACKEND_URL}/api/refresh`
    const response = await fetch(url, {
      method: 'GET',
      credentials: 'include'
    })

    return response
  }

  static async updateUser (user) {
    const url = `${env.BACKEND_URL}/api/account`
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(user)
    })

    return response
  }

  static async forgotUser (email) {
    const url = `${env.BACKEND_URL}/api/account/forgot`
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(email)
    })

    return response
  }

  static async resetPassword (passwordToken) {
    const url = `${env.BACKEND_URL}/api/account/reset`
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(passwordToken)
    })

    return response
  }
}

export default authApi
