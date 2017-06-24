// @flow
import React from 'react'
import Router from 'next/router'
import Header from '../components/Header'
import { connect } from 'react-redux'
import Head from 'next/head'
import { envConfig } from '../config/envConfigServer'
import ReduxToastr from 'react-redux-toastr'
import {
  getUserFromJWT,
  findTokenToDecode,
  validateUserTokenServer,
  validateUserTokenClient,
  findCookies
} from '../utils/authUtils'
import type { DefaultProps } from '../flowTypes/Hoc'

// type HOCComponent<D, P, S> = (component: Class<React$Component<D, *, *>>) => ?React.Element<*>;

type FunctionComponent<P> = (props: P) => ?React.Element<*>;
type ClassComponent<D, P, S> = Class<React.Component<D, P, S>>
// ClassComponent.getInitialProps = (ctx: any) => {}

// type Rclass = React.Component<DefaultProps, any, any>
type Component<D, P> = FunctionComponent<P> | ClassComponent<D, P, any>
interface PerformerI {
  static getInitialProps(ctx: any): any;
}
type propsFunc = (any) => Promise<any>
type PerformerStaticsT = {
  getInitialProps(ctx: any): any;
}
type newProps = {
  getInitialProps: (ctx: any) => any
  // getInitialProps(): Promise<any>
}
export default <D: any, P: any> (Page: Component<D, P>, title: string = '') => {
  class standardLayout extends React.Component {
    static async getInitialProps (ctx) {
      /**
       * Server-side - check for user passed in from custom express server => populate redux if
       * user is found
       *
       * On client-side check && validate user on each page load: expiry and refresh checks with
       * Refresh Window Time
       */
      process.browser
        ? await validateUserTokenClient(ctx.store, ctx.store.getState().user)
        : await validateUserTokenServer(
        ctx.store,
        getUserFromJWT(findTokenToDecode(ctx.res._headers, ctx.req)),
        findCookies(ctx.res._headers, ctx.req)
      )

      let pageProps
      if (typeof Page.getInitialProps === 'function') {
        // pageProps = Page.getInitialProps ? (await Page.getInitialProps(ctx)) : await
        // Page.getInitialProps
        pageProps = Page.getInitialProps ? (await Page.getInitialProps(ctx)) : {}
      }

      // send props to the parent > child container
      // const pageProps =
      //   (await Page.getInitialProps) && (await Page.getInitialProps(ctx))

      return {
        ...pageProps,
        currentUrl: ctx.pathname
      }
    }

    logout: Function

    constructor (props) {
      super(props)
      this.logout = this.logout.bind(this)
    }

    logout (eve) {
      if (eve.key === 'logout') {
        Router.push(`/auth/login`, `/login`)
      }
    }

    componentDidMount () {
      window.addEventListener('storage', this.logout, false)
    }

    componentWillUnmount () {
      window.removeEventListener('storage', this.logout, false)
    }

    render () {
      return (
        <div>
          <Head>
            <title>{title} | {envConfig.WEBSITE_TITLE}</title>
          </Head>
          <Header {...this.props} />
          <ReduxToastr
            timeOut={6000}
            newestOnTop={false}
            preventDuplicates
            position='bottom-right'
            transitionIn='fadeIn'
            transitionOut='fadeOut'
            progressBar={false}
          />
          <Page {...this.props} />

        </div>
      )
    }
  }

  const mapStateToProps = (state) => {
    return {
      user: state.user
    }
  }

  return connect(mapStateToProps)(standardLayout)
}
