// @flow
export type RegisterUserProps = {
  email: string,
  name: string,
  password: string,
  passwordConfirm: string
}

export type MiddleWareResponse = { type: string, data: string } | null
export type MessageResponse = { message: string } | null
