const { svgs } = require('../../config/svgs')

exports.nav = {
  LOGO: svgs.Logo,
  LINKS: [
    { slug: '/moment', title: 'Moment', icon: svgs.MapSvg },
    { slug: '/hidden', title: 'Hidden', icon: svgs.Add, authRequired: true }
  ]
}
