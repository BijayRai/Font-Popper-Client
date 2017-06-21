// @flow

export type User = {
  isAuthenticated: boolean,
  sub: string,
  name: string,
  email: string,
  exp: string,
  gravatar: ?string,
  hearts: ?string[],
  csrf: ?string,
  rfs: ?string,
  iat: ?string
}
