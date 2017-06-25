// @flow

import React, { Component } from 'react'
import { initStore } from '../../store'
import withRedux from 'next-redux-wrapper'
import standardLayout from '../../hocs/standardLayout'
import RegisterForm from '../../components/auth/registerForm'
import styled from 'styled-components'
import type { Ctx } from '../../flowTypes/Api'

const pageTitle: string = 'Register'

const Wrapper = styled.div`
  padding: 30px 10px;
`
const Inner = styled(Wrapper)`
  max-width: 900px;
  margin: 0 auto;
`

export class RegisterPage extends Component<void, {}, void> {
  static async getInitialProps ({store, res, query}: Ctx) {
    // Get storeID
    // await store.dispatch(getStores())
    return {query}
  }

  render () {
    return (
      <Inner>
        <RegisterForm />
      </Inner>
    )
  }
}

export default withRedux(initStore)(standardLayout(RegisterPage, pageTitle))
