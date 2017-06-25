// @flow
import React from 'react'

export type Svg = { [string]: Function }
export type NavLink = { slug: string, title: string, icon: Svg, authRequired?: boolean }
export type Nav = {
  LOGO: Svg,
  LINKS: NavLink[]
}

export type File = {
  lastModified: number,
  lastModifiedDate: any,
  name: string,
  preview: string,
  size: number,
  type: string,
  webkitRelativePath: any
}

export type ClassComponent<D, P, S> = Class<React.Component<D, P, S>>;
