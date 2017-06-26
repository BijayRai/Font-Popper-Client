// @flow
import Link from 'next/link'
import { connect } from 'react-redux'
import Login from './nav/login'
import { nav } from '../components/nav/links'
import { renderSvg } from '../utils/genericHelpers'
import type { User } from '../flowTypes/User'
import type { Nav } from '../flowTypes/Components'

// File links array based on if user is authenticated
//     .filter(l => !l.authRequired || (l.authRequired && isAuthenticated))
//     .filter(l => !isAuthenticated || (isAuthenticated && !l.anonymousOnly))

// File links array based on if user is authenticated

const getLinks = (isAuthenticated: boolean, nav: Nav) => {
  return nav.LINKS
    .filter(
      link => !link.authRequired || (link.authRequired && isAuthenticated)
    )
    .map(link => {
      return (
        <li key={link.slug} className='nav__item'>
          <Link prefetch href={link.slug}>
            <a className='nav__link'>
              {renderSvg(link.icon)}
              <span>{link.title}</span>
            </a>
          </Link>
        </li>
      )
    })
}
type Props = {
  url: string,
  user: User
}
export default connect(state => state)(({url, user}: Props) => {
  return (
    <header className='top'>
      <nav className='nav'>
        <div className='nav__section nav__section--pages'>
          <li className='nav__item'>
            <Link prefetch href='/'>
              <a className='nav__link nav__link--logo'>
                {renderSvg(nav.LOGO)}
              </a>
            </Link>
          </li>
          {getLinks(user.isAuthenticated, nav)}
        </div>

        <Login />

      </nav>
    </header>
  )
})
