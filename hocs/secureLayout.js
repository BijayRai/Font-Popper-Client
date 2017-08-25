// @flow

import React from 'react'
import Router from 'next/router'
import standardLayout from './standardLayout'
import { connect } from 'react-redux'
import type { ClassComponent } from '../flowTypes/Components'
import type { State } from '../flowTypes/redux'
import type { Ctx } from '../flowTypes/Api'

/*
 On first server-side render the component looks to display the component or blank page until client takes over
 On first render in client and on stateChange this component looks
 if the user should be logged out or not
 */
type FunctionComponent<P> = (props: P) => ?React.Element<*>;
type Component<D, P> = FunctionComponent<P> | ClassComponent<D, P, any>

const securePageHoc = (Page: Component<any, any>): ClassComponent<void, any, void> => class SecurePage extends React.Component {
  static async getInitialProps (ctx: Ctx) {
    const state = ctx.store.getState()
    let pageProps

    if (typeof Page.getInitialProps === 'function') {
      pageProps = Page.getInitialProps ? (await Page.getInitialProps(ctx)) : {}
    }

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

const mapStateToProps = ({ user }: State): mixed => ({ user })

// Takes in Page(component) and returns our HOC passing in Page to the 2nd HOC
export default <D: void, P: any> (Page: ClassComponent<D, P, any>, title: string) =>
  connect(mapStateToProps)(standardLayout(securePageHoc(Page), title))
