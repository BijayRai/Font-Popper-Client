// @flow

export type User = {
  isAuthenticated: boolean,
  sub: string,
  name: string,
  email: string,
  exp: number,
  gravatar?: string,
  hearts?: string[],
  csrf?: string,
  rfs?: string,
  iat?: string
}

export type UserFiltered = {
  isAuthenticated?: boolean,
  sub?: string,
  name?: string,
  email?: string,
  exp?: number,
  gravatar?: string,
  hearts?: string[],
  csrf?: string,
  rfs?: string,
  iat?: string
}
