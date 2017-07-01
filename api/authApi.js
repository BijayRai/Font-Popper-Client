// @flow

import fetch from 'isomorphic-unfetch'
import { envConfig as env } from '../config/envConfigServer'
import type { UserFiltered } from '../flowTypes/User'
type RegisterProps = {
  email: string,
  name: string,
  password: string,
  passwordConfirm: string
}
class authApi {
  static async signInUser (user: UserFiltered): Promise<any> {
    const url = `${env.BACKEND_URL}/api/signin`
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include', // Don't forget to specify this if you need cookies
      body: JSON.stringify(user)
    })
  }

  static async signOutUser (): Promise<any> {
    const url:string = `${env.BACKEND_URL}/api/signout`
    return fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    })
  }

  static async registerUser (formProps: RegisterProps): Promise<any> {
    const url = `${env.BACKEND_URL}/api/register`
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include', // Don't forget to specify this if you need cookies
      body: JSON.stringify(formProps)
    })
  }

  static async fetchRefreshTokens (): Promise<any> {
    const url = `${env.BACKEND_URL}/api/refresh`
    return fetch(url, {
      method: 'GET',
      credentials: 'include'
    })
  }

  static async updateUser (user: UserFiltered): Promise<any> {
    const url = `${env.BACKEND_URL}/api/account`
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(user)
    })
  }

  static async forgotUser (formData: { email: string }): Promise<any> {
    const url = `${env.BACKEND_URL}/api/account/forgot`
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(formData)
    })
  }

  static async resetPassword (passwordToken: { password: string, token: string }): Promise<any> {
    const url = `${env.BACKEND_URL}/api/account/reset`
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(passwordToken)
    })
  }
}

export default authApi
