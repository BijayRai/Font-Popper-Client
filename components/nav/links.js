// @flow
// const { svgs } = require('../../config/svgs')
import { svgs } from '../../config/svgs'
import type { Nav } from '../../flowTypes/Components'

const navLinks: Nav = {
  LOGO: svgs.Logo,
  LINKS: [
    {slug: '/moment', title: 'Moment', icon: svgs.MapSvg},
    {slug: '/hidden', title: 'Hidden', icon: svgs.Add, authRequired: true}
  ]
}
exports.nav = navLinks
