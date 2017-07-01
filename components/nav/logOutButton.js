import React from 'react'
import { renderSvg } from '../../utils/genericHelpers'
import { svgs } from '../../config/svgs'

const LogOutButton = props => (
  <li className='nav__item'>
    <a className='nav__link' onClick={props.onClick}>
      {renderSvg(svgs.Logout)}
      Log Out
    </a>
  </li>
)

export default LogOutButton
