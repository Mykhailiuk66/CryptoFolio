import { FormEvent } from "react"

export type AuthTokensType = {
  refresh: string,
  access: string
}
 
export type UserType = {
  email: string,
  exp: number,
  iat: number,
  jti: string,
  token_type: string
  user_id: string | number,
  username: string
};


export type AuthContextDataType = {
  user?: UserType | null,
  authTokens?: AuthTokensType | null,
  loginUser: (e: FormEvent<HTMLFormElement>) => Promise<void>,
  logoutUser: () => void,
  registerUser: (e: FormEvent<HTMLFormElement>) => Promise<void>, 
  registerErrors: Record<string, string[]>
}

