// @flow

import React from 'react'
import { initStore } from '../store'
import withRedux from 'next-redux-wrapper'
import styled, { css } from 'styled-components'
import standardLayout from '../hocs/standardLayout'

// TODO: move styles into their own directory
// const rule1 = {
//   backgroundColor: 'blue',
//   '@media screen and (min-width: 250px)': {
//     backgroundColor: 'red',
//   },
// }
// const Comp = styled.div`
//     ${rule1}
// `
const Title = styled.h1`
  color: red;
  font-size: 50px;

  > a{
    font-size:18px;
  }
`

const sizes = {
  phone: 378,
  tablet: 768,
  desktop: 992,
  giant: 1170
}

const media = Object.keys(sizes).reduce((finalMedia, size) => {
  return {
    ...finalMedia,
    [size]: function (...args) {
      return css`
        @media(max-width: ${sizes[size]}px) {
          ${css(...args)}
        }
      `
    }
  }
}, {})

const Div = styled.div`
  padding-left: 20px;

  ${media.tablet`
    padding-left: 30px;
  `}
`

// const Title = styled.h1`
//   ${{ color: "red", fontSize: "50px", fontFamily: "Open Sans", "> a": { fontSize: "18px" } }}`

const pageTitle: string = 'New App'

export class HomePage extends React.Component<void, {}, void> {
  render () {
    return (
      <div className='inner'>
        <Div>
          <Title className='title'>New App Template</Title>
        </Div>
      </div>
    )
  }
}

// export default HomePage
export default withRedux(initStore)(
  standardLayout(HomePage, pageTitle)
)
