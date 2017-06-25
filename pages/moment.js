// @flow
import React from 'react'
import { initStore } from '../store'
import withRedux from 'next-redux-wrapper'
import { bindActionCreators } from 'redux'
import { startClock } from '../actions/timeActions'
import standardLayout from '../hocs/standardLayout'
import moment from 'moment'
import { getNewTokenTime } from '../utils/timeHelpers'
import TokenClock from '../components/auth/tokenClock'
import type { User } from '../flowTypes/User'
import type { DispatchAction, ReduxStore } from '../flowTypes/redux'
import type { Dispatch } from 'redux'

type Time = {
  exp: number,
  isExpired: boolean,
  minLeft: number,
  refresh: boolean,
  refreshWindow: number,
  secLeft: number
}
type Props = {
  user: User,
  time: Time,
  dispatch: Dispatch
}
type State = {
  exp: number,
  isExpired: boolean,
  minLeft: number,
  secLeft: number,
  user: User,
  time: Time
}
type Ctx = {
  isServer: boolean,
  pathname: string,
  query: any,
  store: ReduxStore
}
class MomentPage extends React.Component<void, Props, State> {
  props: Props
  timer: DispatchAction
  state: State

  static getInitialProps (ctx: Ctx) {
    const user = ctx.store.getState().user
    const tokenTime = getNewTokenTime(user)
    ctx.store.dispatch({type: 'TICK', tokenTime})

    return {user}
  }

  componentDidMount () {
    if (this.props.user.exp) {
      this.timer = this.props.dispatch(startClock(this.props.user))
    }
  }

  componentWillUnmount () {
    clearInterval(this.timer)
  }

  tick () {
    setInterval(() => {
      const currentTime = moment().unix()
      const duration = this.state.exp - currentTime
      const expired = this.state.exp < currentTime // because time goes up
      const timeLeft = moment.duration(duration, 'seconds')
      // const secLeft = timeLeft.seconds()
      const minLeft = moment.duration(timeLeft).minutes()
      const secCount = moment
        .duration(timeLeft.asSeconds() - 1, 'seconds')
        .seconds()
      // const readyForRefresh = minLeft < this.state.refreshWindow && secCount > 0
      this.setState({
        isExpired: expired,
        minLeft: minLeft,
        secLeft: secCount
      })
    }, 1000)
  }

  render () {
    const {exp} = this.props.time
    return (
      <div className='inner'>
        <style jsx>{`
        .show {
          padding: 15px;
          display: inline-block;
          color: #82FA58;
          font: 50px menlo, monaco, monospace;
          background-color: #000;
        }

        .hide {
          display:none;
        }
      `}</style>
        <h2>Token Time</h2>
        <div className={!exp ? 'show' : 'hide'}>
          No Token Found
        </div>
        <div className={exp ? 'show' : 'hide'}>
          <TokenClock {...this.props.time} />
        </div>

      </div>
    )
  }
}

const mapStateToProps = (state: State): mixed => {
  return {
    user: state.user,
    time: state.time
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    startClock: bindActionCreators(startClock, dispatch)
  }
}

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(
  standardLayout(MomentPage, 'Other Page Title')
)
