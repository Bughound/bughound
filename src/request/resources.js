import { makeRequest } from '@/helpers/makeRequest.js'

const GetUser = () => makeRequest('get', '/users/me')

const RegisterUser = (data) => makeRequest('post', '/auth/local/register', data)

const LoginUser = (data) => makeRequest('post', '/auth/local', data)

export {
  GetUser,
  RegisterUser,
  LoginUser
}
