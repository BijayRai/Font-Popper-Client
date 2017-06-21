export type Svg = { [string]: Function }
export type NavLink = { slug: string, title: string, icon: Svg, authRequired?: boolean }
export type Nav = {
  LOGO: Svg,
  LINKS: NavLink[]
}
