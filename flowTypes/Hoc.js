// @flow
import React from 'react'

export type DefaultProps = {
  getInitialProps?: () => any
  // getInitialProps(): Promise<any>
}

export type ClassComponent<D, P, S> = Class<React.Component<D, P, S>>;
