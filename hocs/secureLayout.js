// @flow

import React from 'react'
import Router from 'next/router'
import standardLayout from './standardLayout'
import { connect } from 'react-redux'
import type { DefaultProps, ClassComponent } from '../flowTypes/Hoc'

/*
 On first server-side render the component looks to display the component or blank page until client takes over
 On first render in client and on stateChange this component looks
 if the user should be logged out or not
 */

const pageTitle: string = 'Secure Page'
const securePageHoc: Function = (Page): ClassComponent<void, any, void> => class SecurePage extends React.Component {
  static async getInitialProps (ctx) {
    const state = ctx.store.getState()
    const pageProps =
      (await Page.getInitialProps) && (await Page.getInitialProps(ctx))
    return {
      ...pageProps,
      isAuthenticated: state.user.isAuthenticated
    }
  }

  componentDidMount () {
    if (!this.props.user.isAuthenticated) {
      Router.push(`/auth/login`, `/login`)
    }
  }

  componentWillUpdate (nextProps, nextState) {
    if (!nextProps.user.isAuthenticated) {
      Router.push(`/auth/login`, `/login`)
    }
  }

  render () {
    if (!this.props.isAuthenticated) {
      return null
    }
    return <Page {...this.props} />
  }
}

const mapStateToProps = ({user}) => ({user})

// Takes in Page(component) and returns our HOC passing in Page to the 2nd HOC
export default <D: void, P: any> (Page: ClassComponent<D, P, any>) =>
  connect(mapStateToProps)(standardLayout(securePageHoc(Page), pageTitle))
